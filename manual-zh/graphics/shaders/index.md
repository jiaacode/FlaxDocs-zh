# 着色器

着色器是 **GPU 程序** 资源，它们可以在 GPU 上运行，并能够使用纹理、顶点和其他资源执行渲染计算。请参阅本文档，了解有关在项目中编写和使用着色器的更多信息。

## 图形渲染

Flax 通过 C++ 和/或 C# API 支持图形编程，该 API 使用一个薄抽象层包装了底层的图形后端 API。通过使用单一 API，游戏和引擎代码可以执行渲染并支持多个平台，如 DirectX、Vulkan 等。该 API 是 **低级且面向对象的**，因为它包含了最常见的类型，如 *GPUDevice*、*GPUContext*、*GPUTexture*、*GPUBuffer*、*GPUShader*、*GPUPipelineState* 等。

GPU 管线使用 **基于槽位的绑定模型**，该模型是显式的且具有低开销特性。在执行绘制或计算工作分派时，GPU 资源（如纹理和缓冲区）会使用资源视图绑定到明确的管线槽位——SRV/UAV/CB。绑定槽位对所有着色器阶段（顶点、像素、计算等）是全局的，因此分配给着色器资源视图槽位的纹理视图可以在绑定的管线状态顶点/像素/计算着色器中使用。引擎实现了着色器反射，并在底层优化了直接阶段的绑定。

要了解有关 Flax 中图形编程的更多信息，请参阅相关[文档](graphics-api.md)。

## 着色语言

Flax 使用 **HLSL** 作为着色语言，因为它在业界非常流行，并支持所有主要的图形渲染功能。此外，引擎会自动将 HLSL 着色器编译为目标平台（如 Vulkan 或 PS4）并完全支持运行时。
要了解 HLSL 语法，请参阅 [HLSL 参考](https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-reference) 和 [HLSL 编程指南](https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-pguide)。

作为 HLSL 语言的扩展，Flax 使用了一小组 **特性宏**，用于注释代码，以便引擎理解内容并自动处理图形管线的某些部分，例如常量缓冲区绑定。文档中的着色器示例（顶点、像素、计算）展示了这些宏的正确用法。此外，你可以参考引擎内置着色器以了解更多信息（请参阅 `Flax/Content/Shaders` 资源）。

#### Flax 着色器宏参考

| **属性**                                             | **描述**                                                     |
| ---------------------------------------------------- | ------------------------------------------------------------ |
| `META_VS(isVisible, minFeatureLevel)`                | 放置在顶点着色器函数上方对其进行注释。                       |
| `META_HS(isVisible, minFeatureLevel)`                | 放置在外壳着色器函数上方对其进行注释。                       |
| `META_HS_PATCH(inControlPoints)`                     | 放置在外壳着色器函数注释和定义之间，定义补丁函数使用的控制点数量。 |
| `META_DS(isVisible, minFeatureLevel)`                | 放置在域着色器函数上方对其进行注释。                         |
| `META_GS(isVisible, minFeatureLevel)`                | 放置在几何着色器函数上方对其进行注释。                       |
| `META_PS(isVisible, minFeatureLevel)`                | 放置在像素着色器函数上方对其进行注释。                       |
| `META_CS(isVisible, minFeatureLevel)`                | 放置在计算着色器函数上方对其进行注释。                       |
| `META_FLAG(flag)`                                    | 使用自定义标志标记着色器程序。例如 `Hidden`、`NoFastMath`、`VertexToGeometryShader`。要了解更多信息，请参阅 `ShaderFlags` 枚举。 |
| `META_PERMUTATION_1(param0)`                         | 基于单个宏参数创建置换。可用于为给定的着色器编译注入宏。     |
| `META_PERMUTATION_2(param0, param1)`                 | 基于两个宏创建置换。                                         |
| `META_PERMUTATION_3(param0, param1, param2)`         | 基于三个宏创建置换。                                         |
| `META_PERMUTATION_4(param0, param1, param2, param3)` | 基于四个宏创建置换。                                         |
| `META_CB_BEGIN(index, name)`                         | 标记常量缓冲区定义的开始。                                   |
| `META_CB_END`                                        | 标记常量缓冲区定义的结束。                                   |

