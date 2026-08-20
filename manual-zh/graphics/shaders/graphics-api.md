# 图形 API

Flax 通过 C++ 和/或 C# API 支持图形编程，该 API 使用一个薄抽象层包装了底层的图形后端 API。通过使用单一 API，游戏和引擎代码可以执行渲染并支持多个平台，如 DirectX、Vulkan 等。该 API 是**低级且面向对象的**，因为它包含了最常见的类型，如 *GPUDevice*、*GPUContext*、*GPUTexture*、*GPUBuffer*、*GPUShader*、*GPUPipelineState* 等。

GPU 管线使用**基于槽位的绑定模型**，该模型是显式的且具有低开销特性。在执行绘制或计算工作分派时，GPU 资源（如纹理和缓冲区）会使用资源视图绑定到明确的管线槽位——SRV/UAV/CB。绑定槽位对所有着色器阶段（顶点、像素、计算等）是全局的，因此分配给着色器资源视图槽位的纹理视图可以在绑定的管线状态顶点/像素/计算着色器中使用。引擎实现了着色器反射，并在底层优化了直接阶段的绑定。

## 管线状态

Flax 使用 *GPUPipelineState* 对象，它将整个图形管线状态包装成单个描述符表示形式，供 GPU 驱动程序使用以优化渲染状态切换。在创建新的管线状态时，使用要使用的着色器和渲染阶段特性填充 *Description* 结构。确保在编辑器中使用它的着色器资源被重载时，及时释放管线状态。

## 支持的图形后端

* DirectX 11（含 DirectX 10/10.1 回退）
* DirectX 12
* Vulkan
* WebGPU
* Null
* 平台原生（例如 PS4）

> [!TIP]
> 要检查游戏正在使用哪个渲染后端，请使用 [GPUDevice.Instance.RendererType](https://docs.flaxengine.com/api/FlaxEngine.GPUDevice.html#FlaxEngine_GPUDevice_RendererType)。你也可以使用 [GPUDevice.Instance.ShaderProfile](https://docs.flaxengine.com/api/FlaxEngine.GPUDevice.html#FlaxEngine_GPUDevice_ShaderProfile) 来检查渲染后端正在使用的着色器格式。
