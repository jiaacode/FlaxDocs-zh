# 游戏数据安全

此页面涵盖了在游戏烘焙过程中为分发而部署的游戏数据和代码文件的各个方面。

## 资源

在游戏烘焙期间，游戏使用的所有资源都会被收集、处理并打包到 `.flaxpac` 文件中。这是一种自定义二进制格式，允许在单个文件中存储多个资源，并支持：
* 从多个内容加载线程进行随机数据访问（在运行时）
* 内置数据压缩（例如 *LZ4*）
* 元数据存储（例如资源头、资源依赖缓存）
* 资源块重映射（例如文件中自定义资源块的位置）

[构建设置](../../editor/game-settings/build-settings.md) 允许通过调整最大包大小和打包到单个文件中的资源数量来配置打包过程。

### 二进制资源

二进制资源（`BinaryAsset`）在处理后通常按原样打包。这取决于资源类型，例如：
* **纹理** 可以为某些平台（例如 Android）转换为其他格式，或根据[纹理组设置](../../graphics/textures/texture-groups.md)进行降采样
* **着色器** 是预编译的，因此甚至不会部署着色器源代码（没有运行时着色器编译）
* **材质、粒子发射器** 被预编译为目标平台的着色器字节码（着色器源代码被移除）

### Json 资源

Json 资源（`JsonAssetBase`）使用 *LZ4* 算法（内部）进行压缩，并以压缩格式存储。在运行时，数据会自动解压并解析为 Json 以供进一步处理（例如设置加载或场景反序列化）。这减小了构建后游戏的大小（压缩后文本体积小得多），并提高了游戏性能（从驱动器读取的数据更少，数据在内存中已压缩）。

### 自定义资源

自定义资源可以通过 `CookAssetsStep::AssetProcessors` 进行处理以用于游戏烘焙。

## 代码

根据游戏项目中使用的脚本语言，其安全性可能有所不同。有几种操作可以提高游戏的最终安全性，但请记住，完全保护游戏可能非常困难或几乎不可能。

### C#

游戏代码被编译为 .Net 程序集 - 每个二进制模块（例如默认的 `Game.CSharp.dll`）都有独立的程序集。因此，游戏不会部署源代码。然而，C# DLL 可以使用各种工具轻松反编译，这使得它不安全。可能的解决方案：
* [混淆](https://en.wikipedia.org/wiki/Obfuscation_(software)) 工具（例如 [Eazfuscator.NET](https://www.gapotchenko.com/eazfuscator.net)、[ConfuserEx](https://yck1509.github.io/ConfuserEx/)、[neo-ConfuserEx](https://github.com/XenocodeRCE/neo-ConfuserEx)、[Babel Obfuscator](https://www.babelfor.net/products/babel-obfuscator/)、[ArmDot](https://www.armdot.com/) 等） - 这些工具可以混淆代码流程、变量名、常量和类型。但如果类类型名称或字段/属性被重命名，可能会导致加载场景或预制体时反序列化不正确。对于这种情况，可以使用[序列化回调](../../scripting/serialization/index.md)从资源加载数据以供运行时使用。
* [代码签名](https://en.wikipedia.org/wiki/Code_signing) - 项目编译后，所有游戏 DLL 都可以使用代码签名证书进行签名，这允许在执行时验证文件，以防止（至少部分地）篡改游戏文件。
* 关键代码可以移动到 C++ 脚本中，这些脚本直接编译为目标平台字节码。

### C++

原生 C++ 游戏代码直接编译为目标平台可执行文件格式（例如 `.dll`、`.so`、`.dylib` 等）。在 `Release` 模式下，**没有调试信息**，并且编译器**启用了所有代码优化**。这导致代码安全，因为它无法反编译并且很难破解。

### 可视化脚本

可视化脚本以 *Visject Surface* 的二进制格式存储，这是 Flax 中各种图形资源类型（材质、粒子、动画等）的通用格式。目前，这些文件没有后处理（除了打包到 `.flaxpac` 文件中），这使得它们容易受到攻击。

## 平台特定

各种平台实现了不同的技术来提高游戏的安全性。例如，Switch、Xbox 或 PlayStation 等主机支持加密游戏包并限制用户对这些文件的访问。然而，在大多数情况下（Windows、macOS、Linux、Android），游戏文件是无 DRM 格式。任何额外的保护可能由游戏商店平台提供（例如 GOG）。