`minFeatureLevel` 应为 `AUTO` 用于自动检测，或特定的功能级别：`FEATURE_LEVEL_ES2`、`FEATURE_LEVEL_SM4`、`FEATURE_LEVEL_SM5`、`FEATURE_LEVEL_SM6`。

#### 着色器置换

Flax 中着色语言的一个特性是能够使用带有定义元属性的宏显式置换着色器源代码。为了理解这一点，请查看以下示例：

```hlsl
// 用于聚光灯渲染的像素着色器
META_PS(false)
META_PERMUTATION_2(NO_SPECULAR=0, USE_IES_PROFILE=0)
META_PERMUTATION_2(NO_SPECULAR=1, USE_IES_PROFILE=0)
META_PERMUTATION_2(NO_SPECULAR=0, USE_IES_PROFILE=1)
META_PERMUTATION_2(NO_SPECULAR=1, USE_IES_PROFILE=1)
void PS_Spot(Model_VS2PS input, out float4 output : SV_Target0)
{
    ...

    // 采样 GBuffer
    GBuffer gBuffer = SampleGBuffer(uv);

    // 计算光照
    output = GetLighting(Light, gBuffer, shadow, true, true);

    // 应用 IES 纹理
#if USE_IES_PROFILE
    output *= ComputeLightProfileMultiplier(IESTexture, gBuffer.WorldPos, Light.LightPos, -Light.LightDir);
#endif
}
```

***

此着色器用于计算聚光灯的逐像素光照（提示：**IES 配置文件** 是一种模拟真实灯泡物理特性的技术，如非均匀光传播，请参考上方截图）。
问题是我们必须创建一组此着色器的不同 **变体**。

1) 带高光，不带 IES 配置文件。

2) 不带高光，不带 IES 配置文件。

3) 带高光，带 IES 配置文件。

4) 不带高光，带 IES 配置文件。

然而，我们不想编写 4 个着色器，而是只编写一个并对其进行置换。
这就是我们使用宏 *META_PERMUTATION_2* 的原因。然后我们可以简单地使用不同的宏集（例如 *NO_SPECULAR=1*，*USE_IES_PROFILE=0*）编译着色器，并从相同的源代码生成不同的着色器。成功的关键是我们使用数据导向的设计，并在着色器中静态定义所有可能的着色器置换。稍后在运行时，我们只需通过索引选择所需的置换，并在渲染代码中使用它。这种方法开销低，并且不会生成不必要的置换，只会生成用户声明的那些。

此外，如果你的代码仅需用于单个着色器函数，请使用宏 `_<function_name>`（例如 `_CS_Sort`）。这样，仅由该函数使用的资源（例如缓冲区槽位或纹理槽位）也可以从其他函数的编译中排除。

#### 包含着色器文件

着色器源代码存储在 `.shader` 文件中。每个文件可以包含一个或多个用于特定图形渲染实现的着色器函数。然而，在构建复杂的图形管线时，你可能需要将某些功能拆分到多个工具文件中。对于这种情况，可以使用 `.hlsl` 文件，因为它们可以包含要包含的自定义代码。Flax 支持使用以下模式包含文件：

```hlsl
#include "./<project_name>/<file_path>.hlsl"

// 示例:
#include "./Flax/GBufferCommon.hlsl"
```

***

## 使用着色器

在所有 Flax 项目中，着色器源代码存储在 `<项目根目录>/Source/Shaders` 文件夹中，并自动导入到 `<项目根目录>/Content/Shaders`（作为二进制资源）。这还支持在运行时热重载着色器，并将它们包含在源项目文件中以在 IDE（如 Visual Studio）中进行编辑。要了解如何创建简单的后期处理着色器，请参阅[此教程](custom-fullscreen-shader.md)。

此外，着色器源代码仅在设计时在编辑器中使用。在游戏烘焙期间，所有使用的着色器都会被预编译为目标平台的图形 API。Flax 不支持在游戏运行时编译着色器。

## 本节内容

要了解如何在项目中使用着色器，请遵循本节中的文档和教程：

* [自定义全屏着色器](custom-fullscreen-shader.md)
* [自定义几何体绘制](custom-geometry-drawing.md)
* [自定义计算着色器](custom-compute-shader.md)
* [赛璐珞风格渲染](cel-shading.md)
* [图形 API](graphics-api.md)
