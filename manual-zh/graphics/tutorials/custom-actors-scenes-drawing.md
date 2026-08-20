# 操作指南：绘制自定义的 Actor 或场景

默认情况下，Flax 会将所有已加载的场景绘制到游戏视口中。有几种方法可以包含或排除特定对象使其不可见，例如：
* Actor 启用状态（`IsActiveInHierarchy`）- 仅活跃的 Actor 可见。
* Actor 层遮罩 - 仅匹配摄像机（`RenderLayersMask`）或视图层遮罩的 Actor 可见。
* 场景渲染任务上的自定义 Actor 或场景集（`MainRenderTask.Instance.ActorsSource`）。

在本教程中，我们将介绍最后一种方法的示例。

游戏视口使用 `SceneRenderTask` API 来绘制游戏。游戏或插件可以通过 `MainRenderTask.Instance` 访问它，以自定义渲染。通过使用 `ActorsSource` 属性，可以自定义用于绘制的 Actor 源。它与枚举 `ActorsSources` 相关，该枚举允许从多个源进行绘制（例如，绘制默认场景加上一些游戏中不存在的额外 Actor）。

### 自定义场景

示例脚本，加载并在游戏视口中仅绘制特定场景：

```cs
using FlaxEngine;

/// <summary>
/// 在游戏视口中加载并仅绘制特定场景：
/// </summary>
public class CustomScenesRendering : Script
{
    /// <summary>
    /// 要加载和绘制的场景。
    /// </summary>
    public SceneReference CustomScene;

    /// <inheritdoc />
    public override void OnEnable()
    {
        Level.LoadScene(CustomScene);
        var scene = FlaxEngine.Object.Find<Scene>(ref CustomScene.ID);
        if (scene)
        {
            // 覆盖特定场景的游戏绘制
            MainRenderTask.Instance.ActorsSource = ActorsSources.CustomScenes;
            MainRenderTask.Instance.CustomScenes = new[] { scene };
        }
    }

    /// <inheritdoc />
    public override void OnDisable()
    {
        // 恢复状态
        MainRenderTask.Instance.ActorsSource = ActorsSources.Scenes;
        MainRenderTask.Instance.CustomScenes = Array.Empty<Scene>();
    }
}
```

***
