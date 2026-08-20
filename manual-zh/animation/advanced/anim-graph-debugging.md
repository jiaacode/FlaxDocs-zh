# 动画图调试

## 动画模型实例

![动画图调试 Actor 实例选择器](media/anim-graph-debug-actor-instance-picker.png)

使用工具栏上的对象选择器，可以从已加载的场景中选择特定的 Actor 进行调试。如果未设置，将使用默认的内置 Actor。

## 动画播放预览

![动画图播放调试](media/anim-graph-debug-playback.gif)

动画图编辑器会在节点上以进度条的形式显示动画的当前播放位置。对于状态机，当前采样的状态会以绿色轮廓高亮显示。

## 参数预览

![动画图参数预览](media/anim-graph-debug-parameters.png)

在属性面板中选择 **预览** 选项卡，可以查看动画模型参数的当前状态。这些参数可以被修改，以便在不重新构建资源的情况下（即不更改默认参数值时）主动测试动画图。
