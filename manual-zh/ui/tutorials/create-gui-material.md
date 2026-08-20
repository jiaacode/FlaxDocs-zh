# 操作指南：创建自定义 GUI 材质

在本教程中，你将学习如何创建一种 GUI 材质，该材质可用于为游戏中的 UI 组件执行自定义渲染。请按照以下步骤准备一种简单的材质，该材质使用带有色调叠加和饱和度控制的纹理。

## 1. 创建一个 `Image`

第一步是添加一个 [Image](../controls/image.md) 控件（配合 [UI 控件](../control/index.md) 和 [UI 画布](../canvas/index.md)）。

## 2. 创建新的材质资源

在 **内容窗口** 中 **右键单击**，然后选择选项 **新建 -> 材质 -> 材质**。然后指定其名称并按回车确认。双击创建的资源并开始编辑材质。

![新建材质](../../graphics/materials/media/new-material.jpg)

## 3. 将领域设置为 `GUI`

![将领域设置为 GUI](/manual/media/gui-material-setup-1.png)

使用材质属性面板，将材质 **领域设置为 GUI**。生成的材质着色器随后将与 GUI 渲染管线兼容。

## 4. 设置材质图

在此步骤中，你需要创建一个完整的材质。你可以使用基于以下截图的节点网络。要了解有关创建材质和使用材质参数的更多信息，请参阅相关文档[此处](../../graphics/materials/index.md)。

![设置 GUI 材质](/manual/media/gui-material-setup-2.png)

## 5. 分配材质

最后一步是将创建的材质资源分配给 `Image` 的画笔属性。为此，你可以拖放它，或单击箭头符号并搜索它。

![分配自定义 GUI 材质](/manual/media/set-material-brush.png)

## 6. 查看结果！

最后，你可以看到你的工作成果。你还可以将常数值和纹理更改为材质参数，以便从 C# 代码使用它们，或在[材质实例](../../graphics/materials/instanced-materials/index.md)中覆盖它们。

![结果](/manual/media/custom-gui-material-results.png)
