# 调试视图

对于更高级的图形调试和场景渲染预览，你可以使用 **Debug View**。此功能允许输出中间缓冲区之一或显示特殊渲染功能的调试视图。

在每个编辑器视口中均可通过 **视图 -> 调试视图** 使用它。

![调试视图](/manual/media/debug-view.png)

完整的选项列表和文档可在[此处](https://docs.flaxengine.com/api/FlaxEngine.ViewMode.html)查看。

你还可以从代码中调整这些选项：

```cs
MainRenderTask.Instance.View.Mode = ViewMode.Diffuse;
```

***

## LOD 预览

![LOD 预览调试视图](/manual/media/lod-preview.png)

**LOD 预览** 根据 LOD 索引以颜色显示场景网格。这在调试基于距离或对象屏幕尺寸的模型 LOD 过渡时非常方便。下表显示了此调试视图使用的颜色图例。

| LOD 0                                                        | LOD 1                                                        | LOD 2                                                        | LOD 3                                                        | LOD 4                                                        | LOD 5                                                        |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 白色 <div style="background-color: white; width: 10px; padding: 10px; border: 1px solid black;"> | 红色 <div style="background-color: red; width: 10px; padding: 10px; border: 1px solid black;"> | 橙色 <div style="background-color: orange; width: 10px; padding: 10px; border: 1px solid black;"> | 黄色 <div style="background-color: yellow; width: 10px; padding: 10px; border: 1px solid black;"> | 绿色 <div style="background-color: green; width: 10px; padding: 10px; border: 1px solid black;"> | 蓝色 <div style="background-color: blue; width: 10px; padding: 10px; border: 1px solid black;"> |

## 材质复杂度

![材质复杂度调试视图](/manual/media/material-complexity.png)

**材质复杂度** 显示材质渲染的逐像素复杂度。它根据着色器指令数量、使用的混合模式、纹理使用情况和细分使用情况来为像素着色。这通常可以作为材质性能指标的指示器，并可用于分析和优化场景。下表显示了此调试视图使用的颜色图例。

| 理想                                                         | 良好                                                         | 复杂                                                         | 昂贵                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 绿色 <div style="background-color: #00f71e; width: 10px; padding: 10px; border: 1px solid black;"> | 蓝色 <div style="background-color: #3333b2; width: 10px; padding: 10px; border: 1px solid black;"> | 红色 <div style="background-color: #ff0000; width: 10px; padding: 10px; border: 1px solid black;"> | 白色 <div style="background-color: #fff2f2; width: 10px; padding: 10px; border: 1px solid black;"> |

## 四边形过度绘制

![四边形过度绘制调试视图](/manual/media/quad-overdraw.png)

**四边形过度绘制** 显示场景渲染过程中累积的逐像素过度绘制。它在分析几何复杂度（例如过高多边形网格）、模型剔除以及分析来自粒子、贴花等其他对象的过度绘制时非常有用。下表显示了基于覆盖给定像素的三角形数量，此调试视图使用的颜色图例。

| 1                                                            | 2                                                            | 3                                                            | 4                                                            | 5                                                            | 6                                                            | 7                                                            | 8                                                            |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| <div style="background-color: #029319; width: 10px; padding: 10px; border: 1px solid black;"> | <div style="background-color: #00ff95; width: 10px; padding: 10px; border: 1px solid black;"> | <div style="background-color: #00fffd; width: 10px; padding: 10px; border: 1px solid black;"> | <div style="background-color: #8efa00; width: 10px; padding: 10px; border: 1px solid black;"> | <div style="background-color: #fffb00; width: 10px; padding: 10px; border: 1px solid black;"> | <div style="background-color: #ff9300; width: 10px; padding: 10px; border: 1px solid black;"> | <div style="background-color: #941100; width: 10px; padding: 10px; border: 1px solid black;"> | <div style="background-color: #ffffff; width: 10px; padding: 10px; border: 1px solid black;"> |

参考：[https://blog.selfshadow.com/2012/11/12/counting-quads/](https://blog.selfshadow.com/2012/11/12/counting-quads/)
