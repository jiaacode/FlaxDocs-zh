# 操作指南：在预制体中创建 UI 动画

在本教程中，你将学习如何为可复用在预制体中的用户界面创建动画。这也可以应用于其他游戏对象（例如门、陷阱），这些对象可以作为预制体复用，并且需要包含动画。

## 1. 创建预制体

创建 UI 并将其转换为预制体，或者从头开始设置预制体。在本教程中，一个单独的按钮 UIControl 就足够了。

![UI 预制体按钮](/manual/media/button-prefab.png)

## 2. 创建动画

在内容窗口中 *右键单击*，添加 **新的场景动画** 资源。为其命名并打开进行编辑。

![新建场景动画](../../animation/scene-animations/media/new-scene-animation.png)

## 3. 添加带有预制体 Actor 的轨道

现在，将预制体编辑器窗口中的 Actor 拖放到场景动画轨道面板中。它将为该对象动画添加一个新轨道。**轨道标签将变为绿色，以指示它是预制体**。

![添加新的预制体对象轨道](/manual/media/add-new-prefab-scene-anim-track.png)

## 4. 为 UI 属性制作动画

现在，添加带有属性动画的新子轨道。对于诸如 Button 之类的 UI 控件，首先添加子轨道 **Control**，然后为控件属性制作动画。

![预制体按钮 UI 动画](/manual/media/prefab-ui-button-animation.png)

## 5. 添加场景动画播放器

现在，向该预制体添加一个新的 **场景动画播放器**（例如，作为动画按钮的子级），链接创建的动画资源，并勾选 **使用预制体对象** 属性，以确保播放器将自动使用预制体实例对象进行动画。

![预制体按钮 UI 场景动画](/manual/media/ui-prefab-animation.png)

## 6. 测试！

最后，将此预制体生成到关卡中（一次或多次），点击 **播放** 按钮（或按 **F5** 键），然后测试动画播放。

![预制体按钮 UI 动画实例化](/manual/media/ui-prefab-animation-instanced.gif)
