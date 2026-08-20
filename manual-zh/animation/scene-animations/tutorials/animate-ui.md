# 操作指南：为 UI 制作动画

![UI 动画](/manual/media/scene-anims-ui.gif)

在以下教程中，你将学习如何为 GUI 控件制作动画。要了解如何创建场景动画，请参阅[此页面](../scene-animation.md)。

## 教程

### 1. 选择你想要制作动画的 *UI 控件*

### 2. 添加 Actor 轨道

你可以将 Actor 拖放到轨道面板中，或使用按钮 添加 -> Actor 来创建新轨道并选择要为其制作动画的 Actor。

![添加 Actor 轨道](/manual/media/add-actor-track-drag.png)

### 3. 添加 *Control* 子轨道

使用 **+** 按钮并选择 **Control** 来添加用于动画 GUI 控件对象的子轨道。

![添加控件子轨道](/manual/media/add-control-track.png)

### 3. 添加子轨道

使用 **+** 按钮并选择你想要制作动画的控件属性。你可以同时为多个属性和字段制作动画，也可以调用控件方法。

![添加旋转子轨道](/manual/media/control-animate-properties.png)

### 4. 添加关键帧

现在你可以向属性轨道插入关键帧。为此，请使用 **+** 按钮，如下图所示。你也可以使用右键单击打开上下文菜单并选择 **添加关键帧** 选项。

属性轨道编辑取决于值类型。对于颜色和向量，你可以单独为每个分量制作动画。结构体允许为其一个或多个属性制作动画。

![添加旋转关键帧](/manual/media/add-control-keyframes.png)

### 5. 播放动画

最后一步是将场景动画播放器 Actor 添加到场景中。将动画播放器添加到场景后，你可以在动画播放器窗口中选择场景动画。然后在 Flax 编辑器中选择“运行”来启动游戏，接着在动画播放器窗口中点击“播放”以预览你的动画。

![动画对象](/manual/media/ui-animation-color.gif)
