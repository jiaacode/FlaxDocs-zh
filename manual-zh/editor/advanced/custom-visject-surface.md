# 自定义 Visject 曲面

Flax 引擎有一种名为 Visject 的可视化脚本语言。它被[材质](./../../graphics/materials/material-editor/index.md)、[粒子](./../../particles/particle-emitter.md)和[动画](./../../animation/anim-graph/index.md)使用。它为内容创作工具提供了广泛的功能。

你也可以将其用于自己的目的，范围可以从一个简单的图形插件到一个完整的脚本系统。

这些教程将介绍为表达式图创建自己的 Visject 曲面的过程。这是一个非常简单的示例，它接收一些数字，执行一些计算，并输出一个数字。建议先查看[自定义插件教程](./../../scripting/plugins/index.md)。

本教程的完整代码可以在[此处](https://github.com/FlaxCommunityProjects/flax-custom-visject-plugin)找到。

![图形计算器](./media/expression-graph-advanced.png)

## 资源

第一步是创建我们自己的资源类型。此资源类型需要一个 `byte[]` 来保存 Visject 曲面。

它还需要一个可以在构建游戏中执行的图版本。这部分将在后续教程中涵盖。

```cs
public class ExpressionGraph
{
    /// <summary>
    /// 序列化的 Visject 曲面
    /// </summary>
    public byte[] VisjectSurface { get; set; }

     // TODO: 可以在构建游戏中执行的内容
}
```

***

此资源类型将是一个 [json 资源](https://docs.flaxengine.com/api/FlaxEngine.JsonAsset.html)。

## 资源代理

要使用 Flax 编辑器创建和打开资源，需要一个[资源代理](https://docs.flaxengine.com/api/FlaxEditor.Content.AssetProxy.html)。由于它是一个编辑器文件，它需要位于编辑器程序集中。为此，创建一个名为 `Editor` 的新文件夹。在此文件夹中，创建一个新的资源代理。

```cs
public class ExpressionGraphProxy : JsonAssetProxy
{
    /// <inheritdoc />
    public override string Name => "Expression Graph";

    /// <inheritdoc />
    // 将在下一步实现...
    //public override EditorWindow Open(FlaxEditor.Editor editor, ContentItem item)
    //{
    //    return new ExpressionGraphWindow(editor, (JsonAssetItem)item);
    //}

    /// <inheritdoc />
    public override Color AccentColor => Color.FromRGB(0x0F0371);

    /// <inheritdoc />
    public override string TypeName { get; } = typeof(ExpressionGraph).FullName;

    /// <inheritdoc />
    public override bool CanCreate(ContentFolder targetLocation)
    {
        return targetLocation.CanHaveAssets;
    }

    /// <inheritdoc />
    public override void Create(string outputPath, object arg)
    {
        FlaxEditor.Editor.SaveJsonAsset(outputPath, new ExpressionGraph());
    }
}
```

***

### 注册代理

然后，我们必须使用编辑器[插件](./../../scripting/plugins/index.md)来注册代理。

> [!NOTE]
> 确保在 `GenericJsonAssetProxy` *之前* 添加它，它是列表中的最后一个代理，用作回退代理。

```cs
public class ExpressionGraphPlugin : EditorPlugin
{
    private ExpressionGraphProxy _expressionGraphProxy;

    /// <inheritdoc />
    public override void InitializeEditor()
    {
        base.InitializeEditor();

        _expressionGraphProxy = new ExpressionGraphProxy();

        // 注册代理
        Editor.ContentDatabase.AddProxy(_expressionGraphProxy);
    }

    /// <inheritdoc />
    public override void DeinitializeEditor()
    {
    	// 插件反初始化时清理
        Editor.ContentDatabase.RemoveProxy(_expressionGraphProxy);

        base.DeinitializeEditor();
    }
}
```

***

完成此操作后，你应该能够在 `Content` 文件夹中创建新的表达式图资源。

![创建新的表达式图](./media/content-create-expression-graph.png)

## Visject 窗口

目前打开表达式图相当令人失望。因此，在此步骤中，我们将创建自己的窗口，并为其提供一个 Visject 曲面。这样的窗口包含一个资源、一个临时副本、多个参数、一个曲面和一个实时预览。

### 基本实现

为此，我们在 `Editor` 文件夹中创建一个继承自 `VisjectSurfaceWindow` 的文件。我们还需要在 `Editor` 文件夹中有一个预览和一个曲面。

```cs
public class ExpressionGraphPreview : AssetPreview
{
    // 预览将在稍后扩展
    public ExpressionGraphPreview(bool useWidgets) : base(useWidgets)
    {
    }

    public ExpressionGraph ExpressionGraph { get; set; }
}
```

```cs
public class ExpressionGraphSurface : VisjectSurface
{
    public const int MainNodeGroupId = 1;
    public const int MainNodeTypeId = 1;

    // 曲面将在稍后扩展
    public ExpressionGraphSurface(IVisjectSurfaceOwner owner, Action onSave, FlaxEditor.Undo undo = null, SurfaceStyle style = null, List<GroupArchetype> groups = null)
    : base(owner, onSave, undo, style, groups)
    {
    }
}
```

```cs
public class ExpressionGraphWindow : VisjectSurfaceWindow<JsonAsset, ExpressionGraphSurface, ExpressionGraphPreview>
{
    /// <summary>
    /// 允许的参数类型。
    /// </summary>
    private readonly ScriptType[] _newParameterTypes =
    {
        new ScriptType(typeof(float)),
        new ScriptType(typeof(Vector2)),
        new ScriptType(typeof(Vector3)),
        new ScriptType(typeof(Vector4)),
    };

	/// <summary>
	/// 属性代理对象。
	/// </summary>
	private sealed class PropertiesProxy
	{
		[EditorOrder(1000), EditorDisplay("Parameters"), CustomEditor(typeof(ParametersEditor)), NoSerialize]
		// ReSharper disable once UnusedAutoPropertyAccessor.Local
		public ExpressionGraphWindow Window { get; set; }

		[EditorOrder(20), EditorDisplay("General"), Tooltip("用于演示目的")]
		public int DemoInteger { get; set; }

		[HideInEditor, Serialize]
		public List<SurfaceParameter> Parameters
		{
			get => Window.Surface.Parameters;
			set => throw new Exception("No setter.");
		}

		/// <summary>
		/// 从指定窗口收集参数。
		/// </summary>
		/// <param name="window">窗口。</param>
		public void OnLoad(ExpressionGraphWindow window)
		{
			// 链接
			Window = window;
		}

		/// <summary>
		/// 清除临时数据。
		/// </summary>
		public void OnClean()
		{
			// 取消链接
			Window = null;
		}
	}

	private readonly PropertiesProxy _properties;

	private ExpressionGraph _assetInstance;

	/// <inheritdoc />
	public ExpressionGraphWindow(FlaxEditor.Editor editor, AssetItem item)
	: base(editor, item)
	{
		// 资源预览
		_preview = new ExpressionGraphPreview(true)
		{
			Parent = _split2.Panel1
		};

		// 资源属性代理
		_properties = new PropertiesProxy();
		_propertiesEditor.Select(_properties);

		// 曲面
		_surface = new ExpressionGraphSurface(this, Save, _undo)
		{
			Parent = _split1.Panel1,
			Enabled = false
		};

		// 工具栏
		_toolstrip.AddSeparator();
		_toolstrip.AddButton(editor.Icons.BracketsSlash32, () => ShowJson(_asset)).LinkTooltip("显示资源内容");
	}

	/// <summary>
	/// 显示 JSON 内容窗口。
	/// </summary>
	/// <param name="asset">JSON 资源。</param>
	public static void ShowJson(JsonAsset asset)
	{
		FlaxEditor.Utilities.Utils.ShowSourceCodeWindow(asset.Data, "Asset JSON");
	}

    /// <inheritdoc />
    public override IEnumerable<ScriptType> NewParameterTypes => _newParameterTypes;

	/// <inheritdoc />
	protected override void UnlinkItem()
	{
    	// 清理
		_properties.OnClean();
		_preview.ExpressionGraph = null;

		base.UnlinkItem();
	}

	/// <inheritdoc />
	protected override void OnAssetLinked()
	{
    	// 设置
		_assetInstance = _asset.CreateInstance<ExpressionGraph>();
		_preview.ExpressionGraph = _assetInstance;

		base.OnAssetLinked();
	}

	/// <inheritdoc />
	public override string SurfaceName => "Expression Graph";

	/// <inheritdoc />
	public override byte[] SurfaceData
	{
		get => ExpressionGraphSurface.LoadSurface(_asset, _assetInstance, true);
		set
		{
			// 将数据保存到临时资源
			if (ExpressionGraphSurface.SaveSurface(_asset, _assetInstance, value))
			{
				// 错误
				_surface.MarkAsEdited();
				Debug.LogError("Failed to save surface data");
			}
			// 可选：重置预览
		}
	}

	/// <inheritdoc />
	protected override bool LoadSurface()
	{
		// 初始化资源属性和参数代理
		_properties.OnLoad(this);

		// 加载曲面图
		if (_surface.Load(data))
		{
			// 错误
			Debug.LogError("Failed to load expression graph surface.");
			return true;
		}

		return false;
	}

	/// <inheritdoc />
	protected override bool SaveSurface()
	{
		// TODO: 图编译
		_surface.Save();
		return false;
	}

	/// <inheritdoc />
	public override void SetParameter(int index, object value)
	{
		// TODO: 更新资源值以实现良好的实时预览
		//_assetInstance.Parameters[index].Value = value;

		base.SetParameter(index, value);
	}
}
```

***

### 保存和加载

通常，资源具有 `SaveSurface` 和 `LoadSurface` 方法。要实现这些方法，我们需要从编辑器程序集调用函数，例如 `FlaxEditor.Editor.SaveJsonAsset`。但是，我们不能从游戏程序集引用编辑器程序集。因此，我们将这些函数放在 `ExpressionGraphSurface.cs` 中。

曲面加载方法尝试从 ExpressionGraph 实例加载曲面。如果曲面尚不存在，它会创建一个带有主节点的新 Visject 曲面上下文并返回它。

曲面保存方法将曲面保存到资源实例。然后，它将资源实例作为 json 保存到硬盘。

```cs
/// <summary>
/// 用于保存和加载曲面
/// </summary>
private class FakeSurfaceContext : ISurfaceContext
{
    public string SurfaceName => throw new NotImplementedException();

    public byte[] SurfaceData { get; set; }

    public void OnContextCreated(VisjectSurfaceContext context)
    {

    }
}

/// <summary>
/// 尝试从资源加载曲面图。
/// </summary>
/// <param name="createDefaultIfMissing">如果为 true，则创建默认曲面（如果缺失），否则不加载任何内容。</param>
/// <returns>加载的曲面字节，如果无法加载或缺失，则返回 null。</returns>
public static byte[] LoadSurface(JsonAsset asset, ExpressionGraph assetInstance, bool createDefaultIfMissing)
{
    if (!asset) throw new ArgumentNullException(nameof(asset));
    if (assetInstance == null) throw new ArgumentNullException(nameof(assetInstance));

    // Return its data
    if (assetInstance.VisjectSurface?.Length > 0)
    {
        return assetInstance.VisjectSurface;
    }

    // 如果缺失则创建
    if (createDefaultIfMissing)
    {
        // 一个小技巧
        // 创建一个带有主节点的 Visject 图并序列化它！
        var surfaceContext = new VisjectSurfaceContext(null, null, new FakeSurfaceContext());

        // 添加主节点
        // TODO: 将 NodeFactory.DefaultGroups 更改为你的组原型列表
        var node = NodeFactory.CreateNode(NodeFactory.DefaultGroups, 1, surfaceContext, MainNodeGroupId, MainNodeTypeId);

        if (node == null)
        {
            Debug.LogWarning("Failed to create main node.");
            return null;
        }
        surfaceContext.Nodes.Add(node);
        node.Location = Float2.Zero;
        surfaceContext.Save();
        return surfaceContext.Context.SurfaceData;
    }
    else
    {
        return null;
    }
}

/// <summary>
/// 更新曲面图资源（保存新资源，丢弃缓存数据，重新加载资源）。
/// </summary>
///  <param name="data">曲面数据。</param>
///  <returns>如果无法保存则返回 true，否则返回 false。</returns>
public static bool SaveSurface(JsonAsset asset, ExpressionGraph assetInstance, byte[] surfaceData)
{
    if (!asset) throw new ArgumentNullException(nameof(asset));

    assetInstance.VisjectSurface = surfaceData;

    bool success = FlaxEditor.Editor.SaveJsonAsset(asset.Path, assetInstance);
    asset.Reload();
    return success;
}
```

***

### 使用窗口

要实际使用该窗口，我们需要取消注释 `ExpressionGraphProxy.cs` 中的以下内容

```cs
public override EditorWindow Open(FlaxEditor.Editor editor, ContentItem item)
{
    return new ExpressionGraphWindow(editor, (JsonAssetItem)item);
}
```

***

恭喜，你现在拥有了自己的 Visject 曲面！

![表达式图曲面](./media/visject-graph-window.png)

## 自定义节点

每个 Visject 节点都有一个 `NodeArchetype`，它指定了节点的类型。多个 `NodeArchetype` 组合在一个 `GroupArchetype` 中。

要添加自定义节点，我们需要将自己的组原型列表传递给曲面的基础构造函数。

```cs
public static readonly List<GroupArchetype> ExpressionGraphGroups = new List<GroupArchetype>();

public ExpressionGraphSurface(IVisjectSurfaceOwner owner, Action onSave, FlaxEditor.Undo undo = null, SurfaceStyle style = null)
    : base(owner, onSave, undo, style, ExpressionGraphGroups) // 注意最后一个参数
{
}
```

***

然后，我们可以用自己的组原型填充组原型列表。我们也可以使用[现有的节点原型](https://github.com/FlaxEngine/FlaxEngine/tree/master/Source/Editor/Surface/Archetypes)。

```cs
// 我们自己的节点原型
public static readonly NodeArchetype[] ExpressionGraphNodes =
{
    // 主节点
    new NodeArchetype
    {
        TypeID = 1,
        Title = "ExpressionGraph",
        Description = "Main number graph node",
        Flags = NodeFlags.AllGraphs | NodeFlags.NoRemove | NodeFlags.NoSpawnViaGUI | NodeFlags.NoCloseButton,
        Size = new Float2(150, 300),
        Elements = new[]
        {
            NodeElementArchetype.Factory.Input(0, "Float", true, typeof(float), 0),
            NodeElementArchetype.Factory.Input(1, "Vector2", true, typeof(Vector2), 1),
            NodeElementArchetype.Factory.Input(2, "Vector3", true, typeof(Vector3), 2)
        }
    },
    // 随机浮点数
    new NodeArchetype
    {
        TypeID = 2,
        Title = "Random float",
        Description = "A random float",
        Flags = NodeFlags.AllGraphs,
        Size = new Float2(150, 30),
        Elements = new[]
        {
            NodeElementArchetype.Factory.Output(0, "Float", typeof(float), 0),
        }
    }
};

// 组原型列表
public static readonly List<GroupArchetype> ExpressionGraphGroups = new List<GroupArchetype>()
{
    // 我们自己的节点，包括主节点
    new GroupArchetype
    {
        GroupID = 1,
        Name = "ExpressionGraph",
        Color = new Color(231, 231, 60),
        Archetypes = ExpressionGraphNodes
    },
    // 所有数学节点
    new GroupArchetype
    {
        GroupID = 3,
        Name = "Math",
        Color = new Color(52, 152, 219),
        Archetypes = FlaxEditor.Surface.Archetypes.Math.Nodes
    },
    // 仅一个参数节点
    new GroupArchetype
    {
        GroupID = 6,
        Name = "Parameters",
        Color = new Color(52, 73, 94),
        Archetypes = new []{ FlaxEditor.Surface.Archetypes.Parameters.Nodes[0] }
    }
};
```

***

最后，我们需要更新 `LoadSurface` 方法以使用 `ExpressionGraphGroups` 而不是 `NodeFactory.DefaultGroups`。

```cs
var node = NodeFactory.CreateNode(ExpressionGraphGroups, 1, surfaceContext, MainNodeGroupId, MainNodeTypeId);
```

***

![自定义节点](./media/expression-graph-custom-nodes.png)

## 编译和运行

要在构建游戏中运行 Visject 曲面，你需要创建它的运行时表示。例如，你可以遍历每个节点并将其转换为着色器代码。或者，你可以复制曲面节点并在运行时运行一个简单的解释器。

Visject 图有许多重要的部分需要编译到我们的输出中：

- 输入参数
- 节点
  - 及其输入和输出
- 一个输出节点

对于曲面编译，在 `ExpressionGraphSurface.cs` 中添加一个方法。

```cs
public void CompileSurface(ExpressionGraph graph)
{
	// 代码
}
```

***

然后，为了自动编译曲面，修改 `ExpressionGraphWindow.cs` 中的 `SaveSurface` 方法，使其包含对曲面编译方法的调用。

```cs
 /// <inheritdoc />
 protected override bool SaveSurface()
 {
     // 编译曲面
     _surface.CompileSurface(_assetInstance);
     // 保存它
     _surface.Save();
     return false;
 }
```

***

输入参数存储在 ['Parameters' 列表](https://docs.flaxengine.com/api/FlaxEditor.Surface.VisjectSurface.html#FlaxEditor_Surface_VisjectSurface_Parameters) 中。参数最重要的部分如下

```cs
var param = Parameters[0];
param.ID; // 用于将参数节点映射到参数
param.Name; // 参数名称
param.Value; //  参数值
0 // 参数在列表中的索引。用于实时更新预览。
```

***

参数在 `Parameters` 列表中的索引用于 `ExpressionGraphWindow.cs` 文件中的 `SetParameter` 函数中实时更新预览。

```cs
public override void SetParameter(int index, object value)
{
    // 更新资源值以实现良好的实时预览
    _assetInstance.Parameters.First(p => p.Index == index).Value = value;

    base.SetParameter(index, value);
}
```

***

节点存储在 [`Nodes` 列表](https://docs.flaxengine.com/api/FlaxEditor.Surface.VisjectSurface.html#FlaxEditor_Surface_VisjectSurface_Nodes) 中。节点最重要的部分如下

```cs
node.GroupArchetype.GroupID; // 节点所属的组原型
node.Archetype.TypeID; // 节点原型
node.Values; // 节点的内部值
node.Elements.OfType<InputBox>(); // 输入
node.Elements.OfType<OutputBox>(); // 输出
```

***

每个节点都有多个用于输入和输出的 [`Box`](https://docs.flaxengine.com/api/FlaxEditor.Surface.Elements.Box.html)。这些 Box 具有

```cs
box.Connections[index]; // 当前box所连接的第index个box
box.Archetype.ValueIndex; // box 在 node.Values[ ] 中的索引
```

***

最后，输出节点或主节点，可以使用 [`FindNode(MainNodeGroupId, MainNodeTypeId)`](https://docs.flaxengine.com/api/FlaxEditor.Surface.VisjectSurface.html#collapsible-FlaxEditor_Surface_VisjectSurface_FindNode_System_UInt16_System_UInt16_) 获取。

### 示例实现

在运行时执行 Visject 曲面的一种简单方法是复制它并在其上运行一个解释器。

> [!NOTE]
> 你不能在运行时引用 `SurfaceNode`，因为它在编辑器程序集中。因此，如果你要编写解释器，必须将每个节点复制到自己的类中。

要复制曲面，以 *深度优先* 的方式遍历它。这使得以正确的顺序执行节点变得容易，其中每个节点在其之前的节点完成后 *之后* 执行。它也方便地检测图中的循环。

示例实现可以在[自定义 Visject 曲面示例项目](https://github.com/FlaxCommunityProjects/flax-custom-visject-plugin)中找到。

### 预览

一个简单的纯文本预览

```cs
public class ExpressionGraphPreview : AssetPreview
{
    public ExpressionGraphPreview(bool useWidgets) : base(useWidgets)
    {
    }

    public ExpressionGraph ExpressionGraph { get; set; }

    public override void Update(float deltaTime)
    {
        base.Update(deltaTime);

        // 手动更新模拟
        ExpressionGraph?.Update(deltaTime);
    }

    /// <inheritdoc />
    public override void Draw()
    {
        base.Draw();

        if (ExpressionGraph == null) return;

        Render2D.DrawText(
            Style.Current.FontLarge,
            $"Float: {ExpressionGraph.OutputFloat}\n",
            new Rectangle(Float2.Zero, Size),
            Color.Wheat,
            TextAlignment.Near,
            TextAlignment.Far);
    }

    /// <inheritdoc />
    public override void OnDestroy()
    {
        ExpressionGraph = null;
        base.OnDestroy();
    }
}
```

***

最终结果应类似于这样

![最终结果](./media/expression-graph.png)

## 进一步探索

进一步探索的一个简单想法是多次评估同一图。例如，材质图为屏幕上的每个像素进行评估。

因此，可以通过添加一个自定义的“获取 X 坐标”节点，然后为 x 轴上的每个值评估图一次，来创建一个简单的图形计算器。然后，可以通过在这些点上绘制线段来绘制输出。

这可以在示例项目的 [graphing-demo](https://github.com/FlaxCommunityProjects/flax-custom-visject-plugin/tree/graphing-demo) 分支中找到。

![Gif](./media/expression-graph-graphing.gif)
