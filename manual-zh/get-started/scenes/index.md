# 场景

**场景** 是游戏关卡，由 [Actors](actors.md) 组成。单个场景是一种以 *json* 格式存储的资产，包含附加到其中的序列化场景对象（Actor、脚本等）。

Flax 支持动态加载和卸载多个场景。您可以在编辑器中同时打开和编辑多个场景。

## 创建场景

您可以像创建其他资产一样创建场景。使用 *内容* 窗口。右键单击并选择选项 **新建 -> 场景**。然后指定其名称，按 *Enter* 确认。

![New Scene](media/new-scene.jpg)

## 打开场景

要打开场景，只需双击它。您也可以将其拖放到编辑器视口中以叠加加载（不会卸载现有场景）。

![Open Scene](media/open-scene.jpg)

## 属性

![Scene Properties](media/scene-properties.jpg)

您可以使用 *场景* 窗口像选择其他场景对象一样选择 **场景** Actor，并使用 *属性* 窗口编辑其属性。您可以一次更改所有场景对象的静态标志，或一次变换整个场景。
此外，场景 Actor 还包含用于此场景的光照烘焙选项。

## 本章节内容

* [Actors](actors.md)
* [世界单位](world-units.md)
* [场景数据存储](scene-data.md)
