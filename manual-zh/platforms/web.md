# Web

![Web](media/web.png)

> [!Warning]
> 警告！Web 支持尚处于实验阶段，并非所有引擎功能都已实现（例如 C# 支持）。

## 技术信息

Flax 支持构建可在浏览器中运行的 Web 游戏。引擎和游戏代码被编译为 [WebAssembly](https://webassembly.org/)，并使用 [WebGPU](https://webgpu.org/) 进行渲染。

### 浏览器支持

Flax 在 Web 上使用了多种功能，以确保最终构建快速且体积小：
* [WebGPU](https://caniuse.com/webgpu) - 用于绘制的 **渲染** API
* [Fixed-width SIMD](https://caniuse.com/mdn-webassembly_fixed-width-simd) - WebAssembly 的 Single Instruction Multiple Data（**SIMD**）扩展
* [JavaScript Promise Integration](https://caniuse.com/wf-wasm-jspi) - **JSPI** 允许从同步 WebAssembly 调用异步代码，WebGPU 异步 API 使用了此功能。

当前浏览器支持覆盖范围：

| 浏览器              | 最低版本                                    | 备注                                                         |
| ------------------- | ------------------------------------------- | ------------------------------------------------------------ |
| **Chrome**/**Edge** | `v137` (2025年5月)                          |                                                              |
| **Firefox**         | `v147` (2026年1月)                          | 需要在 `about:config` 中设置标志 `javascript.options.wasm_js_promise_integration`。 |
| **Safari**          | `Safari Technology Preview 238` (2026年2月) | 最新的稳定版 Safari 没有 JSPI，但 `Technology Preview 238` 提供了它并且能正常工作。 |

Flax 会输出用于检查最低浏览器版本的 JavaScript 代码，并在启动时警告用户需要更新浏览器才能运行游戏。这同样适用于 WebGPU 或 JSPI 等其他功能。

> [!Tip]
> 游戏代码可以通过 `WebPlatform::GetUserAgent` 访问浏览器名称/版本信息。

### JSPI vs ASYNCIFY

**JSPI** 是一个相对较新的 API，因此并非所有浏览器都默认支持它。因此，可以使用旧的兼容方式 [Asyncify](https://emscripten.org/docs/porting/asyncify.html) 构建引擎并降低要求。然而，最新的浏览器包含更稳定且可用的 WebGPU 实现，由于它也是一个相对较新的 API，因此这是理想的选择。你可以 fork 引擎并将 `GraphicsDeviceWebGPU.Build.cs` 中的 `WithAsyncify` 更改为 `1`，以更广泛的浏览器支持为代价构建 Web 游戏，但输出网站文件会明显变大。

### 限制

* **C# 脚本支持尚未实现**，这意味着游戏只能使用原生 C++ 脚本（可视化脚本依赖 C# 集成）。
* 视频播放尚未实现。
* 由于浏览器安全策略，音频播放可能会延迟到用户与网站交互之后。
* 由于兼容性/安全问题，默认情况下游戏在单线程上运行。多线程可以手动启用（请参见下文）。
* 更多信息请参阅 [可移植性指南](https://emscripten.org/docs/porting/guidelines/portability_guidelines.html)。

### WebGPU

WebGPU 是一个 Web 图形 API，提供对现代 GPU 功能（如计算着色器和间接绘制）的低级、高性能访问。

限制和备注：
* 纹理格式支持因设备而异，因此请使用 `GPUDevice::Instance->GetFormatFeatures(PixelFormat::FORMAT_TO_USE)` 检查特定的 `FORMAT_TO_USE` 是否具有给定的标志集。
* 默认情况下，引擎使用 `Basis Universal` 格式打包纹理，并即时将图像转换为运行时格式，这允许单个游戏构建同时在移动和桌面 GPU 上运行。
* 使用浏览器控制台输出检查渲染的任何问题。非发布构建在出现 20 个未处理错误后会自动崩溃，以便进行检查。
* 着色器使用 `glslang` 编译为 `SPIRV`，然后使用 `tint` 编译为 `WGSL`。
* 使用 [WebGPU Inspector](https://github.com/brendan-duncan/webgpu_inspector) 或 [RenderDoc](https://toji.dev/webgpu-profiling/renderdoc) 调试渲染。

Chrome 的 RenderDoc 调试命令：

```
set RENDERDOC_HOOK_EGL=0 && "C:\Program Files\Google\Chrome\Application\chrome.exe" --no-sandbox --disable-gpu-sandbox --disable-direct-composition --gpu-startup-dialog --enable-dawn-features=enable_renderdoc_process_injection,disable_symbol_renaming,use_user_defined_labels_in_backend
```

### 线程

Flax 通过 Emscripten 中的 [pthread](https://emscripten.org/docs/porting/pthreads.html) API 支持浏览器中的多线程。然而，由于 `SharedArrayBuffer` 的安全问题（因各种漏洞所致），在 Web 上使用多线程存在缺点，包括需要带有完整跨域隔离的服务器端标头。这限制了广告和第三方集成在你游戏托管网站上的使用，从而限制了可用性。

默认情况下，Flax 以单线程模式编译，这虽然性能不高，但不需要在 Web 上运行游戏的开销，包括在流行的 Web 托管/发布服务上。你可以 fork 引擎并编辑 `Flax.flaxproj` 以在 Web 上启用线程：

```
"Web": {
  "Threads": true,
},
```

## 开发设置

Flax 编辑器支持在 Windows、Linux 和 Mac 上为 Web 构建游戏。请按照以下步骤为 Web 平台构建游戏设置你的开发 PC：

* 安装 [Emscripten](https://emscripten.org/)（最低版本 `4.0`，但推荐最新的 `5.0`）
* 将 `EMSDK` 环境变量设置为指向 Emscripten SDK 安装文件夹
* 如果使用 Flax 启动器中的引擎，请确保下载 **Web（目标平台）** 文件
* 调整项目的可扩展性（例如，Motion Blur 和 SSAO 可能对某些硬件来说视觉效果过于强烈）
* 使用 [Game Cooker](../editor/game-cooker/index.md) 为 Web 构建游戏

仅使用 `Release` 配置进行最终游戏构建，因为它不包含各种工具，并且浏览器控制台中也没有日志输出。

## 提供文件服务

![Web 导出文件](media/web-export-files.png)

Flax 会构建一个独立的网站，以便轻松托管游戏，其中包含 `index.html`、JavaScript 文件、WebAssembly 文件、包含游戏内容的 `files.data` 和 `favicon.ico`。输出文件已准备好压缩并上传到流行的 Web 发布商店，例如 [itch.io](https://itch.io/)。只要服务器符合 [Emscripten 指南](https://emscripten.org/docs/compiling/WebAssembly.html#web-server-setup)，游戏也可以自行托管。

可以使用 `emrun` 工具在本地测试输出游戏。请参阅[此文档](https://emscripten.org/docs/compiling/Running-html-files-with-emrun.html)了解更多信息。或者，你可以运行 `python -m http.server` 命令，并在浏览器中打开 `http://localhost:8000/`。

> [!Tip]
> 使用浏览器内的开发者控制台（`F12` 或 `Ctrl + Shift + I`）检查 Development 或 Debug 构建中可用的引擎或游戏日志。

## 构建选项

| 属性         | 描述                                                         |
| ------------ | ------------------------------------------------------------ |
| **输出**     | 构建的游戏输出文件夹（相对于项目）。                         |
| **显示输出** | 如果勾选，构建后将在资源管理器中显示输出文件夹。             |
| **配置模式** | 游戏构建模式。可能的选项：<table><tbody><tr><th>选项</th><th>描述</th></tr><tr><td>**Release**</td><td>准备发布的发布构建。不会向浏览器控制台输出引擎日志。</td></tr><tr><td>**Debug**</td><td>用于测试和性能分析的调试构建。为获得最佳调试体验，大多数代码优化已被禁用。</td></tr><tr><td>**Development**</td><td>用于测试和性能分析的开发构建，但比 Debug 构建更针对运行时优化。</td></tr></tbody></table> |

## 平台设置

| 属性            | 描述                                                         |
| --------------- | ------------------------------------------------------------ |
| **自定义 HTML** | 游戏页面的自定义 HTML 模板。                                 |
| **纹理压缩**    | 输出纹理压缩模式。可能的选项：<table><tbody><tr><th>选项</th><th>描述</th></tr><tr><td>**未压缩**</td><td>没有任何压缩算法的原始图像数据。主要用于测试或兼容性。</td></tr><tr><td>**BC**</td><td>保持桌面支持的块压缩格式 BC1-7，但可能在移动设备上无法工作。</td></tr><tr><td>**ASTC**</td><td>将压缩纹理转换为 ASTC 格式，该格式在移动设备上受支持，但在桌面上不受支持。</td></tr><tr><td>**Basis**</td><td>将压缩纹理转换为超压缩的 Basis Universal 格式——可以根据需要快速解码为 GPU 原生格式（BC1-7 或 ASTC）。在所有平台上均受支持。</td></tr></tbody></table> |
