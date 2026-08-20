# 原始数据资源

**原始数据资源** 是一种通用数据容器，旨在存储原始字节数组。

## 示例代码

以下是创建虚拟资源、设置其数据并将其保存到文件的示例用法代码。

```cs
var myAsset = Content.CreateVirtualAsset<RawDataAsset>();
myAsset.Data = new byte[] {1, 2, 3, 4, 5, 6, 7, 8, 9};
myAsset.Save(Path.Combine(Globals.ProjectContentFolder, "MyData.flax"));
```

***

然后你可以加载该资源或在脚本中引用它，并在游戏中使用它。

```cs
var myAsset = Content.Load<RawDataAsset>(Path.Combine(Globals.ProjectContentFolder, "MyData.flax"));
Debug.Log("Data size: " + myAsset.Data.Length);
```

***
