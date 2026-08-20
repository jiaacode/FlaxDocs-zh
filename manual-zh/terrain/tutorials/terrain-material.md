# 操作指南：创建地形材质

在本教程中，你将学习如何创建和使用自定义地形材质，该材质可以在各种纹理之间进行混合。

## 1. 创建新材质

在 *内容* 窗口中，使用 **右键单击** 并选择选项 **新建 -> 材质 -> 材质**，然后指定其名称并按 **Enter**。

![新建材质](/manual/media/new-material.png)

然后双击资源以打开专用编辑器。

## 2. 将领域设置为地形

在材质属性面板中，将其 **领域** 更改为 **地形**。

![地形材质领域](/manual/media/terrain-material-domain.png)

## 3. 创建材质

添加各种景观纹理，并使用纹理层权重实现简单的线性混合（如下图所示）。

![创建的材质](/manual/media/terrain-material-example.png)

## 4. 将材质分配给地形

保存创建的材质，并将其分配给地形的 **材质** 属性。

![地形材质](/manual/media/terrain-material-set.png)

你也可以使用工具箱覆盖每个块的材质。

![地形块材质覆盖](/manual/media/per-chunk-material-override.png)

## 5. 绘制层

要使用绘制工具，请选择 **工具箱 -> 绘制 -> 选择层**，然后选择要绘制的地形 Actor。

![绘制地形工具](/manual/media/paint-layer-tool.png)

现在，使用 **鼠标左键** 你可以使用在材质中指定的纹理在地形上绘制。

![绘制地形](../media/terrain_pic_08.gif)
