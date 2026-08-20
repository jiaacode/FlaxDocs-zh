# 画笔

**画笔** 是定义用于绘制 GUI 控件区域逻辑的对象。例如，[图片](../controls/image.md) 控件暴露了 `Brush` 属性，可以分配该属性来描述如何渲染图像内容。

画笔可以通过编辑器或 C# 代码（参见 `IBrush` 接口）创建和修改。
要使用画笔，只需从下拉菜单中选择**画笔类型**并设置其属性（如下图所示；编辑 Image 控件）。

![编辑画笔](/manual/media/brush-set-type.png)

# 纹理画笔

绘制纹理的画笔。

![纹理画笔](/manual/media/brush-texture.png)

# 精灵画笔

从精灵图集中绘制单个精灵的画笔。

![精灵画笔](/manual/media/brush-sprite.png)

# GPU 纹理画笔

绘制渲染目标表面（从代码分配）的画笔。

```cs
var texture = new GPUDevice().CreateTexture();
var desc = GPUTextureDescription.New2D(640, 480, PixelFormat.R8G8B8A8_UNorm);

texture.Init(ref desc);

// 引用一个 Image 控件
image.Brush = new GPUTextureBrush(texture);
```

***

# 材质画笔

绘制 GUI 材质的画笔。要了解如何使用它，请参阅相关教程[此处](../tutorials/create-gui-material.md)。

![材质画笔](/manual/media/brush-material.png)

# 纯色画笔

用单一纯色填充区域的画笔。

![纯色画笔](/manual/media/brush-solid-color.png)

# 线性渐变画笔

在区域的顶部和底部边缘之间绘制线性双色渐变的画笔。

![线性渐变画笔](/manual/media/brush-linear-gradient.png)

# 9-Slicing 画笔

9-Slicing 是 2D 图形中使用的一种技术，它将单个图像分割为 9 个区域，这些区域分别进行缩放，以防止图像在不同尺寸和纵横比下显示时出现拉伸。在大多数情况下，它对于防止面板和按钮的图像边框拉伸非常有用。

![9-Slicing 画笔](/manual/media/9slicing.gif)

9-Slicing 由 *Texture 9-Slicing* 画笔和 *Sprite 9-Slicing* 画笔使用。要设置这些画笔，请调整 **Border** 属性，该属性定义了纹理空间中的图像边框（0-1 范围）。**Border Size** 定义了边框的像素大小。你可以使用调试复选框 **Show Borders** 来显示 9-Slicing 边框矩形。这有助于调整设置。

# 视频画笔

视频画笔在 UI 元素内显示来自视频播放器的图像。视频画笔需要一个对视频播放器的引用来访问 GPU 纹理——通过 `Player` 属性分配。了解更多信息[此处](../../graphics/video/index.md)。

![编辑视频画笔](../../graphics/video/media/video-brush-edit.png)

# UI 画笔

UI 画笔使用 UI 画笔资源中定义的画笔。这允许在 json 资源中定义 UI 样式。要使用它，请**创建一个新的 Json 资源**，然后选择 `UIBrushAsset` 并确认。打开该新资源并编辑 Brush 属性。然后你可以将该资源分配给 `UI Brush`，它将显示它。

![UI 画笔](/manual/media/ui-brush.png)
