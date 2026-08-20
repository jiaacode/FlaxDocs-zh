# 引擎 API

用于游戏编程的脚本 API 列表（适用于 C++、C# 和可视化脚本）：
* `Engine` - 全局引擎 API
* `Content` - 资源加载和内容管理
* `Audio` - 音频效果和音乐播放
* `DebugDraw` - 调试形状绘制
* `DebugLog` - 调试日志消息发送
* `Globals` - 全局引擎变量容器
* `Screen` - 游戏视口管理工具
* `Time` - 游戏计时和时间管理
* `Graphics` - 渲染质量和管理
* `Input` - 用户输入读取、访问和处理
* `Level` - Actor 和场景对象生命周期处理的场景管理器
* `Navigation` - AI 的寻路和导航工具
* `Physics` - 物理模拟管理器
* `Platform` - 低级运行时平台实现（内存访问、系统信息等）
* `Clipboard` - 系统剪贴板
* `MessageBox` - 原生平台消息框弹出工具
* `Render2D` - 2D 图形渲染系统
* `Renderer` - 3D 图形渲染系统
* `Scripting` - 游戏脚本管理器
* `Localization` - 语言和区域设置本地化系统

## 对象层级

Flax 中使用的主要对象类型的层级关系图。

在 C# 和可视化脚本 API 中，`FlaxEngine.Object` 类型映射为 `ScriptingObject`。

![Flax 对象层级关系图](/manual/media/objects-hierarchy.png)

## 引擎架构

下图显示了引擎和编辑器的简化架构。

![Flax 引擎架构](/manual/media/engine-architecture.png)
