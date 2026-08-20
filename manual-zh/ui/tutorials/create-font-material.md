# 操作指南：创建自定义字体材质

在本教程中，你将学习如何创建一种字体材质，该材质可用于在游戏中为文本组件执行自定义着色。请按照以下步骤准备一种简单的材质，该材质使用纹理作为文本字符的叠加层。

## 1. 创建 `文本渲染` 或 `标签`

第一步是添加一个[文本渲染](../text-render/index.md) Actor 或[标签](../controls/label.md)控件（配合 [UI 控件](../control/index.md) 和 [UI 画布](../canvas/index.md)）。

![生成文本渲染](/manual/media/spawn-text-render.png)

## 2. 创建新的材质资源

在**内容窗口**中**右键单击**，然后选择选项 **新建 -> 材质 -> 材质**。输入名称并按 Enter 确认。双击创建的资源并开始编辑材质。

![新建材质](../../graphics/materials/media/new-material.jpg)

## 3. 创建名为 **Font** 的纹理参数

![新建参数 1](/manual/media/texture-parameter-font-1.png)

向下滚动材质属性面板，选择新参数类型 **纹理**，然后按 **添加参数**。接下来，**双击**已创建参数名称的标签，并将其重命名为 **Font**（Flax 在渲染期间使用名为 `Font` 的参数来绑定字体图集纹理）。

![新建参数 2](/manual/media/texture-parameter-font-2.png)

## 4. 设置材质图

在此步骤中，你需要根据以下截图创建一个完整的材质节点网络。要了解有关创建材质和使用材质参数的更多信息，请参阅相关文档[此处](../../graphics/materials/index.md)。

![自定义字体材质](/manual/media/custom-font-material-graph-1.png)

创建的材质使用叠加纹理和字体字符纹理来渲染字形。

如果你的材质将用于 2D GUI（而不是 *文本渲染*），则将其领域设置为 **GUI**，并将自发光替换为颜色（请参见页面底部 *GUI 文本* 部分下的图片）。

## 5. 分配材质

最后一步是将创建的材质资源分配给文本渲染 Actor 的材质属性（如果用于 GUI 控件类型，则分配给自定义材质）。

![分配自定义字体材质](/manual/media/set-custom-font-material.png)

## 6. 查看结果！

![结果](/manual/media/custom-font-material-result.png)

# GUI 文本

如果你想使用自定义材质在 GUI 内部渲染文本（例如在 *标签* 或 *按钮* 控件上），则应按照本教程操作，并另外**将材质领域设置为 GUI，并使用自发光/遮罩输入**。

请参见以下示例：

![自定义字体材质](/manual/media/custom-font-material-graph-2.png)
