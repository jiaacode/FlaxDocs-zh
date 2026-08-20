# 抗锯齿

![抗锯齿](media/anti-aliasing.png)

**抗锯齿** 效果是减少像素锯齿和平滑几何边缘最常用的方法之一。Flax 提供了多种适用于各种类型游戏的 AA 实现。活动的抗锯齿模式可以在每个关卡、每个摄像机或每个游戏的 PostFx Volume 中指定。

## Fast Approximate Anti-Aliasing

快速近似抗锯齿（**FXAA**）是一种廉价但稳健的单通道后期效果，对大多数游戏而言，性能影响较低且质量可靠。它是各种游戏最常见的选择。

有关更多信息，请参阅：[FXAA 白皮书](http://developer.download.nvidia.com/assets/gamedev/files/sdk/11/FXAA_WhitePaper.pdf)。

## Temporal Anti-Aliasing

时间抗锯齿（**TAA**）是一种高级效果，其中帧在专用的历史缓冲区中随时间累积，用于平滑抖动边缘。它对投影矩阵应用亚像素抖动，并需要运动向量。

| 属性                    | 描述                                                         |
| ----------------------- | ------------------------------------------------------------ |
| **Jitter Spread**       | 抖动样本分布的直径（以纹素为单位）。较小的值会产生更清晰但锯齿更多的输出，而较大的值会产生更稳定但更模糊的输出。 |
| **Sharpness**           | 控制应用于颜色缓冲区的锐化量。TAA 可能会在高频区域导致轻微的细节损失。锐化可以缓解此问题。高值可能会引入暗边伪影。 |
| **Stationary Blending** | 静态片段的混合系数。控制对于活动运动最小的片段，混合到最终颜色中的历史样本百分比。 |
| **Motion Blending**     | 运动片段的混合系数。控制对于具有显著活动运动的片段，混合到最终颜色中的历史样本百分比。 |

## Subpixel Morphological Anti-Aliasing

亚像素形态抗锯齿（**SMAA**）是一种高质量的抗锯齿效果。根据你的作品艺术风格，它可以与 TAA 一样有效，同时避免了该技术的一些缺点。此效果比 FXAA 慢。

有关更多信息，请参阅：[SMAA 出版物](http://www.iryoku.com/smaa)。

## Contrast Adaptive Sharpening

对比度自适应锐化（**CAS**）是一个额外的滤镜通道，可以在 FXAA 或 SMAA 之后运行，以增加最终图像的对比度和颜色边缘的锐度。

| 属性                   | 描述           |
| ---------------------- | -------------- |
| **Sharpening Amount**  | 锐化强度。     |
| **Edge Sharpening**    | 边缘锐化强度。 |
| **Min Edge Threshold** | 最小边缘阈值。 |
| **Over Blur Limit**    | 过度模糊限制。 |
