# 接口

Flax 脚本 API 支持在类上使用接口，将不相关的功能分离到不同的接口中。这在设计较大的游戏系统或确保代码可扩展性时非常有用。

## 接口声明

声明接口与声明普通类非常相似：只需使用 `API_INTERFACE` 标签。然后你可以声明虚函数作为接口的一部分。

```cpp
#pragma once

#include "Engine/Scripting/ScriptingType.h"

API_INTERFACE() class GAME_API IMyInterface
{
DECLARE_SCRIPTING_TYPE_MINIMAL(IMyInterface);

    // 接口虚方法
    API_FUNCTION() virtual float GetSpeed(const Vector3& v) = 0;
};
```

***

> [!Tip]
> 带有抽象方法（已删除虚函数）但不包含 `API_FUNCTION` 标签的接口不受支持。

## 接口实现

下一步是在类上定义接口继承并实现其所有方法。接口可以在任何脚本对象上实现，例如 `Script`、`Actor`、`PersistentScriptingObject`。接口方法是虚方法，因此它们也可以在 C# 和可视化脚本中被重写。

### C++

```cpp
#pragma once

#include "IMyInterface.h"
#include "Engine/Scripting/Script.h"

// 实现自定义接口的脚本
API_CLASS() class GAME_API InterfaceInCpp : public Script, public IMyInterface
{
API_AUTO_SERIALIZATION();
DECLARE_SCRIPTING_TYPE(InterfaceInCpp);

    float GetSpeed(const Vector3& v) override
    {
        // 实现接口方法
        return v.Length();
    }
};
```

***

### C#

```cs
// 实现自定义接口的脚本
public class InterfaceInCSharp : Script, IMyInterface
{
    public float GetSpeed(Vector3 v)
    {
        // 实现接口方法
        return v.Length;
    }
}
```

***

## 接口调用

### C++

```cpp
#pragma once

#include "IMyInterface.h"
#include "Engine/Scripting/Script.h"

API_CLASS() class GAME_API InterfaceInCpp : public Script
{
API_AUTO_SERIALIZATION();
DECLARE_SCRIPTING_TYPE(InterfaceInCpp);

    // 指向实现了接口的对象的指针（可以从 C++、C# 或可视化脚本中的其他脚本设置）
    API_FIELD() ScriptingObject* MyInterface = nullptr;

    void OnUpdate() override
    {
        // 将对象转换为接口
        auto interface = ToInterface<IMyInterface>(MyInterface);
        if (interface)
        {
            // 调用接口方法（适用于 C++ 和 C# 接口实现）
            interface->GetSpeed(Vector3::One);
        }
    }
};
```

***

### C#

```cs
public class InterfaceInCSharp : Script, IMyInterface
{
    // 指向实现了接口的对象的引用（可以从 C# 或可视化脚本中的其他脚本设置）
    public FlaxEngine.Object MyInterface;

    public override void OnUpdate()
    {
        // 将对象转换为接口
        var inter = MyInterface as IMyInterface;
        if (inter != null)
        {
            // 调用接口方法（适用于 C++ 和 C# 接口实现）
            inter.GetSpeed(Vector3.One);
        }
    }
}
```

***

## 检查对象是否实现了接口

### C++

```cpp
auto someObject = GetActor();
if (someObject && someObject->GetType().GetInterface(IMyInterface::TypeInitializer))
{
    // someObject 实现了 IMyInterface 接口...
}
```

***

### C#

```cs
var someObject = Actor;
if (someObject is IMyInterface)
{
    // someObject 实现了 IMyInterface 接口...
}
```

***
