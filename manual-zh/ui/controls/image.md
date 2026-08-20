# 图片

![图片](/manual/media/image.png)

**图片** 控件显示由分配的画笔定义的非交互式图形。它可以绘制纹理、渲染目标、精灵、GUI 材质、纯色或线性渐变。
要从代码更改纹理，请将 `new TextureBrush(newTexture)` 赋值给 Image 的 Brush 参数。
例如：`portraitImage.Get<Image>().Brush = new TextureBrush(portraitTexture);`
