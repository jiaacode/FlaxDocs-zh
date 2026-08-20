# 使用音频

[音频片段](audio-clip.md) 资源由 [音频源](audio-source.md) 使用，用于在游戏过程中播放音频。
要使用声音，请创建一个新的音频源（通过工具箱或场景窗口上下文菜单），并将片段绑定到它，或者直接将音频片段拖放到视口中。

![使用音频片段](media/use-audio-clip.jpg)

接下来，你可以勾选 **启动时播放** 属性，源将在游戏启动时立即开始播放声音。

![在关卡启动时播放音频](media/play-on-start-audio.jpg)

## 播放音频

播放/暂停/停止音频源的最常见方式是使用 C# API：
* [AudioSource.Play](https://docs.flaxengine.com/api/FlaxEngine.AudioSource.html#FlaxEngine_AudioSource_Play) - 开始播放分配的音频片段。如果播放当前已停止，则从片段开头开始播放。如果已暂停，则从暂停点恢复播放。
* [AudioSource.Pause](https://docs.flaxengine.com/api/FlaxEngine.AudioSource.html#FlaxEngine_AudioSource_Pause) - 暂停播放分配的音频片段，允许你稍后通过调用 Play 来恢复。
* [AudioSource.Stop](https://docs.flaxengine.com/api/FlaxEngine.AudioSource.html#FlaxEngine_AudioSource_Stop) - 停止播放分配的音频片段。

## 定位

你可以使用属性 AudioSource.Time 定位到当前分配的音频片段中的特定位置。它接受以秒为单位的时间。如果片段当前正在播放，播放将跳转到指定的时间。如果片段当前已暂停，则下次调用 Play() 时将从指定的时间恢复播放。

## 3D 声音

如果音频片段被标记为 3D 声音，则声音播放将受到音频源组件所附加的场景对象的位置和/或速度的影响。这意味着此类声音将根据它们与监听器的距离（以及其他属性）而听起来不同。这确保了当玩家在关卡中走动时，声音感觉逼真（例如，在远处时声音更轻，或使用环绕声将声音投射到玩家身后）。

3D 声音仅在场景中定义了[监听器](audio-listener.md)时有效。
