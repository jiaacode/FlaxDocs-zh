# 视频

![视频](/manual/media/video.gif)

视频播放器允许加载 `.mp4` 文件并播放其中的视频和音频。本文档描述了如何在项目中导入和使用视频。

## 导入视频文件

使用内容窗口的导入功能，或将视频文件**拖放到内容窗口**中，以将源文件复制到项目中。视频文件通过项目文件夹中的路径（相对于根文件夹）进行标识，引擎不会为它们使用任何资源 ID 或元数据文件。

![视频文件预览](/manual/media/video-preview.png)

然后你可以**双击资源项以打开窗口**，该窗口可以播放视频进行预览。

## 视频播放器

![视频播放器](/manual/media/video-player.png)

`VideoPlayer` 是用于播放视频的 Actor。它可以添加到场景中、添加到预制体中、附加到 UI，或从代码中动态生成。`Url` 属性定义了要播放的视频路径。它可以是本地文件、绝对路径或 HTTP URL。编辑器在 URL 文本字段旁边提供了一个小的下拉按钮，其中显示了项目中可供选择的视频文件列表。

在烘焙游戏时，视频文件（由场景/预制体引用）会被复制到输出 `Content` 目录中（保留子路径）。

#### 属性

| 属性             | 描述                                                         |
| ---------------- | ------------------------------------------------------------ |
| **Url**          | 用作媒体源的视频片段 Url 路径。可以是本地文件（绝对路径或相对路径），或流式资源（`http://`）。 |
| **循环**         | 确定视频片段播放完成后是否应循环播放。                       |
| **启动时播放**   | 确定视频片段是否应在关卡启动时自动播放。                     |
| **起始时间**     | 确定如果启用了 *Play On Start*，视频片段开始播放的时间（以秒为单位）。 |
| **音频空间化**   | 如果勾选，视频播放器使用空间化来播放 3D 音频，否则将始终作为 2D 声音播放。 |
| **音频音量**     | 从此视频播放的音频音量，范围为 `[0, 1]`。                    |
| **音频声像**     | 播放音频的立体声声像（`-1` 为左扬声器，`1` 为右扬声器，`0` 为平衡）。默认值为 0。仅用于非空间音频。 |
| **音频最小距离** | 音频衰减开始的最小距离。当监听器距离视频播放器小于此值时，音频以全音量播放。一旦距离更远，音频开始衰减。仅用于空间音频。 |
| **音频衰减**     | 控制当监听器远离视频播放器时音频音量下降速度的衰减。当值为 0 时，永远不会发生距离衰减。仅用于空间音频。 |

#### 脚本

| API              | 描述                                                         |
| ---------------- | ------------------------------------------------------------ |
| **Play**         | 开始播放当前分配的视频 Url。                                 |
| **Pause**        | 暂停视频播放。                                               |
| **Stop**         | 停止视频播放，并将其倒回到开头。                             |
| **GetState**     | 获取视频播放的当前状态（播放中/已暂停/已停止）。             |
| **GetTime**      | 获取当前播放时间。时间以秒为单位，范围为 `[0, Duration]`。   |
| **SetTime**      | 设置当前播放时间。时间以秒为单位，范围为 `[0, Duration]`。   |
| **GetDuration**  | 获取媒体的播放时长（以秒为单位）。仅在媒体已被视频后端加载时有效。 |
| **GetFrameRate** | 获取媒体的播放帧率（每秒播放的帧数）。仅在媒体已被视频后端加载时有效。 |
| **GetSize**      | 获取视频帧尺寸（以像素为单位）。仅在媒体已被视频后端加载时有效。 |
| **GetFrame**     | 获取视频帧纹理（GPU 资源）。在播放开始时创建。可以绑定到材质和着色器以显示视频图像。 |

## 视频画笔

![新建视频画笔](/manual/media/video-brush-new.png)

`VideoBrush` 实现了 `IBrush` 接口，用于在 UI 内显示 VideoPlayer 的图像。这可以用于 `Image` 控件（或任何其他使用画笔的控件）来显示基于视频的加载画面、游戏工作室开场动画、预渲染的过场动画或游戏结束字幕。视频画笔需要引用视频播放器来访问 GPU 纹理——通过 `Player` 属性分配它。

![编辑视频画笔](/manual/media/video-brush-edit.png)

## 材质

要在世界中的网格上显示视频帧，请向材质添加 `GPUTexture` 参数，并在脚本中将其设置为 `VideoPlayer.Frame`。请参阅下面的示例脚本：

```cs
using System;
using System.Collections.Generic;
using FlaxEngine;

public class MyVideoMesh : Script
{
    public VideoPlayer Player;
    public StaticModel Model;
    public string VideoFrameParamName = "VideoFrame";

    private List<MaterialInstance> _materials = new List<MaterialInstance>();

    public override void OnEnable()
    {
        // 播放视频
        // 注意：如果视频尚未开始播放，Player.Frame 可能为空
        Player.Play();

        // 为使用带有参数的材质的网格创建动态材质
        var slots = Model.MaterialSlots;
        for (int i = 0; i < slots.Length; i++)
        {
            var material = Model.GetMaterial(i);
            if (material.GetParameter(VideoFrameParamName) != null)
            {
                // 创建带有自定义参数值的虚拟材质
                material = material.CreateVirtualInstance();
                material.SetParameterValue(VideoFrameParamName, Player.Frame);
                slots[i].Material = material;
                _materials.Add(material);
            }
        }
    }

    public override void OnDisable()
    {
        // 移除动态材质
        var slots = Model.MaterialSlots;
        foreach (var slot in slots)
        {
            if (_materials.Contains(slot.Material as MaterialInstance))
            {
                // 取消链接虚拟材质（网格将使用默认材质）
                slot.Material = null;
            }
        }
        _materials.Clear();
    }
}
```

***

## 命名

* `H.264` 或 `AVC` - 常见的视频格式
* `H.265` 或 `HEVC` - 高级视频格式
* `HLC` - HTTP 直播流

## 支持的格式

Flax 支持在所有平台上解码和播放 `H.264` 格式的 `.mp4` 视频。某些平台有额外的限制（例如最大帧率或最大分辨率），而其他平台支持更多格式。使用下表了解平台支持情况（近似值，请查阅平台文档以了解更多信息）：

| 平台        | 后端                                                         | H.264 | H.265 | HLS  | 最大分辨率 |
| ----------- | ------------------------------------------------------------ | ----- | ----- | ---- | ---------- |
| **Windows** | [Media Foundation](https://learn.microsoft.com/en-us/windows/win32/medfound/microsoft-media-foundation-sdk) | X     | X     | X    | 4K         |
| **Xbox**    | [Media Foundation](https://learn.microsoft.com/en-us/windows/win32/medfound/microsoft-media-foundation-sdk) | X     |       |      | 全高清     |
| **Android** | [Android NDK Media](https://developer.android.com/ndk/reference/group/media) | X     |       | X    | 全高清     |
| **Linux**   | *未实现*                                                     |       |       |      |            |
| **macOS**   | [AVFoundation](https://developer.apple.com/av-foundation/)   | X     | X     | X    | 4K         |
| **iOS**     | [AVFoundation](https://developer.apple.com/av-foundation/)   | X     | X     | X    | 4K         |
| **PS4**     | *AvPlayer*                                                   | X     |       |      | 全高清     |
| **PS5**     | *AvPlayer*                                                   | X     |       |      | 全高清     |
| **Switch**  | *movie*                                                      | X     |       |      | 全高清     |
| **Web**     | *未实现*                                                     |       |       |      |            |
