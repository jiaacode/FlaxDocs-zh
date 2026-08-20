# 模型

![模型](/manual/media/title.png)

**模型** 是游戏最重要的组成部分之一。玩家角色和整个环境都可以使用它们来创建。Flax 支持导入使用最常见的 3D 建模软件（例如 Maya、3dsMax、Blender）创建的模型文件，或生成程序化几何体。

模型资源包含一个 **细节级别**（缩写为 *LOD*）集合和 **材质槽**。每个 LOD 包含要绘制的网格集合。在模型渲染期间，每个网格使用一个特定的材质槽，该材质槽可以保存默认值或被[静态模型](static-model.md)覆盖。

![模型设计](/manual/media/ModelDesign.png)

> [!Note]
> 模型的最大细节级别数量为 `6`。此外，每个 LOD 最多可以包含 `4096` 个网格。

**网格** 由在 3D 空间中排列的三角形组成，以创建实心对象的视觉效果。三角形由其三个角点（称为顶点）定义。在 [Mesh](http://docs.flaxengine.com/api/FlaxEngine.Mesh.html) 类中，所有顶点都存储在一个数组中，每个三角形使用三个对应于顶点数组索引的整数来指定。三角形也收集到一个整数数组中；从此数组的开头开始，每三个整数为一组，因此元素 0、1 和 2 定义第一个三角形，3、4 和 5 定义第二个，依此类推。任何给定的顶点都可以在任意数量的三角形中重复使用。

## 模型 LOD 切换

Flax 支持基于模型实例屏幕尺寸（百分比）的动态模型 LOD 切换。以下是此功能的示例：

![模型 LOD 切换](/manual/media/model_lods_switching.gif)

通过在模型材质上启用 **使用抖动 LOD 过渡** 选项，你可以使用平滑的 LOD 过渡，减少突变的伪影，并产生一种无缝的方式来降低场景中的几何复杂度。

![平滑模型 LOD 切换](/manual/media/lod_transition.gif)

在某些情况下，例如在过场动画期间，可能需要提高场景的视觉质量并忽略较低的 LOD。为实现此目的，你可以使用以下 C# 代码按视图应用模型 LOD 偏差：

```cs
var view = MainRenderTask.Instance.View;
view.ModelLODBias = 2;
MainRenderTask.Instance.View = view;
```

或通过 **LOD 偏差** 和 **强制 LOD** 属性按模型实例进行调整。

## 导入模型

要了解导入模型资源和调整导入设置，请阅读专门的[页面](import.md)。

Flax 支持在源资源导入期间**自动生成 LOD**。导入模型文件时，只需勾选 **生成 LOD** 属性（在 *细节级别* 组下）并调整设置即可。

![自动模型 LOD](/manual/media/automatic-model-lod.gif)

## 使用模型

模型资源被引擎的许多部分使用。最常见的情况是通过创建 **静态模型**。该 Actor 类型渲染模型，并允许覆盖其某些属性，如阴影投射或材质槽集合。要了解更多信息，请参阅专门的[页面](static-model.md)。

## 程序化几何体

Flax 提供了 C# 脚本 API，用于离线或在运行时生成程序化网格几何体。
从代码创建的模型可以具有与导入模型相同的所有属性，尽管存在一些限制，例如不能烘焙光照贴图或 LOD 数量减少。但是，程序化模型可以在编辑器中保存为资源文件，然后在游戏中使用。此功能可以由编辑器插件使用。

要了解有关创建程序化网格的更多信息，请参阅[教程](generate-model.md)。

## 几何实例化

Flax 开箱即用地支持硬件几何实例化。在场景渲染期间，使用相同模型和材质的所有模型实例都会被批处理并一次性渲染，以提供超高性能。只要使用相同的材质，Flax 可以将数千个网格实例合并为单个绘制调用。实例化和绘制调用批处理在支持它的平台上默认启用。

## 顶点绘制

与模型相关的另一个重要主题是 **顶点绘制**。这是一个将自定义颜色应用于由网格顶点表示的模型几何体的过程。此技术可用于自定义关卡中的模型实例。例如，墙壁材质可以使用顶点颜色的红色通道来显示潮湿区域。然后关卡设计师可以绘制墙壁顶点，使模型的特定部分看起来潮湿。要了解有关此过程的更多信息，请参阅相关文档[此处](vertex-painting.md)。

## 顶点属性

Flax 使用灵活的模型数据格式。网格最多可以有 3 个顶点缓冲区和 1 个 16 位或 32 位格式布局的索引缓冲区。每个顶点缓冲区可以定义自己的布局。默认情况下，第一个包含位置，第二个包含通用组件（纹理坐标、法线、切线、蒙皮），第三个包含顶点颜色（以便在绘制网格时轻松与绘制的实例缓冲区交换）。顶点数据被高度压缩，以减少内存使用并优化渲染性能。

### 模型顶点布局

![模型顶点布局](/manual/media/vertex-layout.png)

你可以在导入模型的 *网格* 选项卡下的 *顶点布局* 部分检查顶点格式。

### GPU 顶点布局

在创建自定义顶点缓冲区或顶点数据时，请使用 `GPUVertexLayout` 和 `VertexElement` 数组。

示例代码：

# [C#](#tab/code-csharp)
```cs
using System.Runtime.InteropServices;

[StructLayout(LayoutKind.Sequential)]
public struct MyVertex
{
    public Float3 Position;
    public Half2 TexCoord;
    public FloatR10G10B10A2 Normal;

    // 获取此结构的布局。
    static GPUVertexLayout GetLayout()
    {
        return GPUVertexLayout.Get([
            new VertexElement(VertexElement.Types.Position, 0, 0, false, PixelFormat.R32G32B32_Float),
            new VertexElement(VertexElement.Types.TexCoord, 0, 0, false, PixelFormat.R16G16_Float),
            new VertexElement(VertexElement.Types.Normal, 0, 0, false, PixelFormat.R10G10B10A2_UNorm)
        ]);
    }
}
```
***

# [C++](#tab/code-cpp)

```cpp
#include "Engine/Graphics/Shaders/GPUVertexLayout.h"

PACK_STRUCT(struct MyVertex
    {
    Float3 Position;
    Half2 TexCoord;
    FloatR10G10B10A2 Normal;

    // 获取此结构的布局。
    static GPUVertexLayout* GetLayout()
    {
        return GPUVertexLayout::Get({
            { VertexElement::Types::Position, 0, 0, 0, PixelFormat::R32G32B32_Float },
            { VertexElement::Types::TexCoord, 1, 0, 0, PixelFormat::R16G16_Float },
            { VertexElement::Types::Normal, 1, 0, 0, PixelFormat::R10G10B10A2_UNorm },
        });
    }
});
```
***

### 示例顶点布局

以下是常见顶点格式的列表：

**顶点缓冲区 0**：
* Float3 Position

**顶点缓冲区 1**：
* Half2 TexCoord
* FloatR10G10B10A2 Normal
* FloatR10G10B10A2 Tangent

**顶点缓冲区 2** (*可选*)：
* Color32 Color
