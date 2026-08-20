# 操作指南：从代码播放动画

在本教程中，你将学习如何创建一个虚拟的动画图，用于在蒙皮模型上播放单个动画。

## 1. 创建脚本

首先，你需要创建一个新脚本，该脚本将创建新的虚拟动画图资源，并将其设置到动画模型实例上进行播放。使用以下示例代码：

```cs
public class PlayAnimationScript : Script
{
    private AnimationGraph _graph;

    /// <summary>
    /// 要播放的动画。
    /// </summary>
    public Animation Animation;

    /// <inheritdoc />
    public override void OnStart()
    {
        var animatedModel = Actor.As<AnimatedModel>();
        _graph = Content.CreateVirtualAsset<AnimationGraph>();
        _graph.InitAsAnimation(animatedModel.SkinnedModel, Animation);
        animatedModel.AnimationGraph = _graph;
    }

    /// <inheritdoc />
    public override void OnDestroy()
    {
        // 确保清理创建的资源
        Object.Destroy(ref _graph);
    }
}
```

***

## 2. 添加脚本并设置动画

下一步是将此脚本添加到场景中已分配有效 `Skinned Model` 的动画模型上。然后将 `Animation` 属性分配给你要播放的动画。

![从代码播放动画设置](media/play-animation-from-code-setup.png)

## 3. 测试！

最后一步是在游戏中测试它。只需按下工具栏上的 *播放* 按钮或按 *F5* 键，即可看到模型播放动画。如果遇到问题，请打开 *输出日志* 以查找任何警告或错误信息。
