# Linux 版编辑器

![在 Linux 上使用 Vulkan 的 Flax 编辑器](media/flax-editor-linux-vulkan.png)

## 下载

你可以从[下载](https://flaxengine.com/download/)页面获取 Flax，或者从官方[源代码仓库](https://github.com/FlaxEngine/FlaxEngine)手动编译。

编辑器可执行文件位于文件夹 `Binaries/Editor/Linux/Development/FlaxEditor` 中（如果需要，你也可以使用 Debug 或 Release 配置）。

### 第三方启动器

* [Seed](https://github.com/MineBill/Seed) - Seed 是一个跨平台的 Flax 启动器，可管理多个引擎版本和项目。

## 要求

在 Linux 平台上使用 Flax 编辑器的开发人员要求如下：

|                  | 推荐                     |
| ---------------- | ------------------------ |
| 测试过的操作系统 | Ubuntu 24 或更高版本     |
| 处理器           | 四核或更多，2 GHz 或更快 |
| RAM              | 4 GB 或更多              |
| 硬盘空间         | 至少 1 GB                |
| GPU              | **需要 Vulkan**          |

Flax 编辑器需要：

* 系统上的 `curl` 库：

```
sudo apt-get install -y curl libcurl4-gnutls-dev
```

* `.Net 8 SDK` ([https://dotnet.microsoft.com/en-us/download/dotnet/8.0](https://dotnet.microsoft.com/en-us/download/dotnet/8.0))。

```
sudo apt install dotnet-sdk-8.0
```

可以使用以下命令验证 .Net 版本：

```
dotnet --version
```

**注意：** 在 Fedora 上，你可能需要额外修复无效的 lib 链接：

```
sudo ln -s /usr/lib64/libcurl.so.4 /usr/lib64/libcurl-gnutls.so.4
```

## GPU 驱动程序

请确保已安装最新的 GPU 驱动程序。帮助链接：
- [NVIDIA 驱动程序](http://www.nvidia.com/Download/index.aspx?lang=en-us/)
- [AMD 驱动程序](http://support.amd.com/en-us/download)

有关支持平台的信息，请参阅[平台](../platforms/index.md)。

## 命令行访问

如果你使用的是带有集成 GPU 的笔记本电脑，并且希望 Flax 在专用 GPU 上运行以获得更强大的性能，你可以使用命令行开关来指示引擎根据制造商选择所需的 GPU：

| 选项      | 描述              |
| --------- | ----------------- |
| `-nvidia` | 选择 Nvidia GPU。 |
| `-amd`    | 选择 AMD GPU。    |
| `-intel`  | 选择 Intel GPU。  |

要了解有关命令行开关的更多信息，请参阅[命令行访问页面](../editor/advanced/command-line-access.md)。

使用自定义选项运行编辑器的示例命令行：

```
./FlaxEditor -project "<project-path>" -std -nvidia
```

## 运行编辑器

编辑器位于 `Binaries/Editor/Linux/Development/FlaxEditor`。

要运行编辑器，Flax 需要知道包含项目文件的文件夹的路径：

```
./FlaxEditor -project <"project-path">
```

如果你没有指定项目路径，将出现一个窗口，要求你指明 `flax-proj` 文件的位置。


```
./FlaxEditor
```

你可以从使用示例项目或创建新项目开始。

## 示例项目

为了帮助你开始使用 Flax，请从 [https://github.com/FlaxEngine/FlaxSamples](https://github.com/FlaxEngine/FlaxSamples) 获取最新的 Flax 示例。该集合包含各种示例项目，展示了引擎功能，并可用作你未来 Flax 项目的基础。玩得开心！

![在 Linux 上使用 Vulkan 的 Flax 编辑器运行模式](media/editor-playing-on-linux-vulkan.gif)

## 新项目

要创建新项目，首先需要创建一个将包含项目文件的新文件夹。然后，按如下方式运行 Flax Editor 可执行文件：

```
./FlaxEditor -new -project <"new_project_path">
```
这将在指定文件夹内创建一个新项目。编辑器将生成一个项目模板并打开它。

从这里开始，你可能想了解如何[创建场景](https://docs.flaxengine.com/manual/get-started/scenes/index.html)，或者在 [Flax 编辑器](https://docs.flaxengine.com/manual/get-started/editor.html)中迈出第一步。

**注意：** 创建新项目时，如果编辑器提示发生*脚本编译失败*，这是因为 `Flax.Build` 文件需要设置为可执行文件。在文件夹 `Binaries/Tools` 中，右键单击该文件，选择“属性”，然后勾选“允许作为程序执行文件”框。或者使用命令行：

```
chmod a+x Flax.Build
```
