# 操作指南：创建加载画面

在游戏中切换地图时，通常需要几秒钟来加载所有资源，并将纹理/模型/音频流式传输到所需的质量级别。常见的技术是在此加载过程中显示加载画面。在本教程中，您将学习如何使用 Flax API 读取当前资源和流式传输状态，并据此显示加载画面。

### 1. 创建用于控制加载画面的脚本

第一步是创建新脚本（命名为 `LoadingScreen`），该脚本将负责在新地图开始加载时显示加载画面 UI，并在地图加载完成后将其隐藏。

```cs
using System;
using FlaxEngine;

public class LoadingScreen : Script
{
    private Actor _loadingScreen;

    /// <summary>
    /// 带有 UI 的加载画面预制体。
    /// </summary>
    public Prefab LoadingScreenPrefab;

    /// <summary>
    /// 如果有任何资源正在加载或流式传输，则返回 true。
    /// </summary>
    public bool IsLoading => Content.Stats.LoadingAssetsCount + Streaming.Stats.StreamingResourcesCount != 0;

    /// <summary>
    /// 如果加载画面当前可见，则返回 true（可用于在加载画面期间禁用玩家逻辑）。
    /// </summary>
    public bool IsShowing => _loadingScreen;

    /// <summary>
    /// 当加载画面显示时发生。
    /// </summary>
    public event Action Shown;

    /// <summary>
    /// 当加载画面隐藏时发生。
    /// </summary>
    public event Action Hidden;

    /// <inheritdoc/>
    public override void OnEnable()
    {
        // 当地图打开时显示加载画面
        ShowLoadingScreen();
    }

    /// <inheritdoc/>
    public override void OnUpdate()
    {
        // 当内容加载完成时隐藏加载画面
        if (IsShowing && !IsLoading)
            HideLoadingScreen();
    }

    /// <inheritdoc/>
    public override void OnDisable()
    {
        // 确保在地图卸载时隐藏加载画面
        HideLoadingScreen();
    }

    private void ShowLoadingScreen()
    {
        if (_loadingScreen)
            return;
        Debug.Log("ShowLoadingScreen");
        if (LoadingScreenPrefab == null)
        {
            Debug.LogError("Missing Loading Screen Prefab");
            return;
        }

        // 生成加载画面
        _loadingScreen = PrefabManager.SpawnPrefab(LoadingScreenPrefab);

        Shown?.Invoke();
    }

    private void HideLoadingScreen()
    {
        if (!_loadingScreen)
            return;
        Debug.Log("HideLoadingScreen");

        // 清理
        Destroy(ref _loadingScreen);

        Hidden?.Invoke();
    }
}
```

***

### 2. 创建带有 UI 的加载画面预制体

下一步是创建带有 UI 的加载画面预制体，该 UI 将在游戏加载时显示在游戏上方。

步骤：
* 向场景中添加 **UI Canvas**
* 将其重命名为 `LoadingScreen`
* 将 `Order` 改为更高的值，例如 *10000*
* 添加 **UI Control** 作为 Canvas 的子级
* 使用 `Set Type` 按钮，将控件更改为 **Label**
* 按住 *Shift* 键将 [锚点](../../ui/control/transform.md) 设置为 `Stretch All`，使其填满整个屏幕
* 通过 Value 字段将文本设置为 `Loading...`（稍后可进行本地化）
* 调整字体和其他属性
* 将 **背景颜色** 设置为纯黑色
* 将 Canvas Actor 拖放到 *内容* 中，**从中创建预制体**
* 将其从场景中移除（它将由代码生成）

这些步骤的结果是一个带有 UI Canvas 和 UI Control 的预制体，用于显示加载画面图像。之后您可以通过添加加载进度条或其他加载指示器来进一步自定义它。它还可以按地图进行自定义，以显示不同的背景图像或一些游戏玩法提示。

![加载画面预制体](/manual/media/loading-screen-prefab.png)

### 3. 设置加载场景脚本

现在您可以使用已创建的脚本和预制体，将其添加到主地图中（不包括流式关卡或子关卡）。只需选择场景 Actor 并将此脚本添加到其中，然后将预制体链接到脚本属性。

![加载画面设置](/manual/media/loading-screen-actor-setup.png)

### 4. 进行测试运行

最后一步是测试运行已创建的加载画面。在编辑器中或以构建方式运行游戏时，它将在地图切换后显示加载画面，并在所有资源加载完毕且资源流式传输完成后将其隐藏。

最后，请参阅 `Content.Stats` 和 `Streaming.Stats` 以了解更多关于加载进度状态检查的信息。

> [!Note]
> 在编辑器中，加载画面可能不会显示或仅显示极短的时间，因为编辑器在启动运行模式时已经加载了资源。
