# 渲染概述

![渲染概述](media/title.jpg)

Flax 引擎中的渲染系统利用最新图形 API（DirectX 12、Vulkan 等）管线的全部功能来创建丰富的效果，包括延迟着色、全局光照、全场景反射和后期处理。

## 渲染流程

单帧渲染流程如下图所示。

![渲染流程](media/RenderingFlow.jpg)

## 使用渲染百分比进行升采样

Flax 支持以较低分辨率进行场景渲染，并将图像升采样到窗口后缓冲区。这允许在较慢的设备上提高游戏性能。可以通过 `RenderingPercentage` 属性（每个 `SceneRenderTask`）进行配置。要更改游戏视口的分辨率缩放，请使用 `MainRenderTask.Instance.RenderingPercentage`（你可以在编辑器中的 *图形质量窗口* 中预览它）。它是渲染分辨率相对于输出尺寸的缩放。如果低于 1，场景和后期处理将以较低分辨率渲染，并升采样到输出后缓冲区。

Flax 默认使用 Catmull-Rom 滤波（9 抽头）执行升采样。对于更高级的升采样，你可以使用开源的 [AMD FidelityFX Super Resolution plugin for Flax Engine](https://github.com/FlaxEngine/FidelityFX-FSR)。

## 可用的显示分辨率

你可以使用以下代码获取可用的[屏幕分辨率和刷新率](https://docs.flaxengine.com/api/FlaxEngine.GPUDevice.VideoOutputMode.html)：

# [C#](#tab/code-csharp)
```cs
// 显示器
GPUDevice.VideoOutput[] outputs = GPUDevice.Instance.VideoOutputs;

// 全屏模式（VideoOutputIndex 将模式映射到特定输出）
GPUDevice.VideoOutputMode[] outputModes = GPUDevice.Instance.VideoOutputModes;
```
***

# [C++](#tab/code-cpp)

```cpp
#include "Engine/Graphics/GPUDevice.h"

// 显示器
const Array<GPUDevice::VideoOutput>& outputs = GPUDevice::Instance->VideoOutputs;

// 全屏模式（VideoOutputIndex 将模式映射到特定输出）
const Array<GPUDevice::VideoOutputMode>& outputModes = GPUDevice::Instance->VideoOutputModes;
```
***

根据连接的屏幕，相同的分辨率可能会以不同的刷新率出现多次。如果你只关心分辨率而不关心刷新率，你将需要进行一些自定义过滤，以确保每个分辨率只存在一次。
