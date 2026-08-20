# 操作指南：从代码创建场景动画

在以下教程中，你将学习如何从 C# 脚本创建场景动画资源。要了解如何创建场景动画，请参阅[此页面](../scene-animation.md)。

此代码仅在编辑器内工作，旨在供游戏工具代码（如编辑器插件）使用，以生成过场动画或对话序列。它可用于自动化对话/过场动画开发。

## 教程

### 1. 创建生成场景动画的脚本

```cs
using System.IO;
using FlaxEditor;
using FlaxEditor.GUI.Timeline;
using FlaxEditor.GUI.Timeline.Tracks;
using FlaxEngine;

public class TestScript : Script
{
    public AudioClip Audio;

    public override void OnStart()
    {
#if FLAX_EDITOR
        // 从代码创建时间线
        var timeline = new SceneAnimationTimeline();

        // 添加文件夹轨道
        var folderTrack = (FolderTrack) timeline.AddTrack(FolderTrack.GetArchetype());
        folderTrack.Color = Color.Red;
        folderTrack.Rename("My Folder");

        // 添加音频轨道
        var audioTrack = (AudioTrack) timeline.AddTrack(AudioTrack.GetArchetype());
        audioTrack.Asset = Audio;
        audioTrack.ParentTrack = folderTrack;

        // 将时间线数据序列化为字节
        var data = timeline.Save();

        // 将数据保存到资源文件
        var path = Path.Combine(Globals.ProjectContentFolder, "My Scene Anim.flax");
        Editor.CreateAsset(Editor.NewAssetType.SceneAnimation, path);
        var sceneAnimation = Content.Load<SceneAnimation>(path);
        sceneAnimation.SaveTimeline(data);

        // 现在可以使用创建的 SceneAnimation 了
#endif
    }
}
```

***

### 2. 添加脚本并运行它

将脚本添加到 Actor 并播放。你可以在[编辑器插件](../../../scripting/plugins/index.md)或[自定义编辑器窗口](../../../scripting/tutorials/custom-window.md)中使用此代码。

### 3. 查看结果

现在在你的游戏 Content 文件夹中应该有一个 `My Scene Anim` 资源。打开它并查看创建的场景动画。

![从代码创建的场景动画](/manual/media/scene-animation-from-code.png)
