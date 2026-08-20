# 变换 Actor

要布置场景，您需要移动、旋转和缩放 Actor。在编辑器中有两种主要方式可以变换 Actor。

## 变换属性

如果选择了一个或多个 Actor，您可以在 *属性* 窗口中修改它们的属性。这包括编辑 **局部变换**。

![Actor Transform](/manual/media/edit-actor-local-transform.jpg)

您还可以使用变换属性旁边的滑块来更快地编辑对象。

![Actor Transform](/manual/media/local-transform-usage.gif)

## 变换 Gizmo

变换对象最常用的方式是使用平移/旋转/缩放 Gizmo。
使用这些工具是关卡设计中最基本的操作之一，因为它能让您通过鼠标来放置对象。

要切换变换 Gizmo 工具模式，请使用按键 **1**、**2** 和 **3**，或使用工具栏按钮：

![Toolbar Buttons](/manual/media/transform-gizmo-mode.jpg)

编辑器视口的右上角会显示一组按钮和选项。
您可以使用它们来调整 Gizmo 设置。

![Editor Viewport Widgets](/manual/media/gizmo-widgets.png)

### 平移工具

![Translation widget](/manual/media/gizmo-translate.gif)

**平移** Gizmo 沿特定轴（或平面）移动选中的对象。
使用方法：单击某个轴（红色、绿色或蓝色）并拖动即可。
您也可以沿平面移动对象（使用灰色四边形）。

### 旋转工具

![Rotation widget](/manual/media/gizmo-rotate.gif)

**旋转** Gizmo 沿特定轴旋转选中的对象。
使用方法：单击某个轴圈（红色、绿色或蓝色）并拖动即可。

### 缩放工具

![Scale widget](/manual/media/gizmo-scale.gif)

**缩放** Gizmo 沿特定轴缩放选中的对象。
使用方法：单击某个轴（红色、绿色或蓝色）并拖动即可。
您还可以使用 Gizmo 中心的灰色方块进行统一缩放。

## 世界和局部变换空间

变换工具可以在两种模式下变换对象：世界和局部。在世界模式下，Gizmo 工具与世界坐标对齐（左手坐标系单位 X、Y、Z）。在局部模式下，Gizmo 工具与对象的变换坐标系对齐。在局部模式下编辑对象的局部变换更加方便。

您可以使用工具切换当前变换空间：

![Toggle Transformation Space](/manual/media/transformation-space-toggle.png)

| 世界                                  | 局部                                  |
| ------------------------------------- | ------------------------------------- |
| ![World Space](/manual/media/world-space.jpg) | ![Local Space](/manual/media/world-space.jpg) |

## 对齐（捕捉）

您可以将变换 **对齐（捕捉）** 到网格。这意味着您应用于 Actor 的变换量会四舍五入到您指定数值的最接近的倍数。例如，如果将旋转捕捉值设置为 10，Actor 将以 10 的倍数旋转（0、10、20、30 等）。

变换对象时，按住 **Ctrl** 键即可对齐（捕捉）数值。
捕捉设置可以通过工具按钮进行配置：

![Snapping Options](/manual/media/widget-spanning.jpg)

## 复制 Actor

如果您在开始变换对象时按住 **Shift** 键，则可以使用变换 Gizmo 复制选中的对象。

![Duplicate actors](/manual/media/duplicate-actors.gif)
