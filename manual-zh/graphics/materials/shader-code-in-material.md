# 材质中的着色器代码

本页面展示了如何在[材质](basics/index.md)和[材质函数](material-functions.md)中使用 HLSL 着色器代码。

Flax 使用 **HLSL** 作为着色语言，因为它在业界非常流行，并支持所有主要的图形渲染功能。此外，引擎会自动将 HLSL 着色器编译为目标平台（如 Vulkan 或 PS4）并完全支持运行时。
要了解 HLSL 语法，请参阅 [HLSL 参考](https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-reference) 和 [HLSL 编程指南](https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-pguide)。

要更好地理解引擎如何处理着色器，请参阅专门的文档部分[此处](../shaders/index.md)。

## 自定义代码

![自定义代码节点](/manual/media/custom-code-node.png)

自定义代码节点允许编写对固定输入和输出进行操作的原始 HLSL 代码。对于可以实现动态分支、动态循环或调用外部源（例如着色器库文件）中的着色器函数的小代码块，这是一个相当简单的解决方案。

## 全局自定义代码

![全局自定义代码节点](/manual/media/custom-global-code-node.png)

全局自定义代码节点更为强大，因为它将代码内联到材质模板中的特定位置。例如，它可以注入全局预处理器宏、注入自定义头文件包含、添加着色器资源绑定或声明全局函数。

使用 **位置** 下拉菜单来正确定义代码注入的位置。你可以在生成的着色器源代码中看到它（单击工具栏按钮）。

此节点提供了一种简单的方法，可以从项目源代码文件夹中包含自定义的 `.hlsl` 文件，这些文件可以以基于文本的格式实现某些功能。为此，请在 `_project_/Source/Shaders` 中创建一个着色器文件。然后你可以通过以下方式包含它：`#include "./_project_name__/MyFile.hlsl"`。其中 `_project_name__` 是 `_project_.flaxproj` 文件中的项目名称。这允许包含来自插件项目的着色器。请参阅[此页面](../shaders/index.md)了解更多信息（特别是 `包含着色器文件` 和 `使用着色器` 部分）。

## 自定义着色器代码文件

编辑器中的自定义代码节点具有局限性，不提供完整的 IDE 编辑体验，因此可以轻松地使用标准的 `.hlsl` 着色器文件，并将其包含在材质或材质函数中。着色器编译器会自动检测源文件的任何更改，并重新加载使用它的任何材质，以在编辑器中提供实时编辑体验。

在 **全局自定义代码** 节点内部使用 `#include "./_project_name__/MyFunction.hlsl"`，这会将文件 `_project_/Source/Shaders/MyFunction.hlsl` 注入到着色器编译中。

> [!Tip]
> `_project_name__` 是 `_project_.flaxproj` 文件中的项目名称。

`_project_/Source/Shaders/MyFunction.hlsl` 文件的示例内容：

```hlsl
#include "./Flax/Noise.hlsl"

float2 GetRandomValue(float2 uv)
{
    return rand2dTo2d(uv);
}
```

***

使用示例，其中着色器文件包含在自定义全局代码节点中，然后在该着色器文件中声明的函数在自定义代码节点中使用。请注意，自定义着色器文件可以包含其他文件并声明其他资源或函数。

![自定义全局着色器文件](/manual/media/custom-global-shader-file.png)
