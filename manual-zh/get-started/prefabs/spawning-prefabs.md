# 操作指南：生成预制体

在本教程中，你将学习如何在游戏中生成预制体。请按照说明查看如何操作。在 Flax 中，有 2 种主要方式来创建预制体实例。使用最适合你工作流程的方式。

## 拖放

创建新的预制体对象实例的最简单方法是将资源从 *内容窗口* 拖放到场景编辑器窗口或场景树窗口。生成的对象将链接到预制体资源。

![生成预制体资源](/manual/media/spawn-prefab.png)

## 从代码创建

创建新预制体对象实例的另一种方法是使用 Flax C# 或 C++ API 中的生成方法。你可以将预制体生成到场景中，并指定其变换或父 Actor。以下脚本生成一个预制体。

# [C#](#tab/code-csharp)
```cs
PrefabManager.SpawnPrefab(myPrefab, new Vector3(0, 10, 0));
```
***

# [C++](#tab/code-cpp)

```cpp
#include "Engine/Level/Prefabs/PrefabManager.h"

PrefabManager::SpawnPrefab(myPrefab, Vector3(0, 10, 0));
```
***
