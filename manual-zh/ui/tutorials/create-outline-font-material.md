# 操作指南：创建轮廓字体材质

在本教程中，你将学习如何创建一种字体材质，该材质可用于绘制带有轮廓效果的 MSDF 字体。类似的方法可用于使用为字体字符字形存储的有符号距离场数据来实现阴影、发光或程序化纹理。

## 1. 创建新的材质资源

在 **内容窗口** 中 **右键单击**，然后选择选项 **新建 -> 材质 -> 材质**。输入名称并按 Enter 确认。双击创建的资源并开始编辑材质。

![新建材质](media/outline-font-step-1.png)

## 2. 创建名为 **Font** 的纹理参数

![新建参数 1](media/outline-font-step-2.png)

向下滚动材质属性面板，选择新参数类型 **纹理**，然后按 **添加参数**。接下来，**双击**已创建参数名称的标签，并将其重命名为 **Font**（Flax 在渲染期间使用名为 `Font` 的参数来绑定字体图集纹理）。

## 3. 将领域更改为 GUI

![材质领域设置为 GUI](media/outline-font-step-3.png)

如果你想在 UI 控件内部使用此材质，请将材质领域设置为 **GUI**。如果你想在模型或文本渲染上使用此材质，则将其保留为默认的 Surface（但如果材质是不透明的，请使用 Opacity 以外的插槽）。

## 4. 设置材质图

![材质着色器](media/outline-font-step-4.png)

在此步骤中，你需要使用着色器代码块创建一个材质，如上图所示。

添加一个新的 **自定义全局代码** 节点，并将其 **位置** 设置为 **包含**，然后在那里编写以下代码：

```
#include "./Flax/GUICommon.hlsl"
```

这将确保在着色器文件中包含各种 GUI 和字体采样工具。

然后添加类似的节点 **自定义代码**，其中包含以下代码：

```
// 获取到字体字形的最短距离
Output0 = GetFontMSDFMedian(Input0).xxxx;
```

最后，拖放 `Font` 参数（从右侧的属性面板）以采样字体纹理。将字体的 `Color` 输出插入自定义代码节点的第一个 `Input0`，然后将该节点的 `Output0` 连接到材质的输出 `Opacity`。

## 5. 分配材质

![设置标签](media/outline-font-step-5.png)

现在，创建一个新的 `Label` 控件，将其字体设置为使用 `MSDF` 作为 `Raster Mode` 的资源，并将创建的材质插入到 `Material` 属性中。确保字体大小不会太小，以保证 SDF 数据正确。大约 20 的值通常是一个不错的起点。

现在，你应该会看到一个基础的 SDF 字体渲染，看起来像文本的阴影渐变效果：

![SDF 字体文本渐变](media/outline-font-step-6.png)

## 6. 制作轮廓

![SDF 字体文本渐变](media/outline-font-step-7.png)

最后，让我们升级着色器来绘制文本的轮廓，并使用来自顶点的颜色，该颜色将由渲染系统直接从控件渲染传递。

编辑 *自定义代码* 节点：

```
// 获取到字体字形的最短距离
float thickness = 4; // 可以暴露为参数
Texture2D font = In1; // 获取 Font 纹理参数的小技巧
Output0 = SampleFontMSDFOutline(font, input.TexCoord, thickness);
```

最终结果：

![带轮廓的 SDF 字体](../fonts/media/font-msdf-outline.png)
