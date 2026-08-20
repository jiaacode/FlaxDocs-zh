# 文件引用

Flax 使用 **资源（Asset）** 的概念，它是一个具有类型（类型名称）、唯一标识符（128 位 `Guid`）和数据的资源。这对于纹理、模型、可视化脚本、Json 文件等游戏资源非常适用，但不能用于源文件或其他数据文件，如文本文件、电子表格等。

以下是一个文件引用的使用示例，可以在编辑器中的 *内容* 窗口中将其分配给文件。在 `string` 属性或字段上使用的 `AssetReference` 特性将存储相对于项目根文件夹的路径。你可以指定要使用的文件扩展名（例如 `.txt` 或 `.csv`）。

```cs
public class MyFileReference : Script
{
    [AssetReference(".txt"), CustomEditorAlias("FlaxEditor.CustomEditors.Editors.AssetRefEditor")]
    public string Path = "";

    // 支持任意文本输入（例如 URL）的路径引用的替代方式
    [AssetReference(".txt"), CustomEditorAlias("FlaxEditor.CustomEditors.Editors.FilePathEditor")]
    public string Url = "";

    /// <inheritdoc />
    public override void OnStart()
    {
        Debug.Log("Selected path: " + Path);
        // 你可以直接从磁盘读取文件（例如通过 File.ReadAllText）
    }
}
```

***
