# 调试命令

`DebugCommand` 是一个可以放置在类、字段、方法和属性上的特性，用于将它们暴露出来以供配置、模组或工具使用。

> [!TIP]
> 调试命令中只能使用 `static` 成员。

## 参考

Flax 引擎中所有可用控制台命令的完整列表请[参见此处](debug-commands-list.md)。

## 访问

### 输出日志

![输出日志中的调试命令](media/debug-commands-output-log.gif)

[输出日志](../../editor/windows/output-log.md) 是显示完整日志的编辑器窗口。在该窗口的底部，有一个输入命令字段，可用于运行命令。你可以输入命令，并会自动弹出搜索框，根据输入的值显示类似的命令。使用方向键在弹出列表中导航。Tab 键可用于根据最佳匹配自动补全命令。最后，当输入为空时，你可以使用向上方向键在命令历史记录中导航并重新尝试其中的一个。

### 游戏内控制台

![游戏内调试命令](media/debug-commands-in-game.png)

调试命令可以出现在游戏内控制台或调试工具中。例如，[Arizona 框架](https://github.com/FlaxEngine/ArizonaFramework) 通过 [ImGui](https://github.com/FlaxEngine/ImGui) 实现了控制台。此类工具在为主机等需要运行时调整游戏配置的各种平台和设备开发游戏时非常有用。

### `DebugCommands` API

使用 `DebugCommands` 类来执行或列出项目中的调试命令。它会缓存引擎、游戏和插件项目的所有命令。

使用示例：

# [C#](#tab/code-csharp)
```cs
// 禁用垂直同步
DebugCommands.Execute("Graphics.UseVSync false");
```
***

# [C++](#tab/code-cpp)

```cpp
// 禁用垂直同步
DebugCommands::Execute(TEXT("Graphics.UseVSync false"));
```
***

## 示例

# [C#](#tab/code-csharp)
```cs
using FlaxEngine;

/// <summary>
/// 全局游戏配置。
/// </summary>
[DebugCommand]
public static class GameGlobals
{
    /// <summary>
    /// 禁用玩家伤害。
    /// </summary>
    public static bool GodMode = false;
}

/// <summary>
/// 玩家脚本。
/// </summary>
public class PlayerLogic : Script
{
    /// <summary>
    /// 玩家速度缩放。
    /// </summary>
    [DebugCommand]
    public static float SpeedScale = 1.0f;

    /// <summary>
    /// 将玩家 HP 恢复到最大值。
    /// </summary>
    [DebugCommand]
    public static void HealPlayer()
    {
        //..
    }
}
```
***

# [C++](#tab/code-cpp)

```cpp
// 全局游戏配置。
API_CLASS(Static, Attributes="DebugCommand") class GAME_API GameGlobals
{
    DECLARE_SCRIPTING_TYPE_NO_SPAWN(GameGlobals);
public:
    // 禁用玩家伤害。
    API_FIELD() static bool GodMode;
};

// 玩家脚本。
API_CLASS() class GAME_API PlayerLogic : public Script
{
    API_AUTO_SERIALIZATION();
    DECLARE_SCRIPTING_TYPE(PlayerLogic);
public:
    // 玩家速度缩放。
    API_FIELD(Attributes="DebugCommand") static float SpeedScale;

    // 将玩家 HP 恢复到最大值。
    API_FUNCTION(Attributes="DebugCommand") static void HealPlayer();
};
```
***
