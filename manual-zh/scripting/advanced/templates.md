# 脚本模板

脚本模板可用于允许用户基于模板创建新脚本。

## 创建脚本模板

在 **Content** 文件夹中的任意位置创建一个文本文档，并创建你所需的模板。建议模板文件使用 `.cs` 或 `.h/.cpp` 作为文件扩展名。

### 可用的标识符

使用以下标识符，在用户创建时用相应的信息替换模板的特定部分。

| 标识符          | 描述                               |
| --------------- | ---------------------------------- |
| **%copyright%** | 替换为版权注释                     |
| **%class%**     | 替换为类名。这是文件名的修改版本。 |
| **%filename%**  | 仅限 C++ 模板。替换为文件名。      |
| **%module%**    | 仅限 C++ 模板。替换为模块名称。    |
| **%namespace%** | 仅限 C# 模板。替换为模块名称。     |

## 创建新的模板代理

新的 C# 模板代理：

```cs
[ContentContextMenu("New/C#/My new template")]
public class TestingCSharpProxy : CSharpProxy 
{
    public override string Name => "My new template";

    protected override void GetTemplatePath(out string path)
    {
        // 可以使用 `Globals` 类来获取特定的项目文件夹
        path = "path to new .cs template";
    }
}
```

***

新的 C++ 模板代理：

```cs
[ContentContextMenu("New/C++/My new template")]
public class TestingCppProxy : CppProxy
{
    public override string Name => "My new template";

    protected override void GetTemplatePaths(out string headerTemplate, out string sourceTemplate)
    {
        // 可以使用 `Globals` 类来获取特定的项目文件夹
        headerTemplate = "path to new .h template";
        sourceTemplate = "path to new .cpp template";
    }
}
```

***

使用 **EditorPlugin** 将新代理添加到 **ContentDatabase** 中：

```cs
public class TestEditorPlugin : EditorPlugin
{
    public override void InitializeEditor()
    {
        base.InitializeEditor();
        
        Editor.ContentDatabase.AddProxy(new TestingCSharpProxy());
        Editor.ContentDatabase.AddProxy(new TestingCppProxy());
        Editor.ContentDatabase.Rebuild(true);
    }
}
```

***