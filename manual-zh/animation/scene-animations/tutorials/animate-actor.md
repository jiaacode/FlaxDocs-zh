# 操作指南：为 Actor 制作动画

在以下教程中，你将学习如何为 Actor 制作动画。要了解如何创建场景动画，请参阅[此页面](../scene-animation.md)。

## 教程

### 1. 选择你想要制作动画的 Actor

### 2. 添加 Actor 轨道

你可以将 Actor 拖放到轨道面板中，或使用按钮 添加 -> Actor 来创建新轨道并选择要为其制作动画的 Actor。

![添加 Actor 轨道](media/add-actor-track-drag.png)

### 3. 添加子轨道

使用 **+** 按钮并选择你想要制作动画的 Actor 属性。你可以同时为多个属性和字段制作动画，也可以调用 Actor 方法。这还允许为附加到此 Actor 的子脚本添加单独的子轨道，并为其属性制作动画。

![添加旋转子轨道](media/add-actor-property-track.png)

### 4. 添加关键帧

现在你可以向属性轨道插入关键帧。为此，请使用 **+** 按钮，如下图所示。你也可以使用右键单击打开上下文菜单并选择 **添加关键帧** 选项。

![添加旋转关键帧](media/add-keyframes.png)

### 5. 播放动画

最后一步是添加场景动画播放器 Actor 并播放此动画。

![动画对象](media/animated-actor.gif)
