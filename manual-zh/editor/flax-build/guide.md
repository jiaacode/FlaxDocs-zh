# 构建工具指南

## 依赖项

![依赖项](media/deps.png)

`Flax.Build` 处理所有支持平台的第三方依赖项的下载、更新和构建。每个包都定义了自定义逻辑来下载自身（例如通过 `git clone` 或 `zip` 解压）。然后代码为选定的平台集合进行编译（例如通过 `msbuild` 或 `cmake`）。最后，输出二进制文件被复制到 `Source/Platforms/<platform>/Binaries/ThirdParty/<arch>` 文件夹中，以便在编译引擎时使用。

以下是为平台 `Android` 更新所有依赖项的示例命令行：

```
Flax.Build -log -ReBuildDeps -verbose -platform=Android
```

以下是为所有平台更新 `NewtonsoftJson` 依赖项的示例命令行：

```
Flax.Build -log -ReBuildDeps -verbose -depsToBuild=NewtonsoftJson
```
