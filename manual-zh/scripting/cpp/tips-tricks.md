# Flax 中 C++ 的提示与技巧

* 要创建新对象，请使用 `New<Type>()` —— 它使用 Flax 分配器分配内存
* 对于字符串字面量，请使用 `TEXT("My Cool Text in UTF-16")` 宏
* 你可以使用指向资源的原始指针，但安全的方式是使用 `AssetReference<T>` 或 `WeakAssetReference<T>`
* 要以安全的方式引用场景对象和其他脚本，优先使用 `ScriptingObjectReference<T>`
* 脚本类若要在编辑器中可见并用于 C# 脚本，需要在其之前添加 `API_CLASS()` 元宏，并添加 `DECLARE_SCRIPTING_TYPE(<typename>);`
* 默认情况下，脚本对象包含一个接受单个参数 `const SpawnParams& params` 的构造函数
* 要将字段暴露给编辑器和 C# 脚本，请使用 `API_FIELD()` 前缀宏，其中可以包含额外的元数据属性
* 要将函数暴露给编辑器和 C# 脚本，请使用 `API_FUNCTION` 前缀宏
* 你可以使用类似于 C# 的引擎 API（例如 Camera、Physics、Input...）
* 在 `class` 和类名之间使用的 `<module_name>_API` 定义（即 `class GAME_API MouseDecalShoot`）用于将 C++ 类导出为公共模块符号，以便其他代码可以使用它
* 你可以手动重写 `Serialize`/`Deserialize` 方法，或使用 `API_AUTO_SERIALIZATION` 宏来自动生成类型的序列化代码（适用于继承自 `ISerializable` 的类和结构体）
* 如果你的游戏模块使用了来自各种引擎模块（例如 Graphics、Physics）的类型，你必须在构建脚本中添加对它们的引用，以便构建工具能够处理模块依赖关系并正确链接二进制文件 —— 只需在构建脚本中添加 `options.PublicDependencies.Add("<module_name>");`（其中模块名称是 Physics/Terrain/等 —— 请参阅 BuildScripts 以获取所有可用的模块）
* 引擎使用 C++14 版本，但你可以在构建脚本中使用 `options.CompileEnv.CppVersion = CppVersion.Cpp17;` 来为你的代码模块覆盖它
* 使用带有编辑器 UI 选择器的场景资源引用：

```cpp
API_FIELD() SceneReference Scene;
```

***

* 类对象的自定义构造函数示例：

```cpp
// .h
API_CLASS() class GAME_API Primitives : public Actor
{
DECLARE_SCRIPTING_TYPE(Primitives);
public:
    Primitives(const SpawnParams& params, int32 pt);
};

// .cpp
Primitives::Primitives(const SpawnParams& params)
	: Actor(params)
{
    // 默认构造函数体
}
Primitives::Primitives(const SpawnParams& params, int32 pt)
	: Actor(params)
{
    // 自定义构造函数体
}

// 用法
int32 pt = 11;
auto obj = New<Primitives>(SpawnParams(Guid::New(), Primitives::TypeInitializer), pt);
```

***

* 你可以将脚本枚举值转换为字符串（例如用于日志记录）或将其解析回来（例如从控制台命令输入）：

```cpp
API_ENUM()
enum class PlayerStates
{
    Idle,
    Running,
    Swimming,
    Attacking,
    Died,
};

#include "Engine/Core/Log.h"
#include "Engine/Scripting/Enums.h"

PlayerStates playerState = PlayerStates::Attacking;
LOG(Info, "Player state: {0} = {1}", ScriptingEnum::ToString(playerState), playerState);
String stateName = ScriptingEnum::ToString(PlayerStates::Running);
PlayerStates state = ScriptingEnum::FromString<PlayerStates>(stateName);
LOG(Info, "Player state: {0} = {1}", stateName, state);
```

***

请参阅 `ScriptingEnum` 以了解更多信息。
