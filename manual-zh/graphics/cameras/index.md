# 摄像机

![摄像机](/manual/media/camera.png)

**摄像机** 捕获场景并将其显示给用户。它定义了屏幕空间中的视图。摄像机的位置和旋转定义了 *视口* 和 *视图方向*。这些属性用于渲染场景对象并将其呈现给用户。

## 更改活动摄像机

Flax 引擎允许在场景中创建无限数量的摄像机，而[主摄像机](http://docs.flaxengine.com/api/FlaxEngine.Camera.html#FlaxEngine_Camera_MainCamera)用于最终帧渲染。

要更改用于渲染的摄像机，你可以使用以下代码，其中 `MyCamera` 是你要切换到的摄像机：

```cs
Camera.OverrideMainCamera = MyCamera;
```

***

## 在编辑器中创建摄像机

在 *场景* 树窗口中，右键单击并选择 **新建 -> 摄像机**。
编辑器将使用默认属性创建新的摄像机 Actor。

![新建摄像机](/manual/media/new-cam.jpg)

## 在脚本中创建摄像机

以下示例代码可用于在场景中实例化新的摄像机对象。

```cs
public class MyScript : Script
{
	public override void OnStart()
	{
		var camera = new Camera();
		Level.SpawnActor(camera);
		camera.Position = new Vector3(0, 100, 0);
	}
}
```

***

要了解有关 C# 脚本 API 的更多信息，请参阅 [Camera](http://docs.flaxengine.com/api/FlaxEngine.Camera.html) 类。

## 摄像机属性

![摄像机属性](/manual/media/camera-properties.png)

| 属性             | 描述                                                         |
| ---------------- | ------------------------------------------------------------ |
| **使用透视**     | 如果勾选，摄像机将使用透视投影，否则使用正交投影。           |
| **视野**         | 透视投影使用的垂直视野角度（以度为单位）。                   |
| **近平面**       | 摄像机可以看到的最近点（近裁剪平面）。                       |
| **远平面**       | 摄像机可以看到的最远点（远裁剪平面）。                       |
| **自定义宽高比** | 你指定的自定义宽高比。否则，自动将宽高比调整为渲染目标的比例。使用值 0 可禁用它。 |
| **正交大小**     | *仅在 **使用透视** 为 false 时可见。* 正交投影视图高度（宽度基于宽高比）。使用 `0` 使大小基于视口大小。 |
| **正交缩放**     | *仅在 **使用透视** 为 false 时可见。* 用于正交投影大小的附加缩放。这具有放大和缩小的效果。 |
| **渲染层遮罩**   | 用于此摄像机渲染的层遮罩。可用于从绘制中包含或排除特定的 Actor 层。 |
| **渲染标志**     | 帧渲染标志，用于为此摄像机切换图形功能。请参阅 [ViewFlags](https://docs.flaxengine.com/api/FlaxEngine.ViewFlags.html) API 参考。 |
| **渲染模式**     | 描述此摄像机的帧渲染模式。请参阅 [ViewMode](https://docs.flaxengine.com/api/FlaxEngine.ViewMode.html)。 |

## 遮罩对象层

![摄像机渲染层遮罩](/manual/media/render-layers-masking.gif)

场景上的每个 Actor 都有一个分配的 **层** 属性。摄像机可以使用每层遮罩进行渲染，以包括或排除某些对象不被绘制。

## 透视和正交摄像机

摄像机对象可以在两种模式下工作：透视和正交。每种模式使用不同的投影映射方法，以影响渲染场景的外观。

- **透视** 摄像机提供了场景对象的“真实世界”透视。在此视图中，靠近摄像机的对象看起来更大，由于透视缩短，相同长度的线条看起来不同，如同现实一样。透视摄像机最常用于需要逼真透视的游戏，例如第三人称和第一人称射击游戏。

- **正交** 摄像机始终以相同大小渲染对象，无论它们到摄像机的距离如何。平行线永不相交，没有消失点。正交摄像机最常用于具有等距透视的游戏，例如某些策略或角色扮演游戏。

## 视野（仅透视模式）

如果摄像机的 **使用透视** 值被勾选，那么它将使用透视投影。**视野** 会改变摄像机的视锥，并具有放大或缩小场景的效果。当使用高值（90 或以上）时，视野会导致拉伸的“鱼眼镜头”视图。

| 视野：50                    | 视野：80                    |
| --------------------------- | --------------------------- |
| ![视野 50](/manual/media/fov_1.png) | ![视野 80](/manual/media/fov_1.png) |

## 正交缩放（仅正交模式）

如果摄像机的 **使用透视** 值未被勾选，那么它将使用正交投影。**正交缩放** 会改变摄像机视锥大小，并具有放大或缩小场景的效果。

要更精确地控制投影，请使用 **正交大小** 属性，该属性定义了精确大小（如果未设置为 `0`，则使用视口大小）。

| 正交缩放：0.3                       | 正交缩放：1                         |
| ----------------------------------- | ----------------------------------- |
| ![视野 50](/manual/media/ortho_scale_1.png) | ![视野 80](/manual/media/ortho_scale_1.png) |

## 近平面和远平面

近裁剪平面和远裁剪平面用于定义摄像机视锥的起点和终点。
近平面是摄像机可以看到的最近点。位于它之前的所有几何体都不会被渲染。
远平面是摄像机可以看到的最远点。它也称为绘制距离或视图距离。超出它的所有几何体都不会被渲染。

调整近平面和远平面会影响渲染精度和场景深度质量。使用过小的近平面值（低于 1）或过高的远平面值（高于 100000）可能会导致深度精度问题以及 [Z-fighting](https://en.wikipedia.org/wiki/Z-fighting)。

| 近平面：300                     | 远平面：800                     |
| ------------------------------- | ------------------------------- |
| ![视野 50](/manual/media/nearFar_1.png) | ![视野 80](/manual/media/nearFar_1.png) |

## 将摄像机渲染到纹理

Flax 引擎提供了非常广泛的自定义选项，可用于扩展渲染管线。其中之一是使用自定义摄像机将场景渲染到渲染目标，然后将其呈现在对象表面上。要创建此类效果，请查看教程：[如何将摄像机渲染到纹理](render-camera-to-texture.md)。

## Alpha 输出

渲染器支持在输出图像中包含 Alpha 通道。对于希望将绘制输出与其他图像合成（例如小地图或游戏角色预览覆盖在游戏 UI 上）的游戏，可能需要此功能。可以通过在场景渲染任务使用的渲染缓冲区上设置 `UseAlpha` 属性来启用它：

```cs
MainRenderTask.Instance.Buffers.UseAlpha = true;
```

***

然后，渲染器将使用 `R16G16B16A16` 格式作为图像纹理，并传递 Alpha 通道。这会影响游戏性能，因为默认的 `R11G11B10` 格式针对更低的内存带宽进行了优化。当在输出中使用 Alpha 时，请尝试禁用未使用的 PostFx 功能以减少内存压力并提高性能。

## 覆盖视图

Flax 使用可扩展的 RenderTask 系统进行高级渲染架构。默认情况下，游戏使用 `MainRenderTask.Instance` 将场景渲染驱动到主游戏视口。你可以使用它来插入渲染管线以实现自定义效果、渲染或视图覆盖。

# [C#](#tab/code-csharp)
```cs
class MyScript : Script
{
    public override void OnEnable()
    {
        MainRenderTask.Instance.PreRender += OnPreRender;
    }

    public override void OnDisable()
    {
        MainRenderTask.Instance.PreRender -= OnPreRender;
    }

    private void OnPreRender(GPUContext context, ref RenderContext renderContext)
    {
        // 在此处修改渲染视图
        float fov = 120.0f;
        renderContext.View.Near = 100.0f;
        Viewport viewport = renderContext.Buffers.Viewport;
        Matrix view = renderContext.View.View;
        Matrix proj;
        Matrix.PerspectiveFov(fov * Mathf.DegreesToRadians, viewport.AspectRatio, renderContext.View.Near, renderContext.View.Far, out proj);
        renderContext.View.SetUp(ref view, ref proj);
    }
}
```
***

# [C++](#tab/code-cpp)

```cpp
#pragma once

#include "Engine/Scripting/Script.h"
#include "Engine/Core/Log.h"
#include "Engine/Graphics/RenderBuffers.h"
#include "Engine/Graphics/RenderTask.h"

API_CLASS() class GAME_API MyScript : public Script
{
    API_AUTO_SERIALIZATION();
    DECLARE_SCRIPTING_TYPE(MyScript);

    void OnPreRender(GPUContext* context, RenderContext& renderContext)
    {
        // 在此处修改渲染视图
        float fov = 120.0f;
        renderContext.View.Near = 100.0f;
        const Viewport viewport(renderContext.Buffers->GetViewport());
        Matrix view = renderContext.View.View;
        Matrix proj;
        Matrix::PerspectiveFov(fov * DegreesToRadians, viewport.GetAspectRatio(), renderContext.View.Near, renderContext.View.Far, proj);
        renderContext.View.SetUp(view, proj);
    }

    // [Script]
    void OnEnable() override
    {
        MainRenderTask::Instance->PreRender.Bind<MyScript, &MyScript::OnPreRender>(this);
    }

    void OnDisable() override
    {
        MainRenderTask::Instance->PreRender.Unbind<MyScript, &MyScript::OnPreRender>(this);
    }
};

inline MyScript::MyScript(const SpawnParams& params)
    : Script(params)
{
}
```
***
