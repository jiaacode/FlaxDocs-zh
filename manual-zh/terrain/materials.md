# 地形材质

地形使用专用的着色器类型进行几何体渲染。它更加优化，专注于高性能的地形渲染，具有无缝连续 LOD 支持和材质层混合。

地形材质类似于 **Surface** 材质，具有延迟管线、完整 PBR 和细分支持等功能。然而，它不是处理模型网格几何体三角形，而是使用预先创建的平面块网格，并根据地形高度图移动均匀网格顶点。所有计算都在顶点着色器中以低成本完成。

要了解有关创建和使用地形材质的更多信息，请参阅相关教程[此处](tutorials/terrain-material.md)。

## 地形领域

要将你的材质更改为适用于地形的材质，只需将其领域修改为 **Terrain**。

![地形领域材质](tutorials/media/terrain-material-domain.png)

然后你可以使用地形层权重和地形孔洞遮罩节点来实现特定功能。

![地形材质示例](tutorials/media/terrain-material-example.png)

<p>
![地形孔洞遮罩](media/terrain-holes-material.png)
</p>

## 地形层

![地形层混合](media/height-layer-blend-terrain.png)

创建地形材质着色器时常用的技术之一是使用 **层**。每一层可以是单独的材质或材质函数（例如带有额外高度输出）。然后你可以轻松地混合这些层以生成最终的表面属性。
