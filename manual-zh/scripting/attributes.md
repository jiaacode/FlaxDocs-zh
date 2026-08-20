# 特性

Flax 提供了各种特性，用于扩展默认逻辑或提供关于代码的元数据（序列化和编辑选项）。这些特性可以在 C# 以及 C++ 中使用。

## 使用特性
大多数特性都可以用于字段和属性：

# [C#](#tab/code-csharp)
```cs
[Limit(0, 10)]
public float Field1 = 11f;

[Tooltip("Light color")]
public Color Field2 { get; set; }
```
***

# [C++](#tab/code-cpp)

```cpp
API_FIELD(Attributes = "Limit(0, 10)")
float Field1 = 11f;

API_FIELD(Attributes = "Tooltip(\"Light color\")")
Color ColorVal;
```
***

## 常见特性

下表列出了最常见的特性及其用法描述。

| 特性                  | 描述                                                         |
| --------------------- | ------------------------------------------------------------ |
| **Serialize**         | 指示字段或属性应被序列化。                                   |
| **NoSerialize**       | 指示字段或属性不应被序列化。                                 |
| **HideInEditor**      | 使变量不在编辑器中显示。                                     |
| **ShowInEditor**      | 使变量在编辑器中显示（即使是私有的）。如果在私有字段/属性上使用，你可能还需要添加 SerializeAttribute 以确保修改后的值被序列化。 |
| **Tooltip**           | 在编辑器中为属性/字段指定工具提示。用于为对象属性提供文档说明。 |
| **Limit**             | 用于将脚本中的 float 或 int 变量限制在特定范围内。           |
| **Range**             | 用于将脚本中的 float 或 int 变量限制在特定范围内。使用时，float 或 int 将在编辑器中显示为滑块，而不是默认的数字字段。 |
| **Header**            | 在编辑器布局中插入带有自定义文本的标题控件。                 |
| **Space**             | 在编辑器的控件之间插入空白空间。                             |
| **EditorDisplay**     | 允许更改项目在编辑器中的显示名称或分组。                     |
| **EditorOrder**       | 允许声明项目在编辑器中的顺序。项目按从最低到最高的顺序列出。 |
| **MultilineText**     | 指示 UI 编辑器使用多行文本框来编辑 *string* 属性或字段。     |
| **AssetReference**    | 指定编辑器中的资源引用选择器的选项。允许自定义视图或提供自定义值分配策略。 |
| **Collection**        | 此特性为编辑器中的成员集合提供附加信息。                     |
| **CustomEditor**      | 覆盖为目标对象/类/字段/属性提供的默认编辑器。允许扩展对象的视觉效果和编辑体验。要了解更多信息，请参阅[自定义编辑器](custom-editors/index.md)文档。 |
| **CustomEditorAlias** | 与 *CustomEditor* 特性工作方式相同，不同之处在于它使用可以位于不同程序集（未引用）中的类型名称。 |
| **ExecuteInEditMode** | 使脚本在编辑模式下执行。                                     |
| **RequireChildActor** | 如果尚未添加所需的子 Actor，则自动添加它们作为依赖项。       |
| **RequireActor**      | 需要特定的 Actor 类型。                                      |
| **RequireScript**     | 需要特定的 Script 类型。                                     |
| **VisibleIf**         | 仅当指定的成员具有给定值时，才在编辑器中显示属性/字段。可用于根据其他属性（也包括私有属性）隐藏属性。给定的成员必须是 bool 类型。 |
| **DefaultValue**      | 可用于指定字段或属性的默认值。编辑器将高亮显示修改过的属性，并添加将值恢复为默认值的选项。你可以在基本类型上使用它，例如：`[DefaultValue(3.14f)] public float MyValue;` 或在复杂类型上使用：`[DefaultValue(typeof(Vector2), "1,2")] public Vector2 StartPosition;`。 |
| **ReadOnly**          | 标记有此特性的属性和字段在检查器中不可编辑。这允许在编辑器中显示对象属性值，但不提供修改值的选项，这在某些情况下可能很方便。 |
| **Category**          | 描述类型的类别名称。可用于对脚本、资源或 Actor 类型进行分组，以便在编辑器选择器中组织类型。 |
| **Watermark**         | 在编辑器字段中的字符串文本框上添加水印。                     |
| **Button**            | 在属性面板中添加一个按钮，用户可以单击该按钮来调用一个方法。 |

## Button 特性

Button 特性可以在编辑器的属性面板中将方法显示为可单击的按钮。它适用于 C++/C#/可视化脚本中的静态方法和成员方法。

# [C#](#tab/code-csharp)
```cs
/// <summary>
/// 按钮的工具提示来自此注释。
/// </summary>
[Button]
private void CallMe()
{
    Debug.LogError("Ho!");
}

[Button("Another Button", "Custom tooltip text")]
public static void CallMeTest()
{
    Debug.LogError("Hello there!");
}
```
***

# [C++](#tab/code-cpp)

```cpp
// 按钮的工具提示来自此注释。
API_FUNCTION(Attributes="Button")
void CallMe()
{
    LOG(Error, "Ho!");
}

API_FUNCTION(Attributes="Button(\"Another Button\", \"Custom tooltip text\")")
static void CallMeTest()
{
    LOG(Error, "Hello there!");
}
```
***

# [Visual Script](#tab/code-vs)
右键单击函数节点标题，选择 *Edit attributes..* 菜单。然后添加新的 `Button Attribute` 并点击 *OK* 按钮。

![可视化脚本中的 Button 特性](media/vs-button-attribute.png)

***

## 编辑器中的脚本执行

通过使用 **编辑模式下执行**，你可以使脚本在编辑器中运行。这对于从代码为游戏生成程序化内容非常有用。以下是一个在编辑器中生成灯光网格的示例脚本：

# [C#](#tab/code-csharp)
[!code-csharp[Example1](code-examples/attributes.cs)]
# [C++](#tab/code-cpp)
[!code-cpp[Example2](code-examples/attributes.h)]
***
