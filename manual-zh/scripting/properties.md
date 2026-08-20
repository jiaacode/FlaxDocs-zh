# 脚本属性和字段

每个脚本都可以包含各种字段和属性。默认情况下，Flax 在 *属性* 窗口中显示所有 **公共字段和属性**，以便用户编辑它们（支持撤销/重做）。

# 脚本

# [C#](#tab/code-csharp)
[!code-csharp[示例1](code-examples/properties.cs)]
# [C++](#tab/code-cpp)
[!code-cpp[示例2](code-examples/properties.h)]
***

![脚本属性](media/script-ui.png)

# 特性

如果你想 **隐藏** 一个公共属性或字段，只需使用 [HideInEditor](https://docs.flaxengine.com/api/FlaxEngine.HideInEditorAttribute.html) 特性。

# [C#](#tab/code-csharp)
```cs
[HideInEditor]
public float Field1 = 11;
```
***

# [C++](#tab/code-cpp)

```cpp
API_FIELD(Attributes="HideInEditor")
float Field1 = 11;
```
***

如果你 **不想序列化** 一个公共属性或字段，请使用 [NoSerialize](https://docs.flaxengine.com/api/FlaxEngine.NoSerializeAttribute.html) 特性。

# [C#](#tab/code-csharp)
```cs
[NoSerialize]
public float Field1 = 11;
```
***

# [C++](#tab/code-cpp)

```cpp
API_FIELD(Attributes="NoSerialize")
float Field1 = 11;
```
***

要了解有关使用特性的更多信息，请参阅[此页面](attributes.md)。

要了解有关脚本序列化的更多信息，请参阅[此页面](serialization/index.md)。
