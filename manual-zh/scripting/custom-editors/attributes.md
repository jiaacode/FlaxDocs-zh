# 自定义编辑器特性

本页面列出了自定义编辑器管线使用的所有常见特性。每个属性都附有简短说明和使用示例。

### HideInEditor

使变量不在编辑器中显示。

```cs
[HideInEditor]
public int CoolVariable;
```

***

![示例](/manual/media/HideInEditor.jpg)

### ShowInEditor

使变量在编辑器中显示，即使它是私有的。
如果在私有字段/属性上使用，你可能还需要添加 `SerializeAttribute` 以确保修改后的值被序列化。

```cs
[ShowInEditor]
private int CoolVariable;
```

***

### VisibleIf

仅当指定成员具有给定值时，才在编辑器中显示属性/字段。可用于基于其他属性（也包括私有属性）隐藏属性。给定的成员必须是 bool 类型。

```cs
public bool ShowIt;

[VisibleIf(nameof(ShowIt)]
public int CoolVariable;
```

***

### ReadOnly

使变量在编辑器中以只读方式显示（禁用编辑）。

```cs
[ReadOnly]
public int CoolVariable;
```

***

### Tooltip

为编辑器中的属性/字段指定工具提示。为对象属性提供文档非常有用。

```cs
[Tooltip("Hello there!")]
public int CoolVariable;
```

***

![示例](/manual/media/Tooltip.jpg)

### Limit

用于将脚本中的 float 或 int 变量限制在特定范围内。

```cs
[Limit(0, 100, 0.1f)]
public int CoolVariable;
```

***

### Range

用于将脚本中的 float 或 int 变量限制在特定范围内。使用时，float 或 int 将在编辑器中显示为滑块，而不是默认的数字字段。

```cs
[Range(0, 100)]
public int CoolVariable;
```

***

![示例](/manual/media/Range.jpg)

### Header

在编辑器布局中插入带有自定义文本的标题控件。

```cs
[Header("Super Section")]
public int CoolVariable;
```

***

![示例](/manual/media/Header.jpg)

### Space

在编辑器中的控件之间插入空白空间。

```cs
[Space(50)]
public int CoolVariable;
```

***

![示例](/manual/media/Space.jpg)

### EditorDisplay

允许更改编辑器中的项目显示名称或组。

```cs
[EditorDisplay("My Super Group")]
public int CoolVariable1;

[EditorDisplay(null, "Override Label")]
public int CoolVariable;
```

***

![示例](/manual/media/EditorDisplay.jpg)

### EditorOrder

允许声明项目在编辑器中的顺序。项目按从最低到最高的顺序列出。

```cs
[EditorOrder(-10)]
public int CoolVariable;
```

***

### ExpandGroups

通过展开上层层级中的所有容器组，标记项目在编辑器中可见。

```cs
[EditorDisplay("My Group"), ExpandGroups]
public int CoolVariable;
```

***

### MultilineText

指示 UI 编辑器使用多行文本框来编辑 *string* 属性或字段。

```cs
[MultilineText]
public string CoolVariable;
```

***

![示例](/manual/media/MultilineText.jpg)

### AssetReference

为编辑器中的资源引用选择器指定选项。允许自定义视图或提供自定义值分配策略。

```cs
[AssetReference(useSmallPicker: true)]
public Texture CoolVariable;
```

***

![示例](/manual/media/AssetReference.jpg)

### Collection

此特性为成员集合提供附加信息。

```cs
[Collection(ReadOnly = true)]
public int[] CoolVariable = new int[]
{
	1,
	2,
	3,
};
```

***

![示例](/manual/media/Collection.jpg)

### Button

Button 特性将方法显示为编辑器属性面板中的可点击按钮。

```cs
/// <summary>
/// 按钮工具提示来自此注释。
/// </summary>
[Button]
private void CallMe()
{
	Debug.LogError("Ho!");
}
```

***

![示例](/manual/media/Button.png)

### CustomEditor

覆盖为目标对象/类/字段/属性提供的默认编辑器。允许扩展对象的视觉效果和编辑体验。

```cs
[CustomEditor(typeof(MyScript))]
public class MyScriptEditor : GenericEditor
{
	public override void Initialize(LayoutElementsContainer layout)
	{
		base.Initialize(layout);

		layout.Space(20);
		var button = layout.Button("Click me", Color.Green);
		button.Button.Clicked += () => Debug.Log("Clicked!");
	}
}
```

***

![示例](../tutorials/media/custom-window-tutorial-2.jpg)

### CustomEditorAlias

与 *CustomEditor* 特性工作方式相同，不同之处在于它使用一个可能位于不同程序集（未被引用）中的类型名称。

```cs
[CustomEditorAlias("MyScriptEditor")]
public class MyScript : Script
{
	public float Speed = 11;
	public Color LightColor = Color.Yellow;
}
```

***
