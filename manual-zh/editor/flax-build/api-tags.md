# API 标签

## API_CLASS(...)

在类上使用它以将其暴露给脚本 API。你可以在大括号中指定自定义属性。
示例：

```cpp
/// <summary>
/// 链接到动画模型骨骼节点变换的 Actor。
/// </summary>
API_CLASS(Sealed) class BoneSocket : public Actor
{
...
}
```

***

## API_STRUCT(...)

在结构体上使用它以将其暴露给脚本 API。你可以在大括号中指定自定义属性。
示例：

```cpp
API_STRUCT() struct MyGameData
{
...
}
```

***

## API_INTERFACE(...)

在类上使用它以将其作为类接口暴露给脚本 API。你可以在大括号中指定自定义属性。
示例：

```cpp
API_INTERFACE() class IMyInterface
{
...
}
```

***

## API_PROPERTY(...)

在属性 getter/setter 方法上使用它以将属性暴露给脚本 API。你可以在大括号中指定自定义属性。
示例：

```cpp
/// <summary>
/// 获取指示是否使用目标节点缩放的值。否则不会覆盖 Actor 缩放。
/// </summary>
///<returns>如果设置为 <c>true</c>，则节点插槽将使用目标节点缩放，否则将被忽略。</returns>
API_PROPERTY()
FORCE_INLINE bool GetUseScale() const
{
    return _useScale;
}

/// <summary>
/// 设置指示是否使用目标节点缩放的值。否则不会覆盖 Actor 缩放。
/// </summary>
///  <param name="value">如果设置为 <c>true</c>，则节点插槽将使用目标节点缩放，否则将被忽略。</param>
API_PROPERTY()
void SetUseScale(bool value);
```

***

## API_FIELD(...)

在字段上使用它以将其暴露给脚本 API。你可以在大括号中指定自定义属性。
示例：

```cpp
/// <summary>
/// 自定义缩放选项。
/// </summary>
API_FIELD()
float Scale = 1.0f;
```

***

## API_FUNCTION(...)

在函数上使用它以将其暴露给脚本 API。你可以在大括号中指定自定义属性。
示例：

```cpp
/// <summary>
/// 基于骨骼节点更新 Actor 变换。
/// </summary>
API_FUNCTION()
void UpdateTransformation();
```

***

## API_PARAM(...)

在函数参数上使用它以调整脚本与原生之间的参数转换。
示例：

```cpp
API_FUNCTION()
int32 CalculateSpeedParams(API_PARAM(ref) Vector3& offset);
```

***

## API_EVENT(...)

在委托字段上使用它以将其作为事件暴露给脚本 API。
示例：

```cpp
API_EVENT() Delegate<float> SpeedChanged;
```

***

## API_TYPEDEF(...)

在类型别名上使用它以将其暴露给脚本 API。
示例：

```cpp
// 从模板 `Vector3Base<T>` 引入 `Float3` 类型
API_TYPEDEF() typedef Vector3Base<float> Float3;

// 将 `Real` 类型别名为 `float`
API_TYPEDEF(Alias) typedef float Real;
```

***

## API_AUTO_SERIALIZATION()

在类或结构体内部使用它，以为 `ISerializable` 接口生成自动对象数据序列化代码。
示例：

```cpp
API_STRUCT() struct ToneMappingSettings : ISerializable
{
API_AUTO_SERIALIZATION();
DECLARE_SCRIPTING_TYPE_NO_SPAWN(ToneMappingSettings);
};
```

***

## API_INJECT_CODE

自定义宏，用于将代码插入到生成的 C#/C++ 绑定代码中。可用于通过 `typedef`/`using` 覆盖类型，或包含附加文件。极少使用。

```cpp
API_INJECT_CODE(cpp, "#include \"Engine/Platform/Platform.h\"");
```

***

## 标签参数

可以添加到 API 标签大括号中的标签属性，以调整绑定逻辑：

* `Static` - 将方法/类/属性标记为不使用对象实例，而是在代码中为静态
* `Sealed` - 使类为最终类，阻止继承
* `Abstract` - 使类为抽象类（不能创建对象，只能被继承）
* `Public`/`Protected`/`Private` - 为方法/类/属性指定的访问级别，用于定义在脚本 API 中的可见性
* `InBuild` - 将类型（类、结构、枚举）标记为脚本 API 中的内置类型（跳过生成，假设它已在绑定 API 中）
* `Attributes="..."` - 为生成的类型或成员添加自定义属性，这些属性会添加到 C# 类型属性中
* `ReadOnly` - 将类中的字段设为只读（仅生成 getter，不生成 setter）
* `NoProxy` - 跳过代理方法生成（用于方法）
* `NoConstructor` - 跳过类构造函数方法生成
* `Ref` - 将函数参数标记为通过引用传递
* `NoPod` - 强制将结构标记为非 POD 类型（绑定生成器将强制使用包装结构，并且结构不会在绑定胶水代码中按原生值传递）
* `NoArray` - 标记固定大小数组使用固定大小数据，而不是在绑定中分配动态内存数组（该类型的结构字段将被内联为一系列字段，而不是数组）
* `Name="..."` - 覆盖要在绑定中使用的类型名称
* `Namespace="..."` - 覆盖要在绑定中使用的类型的命名空间
* `Hidden` - 将方法/字段/属性标记为在脚本 API 中隐藏（跳过 C# 和可视化脚本访问，但允许自动序列化它）
* `Template` - 将结构/类/接口标记为泛型类型，以用作其他类型的模板（例如通过 `API_TYPEDEF`）
* `Alias` - 标记 typedef 以别名类型名称，而不是展开模板类型
* `DefaultValue="..."` - 为 `API_PARAM` 注入自定义默认值
* `Tag="..."` - 为类型或成员添加自定义标签，可由自定义扩展和构建系统插件使用。标签值的格式为 `name=value`。可以同时添加多个标签
* `this` - 将静态方法参数标记为扩展方法（C#）

## 特殊情况

### Array<T>

如果属性或方法使用原生 Array<T> 作为输入或输出，它将在脚本中被解释为 T[]。
此外，绑定生成器将实现原生与托管对象类型之间的自动转换（包括复制操作）。
如果你想从原生方法返回项目数组，可以按值返回（例如 `API_FUNCTION() Array<Guid> GetIds()`）。绑定生成器会将其转换为托管数组（数组元素支持的类型包括值类型、枚举、字符串以及脚本对象，例如 Actor、脚本、资源指针、对象引用）。

### Dictionary<KeyType, ValueType>

如果属性或方法使用原生 Dictionary<KeyType, ValueType> 作为输入或输出，它将在脚本中被解释为 System.Collections.Generic.Dictionary<KeyType, ValueType>。
此外，绑定生成器将实现原生与托管对象类型之间的自动转换（包括复制操作）。
