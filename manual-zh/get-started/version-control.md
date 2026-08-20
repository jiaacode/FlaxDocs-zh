# 版本控制系统

在团队中使用 Flax 引擎时，使用**版本控制系统**是非常常见的做法。
使用版本控制系统可以使用户更轻松地管理他们的代码和资源。它是一个带有监控访问权限的文件仓库，对于 Flax 来说，将是与 Flax 项目关联的所有文件。通过版本控制，可以跟踪对源代码的每一次更改，以及有关谁进行了更改、为什么进行更改以及他们更改/添加了什么的信息。这使得可以轻松地回退到代码的早期版本或比较版本之间的差异。它也使定位 bug 首次出现的时间以及可能导致 bug 的代码变得更加容易。

默认情况下，所有 Flax 项目数据分为两部分：**Content** 和 **Source**。这意味着所有 C# 脚本文件都组织在一个目录中（包括子目录）。资源文件位于单独的目录中，这使得使用外部存储解决方案（OwnCloud、Dropbox 等）更加容易。这在处理大文件大小时尤其有用。

## 示例 .gitignore

以下是一个包含 Flax 项目的 **Git** 仓库的示例 `.gitignore` 文件（[下载链接](https://github.com/FlaxEngine/FlaxSamples/blob/master/.gitignore)）。

```
# 忽略 Flax 项目文件
/Binaries/
/Cache/
/Logs/
/Output/
/Screenshots/
*.HotReload.*
Source/*.Gen.*

# 忽略 Visual Studio 项目文件（本地生成）
*.csproj
*.sln
launchSettings.json

# 忽略 Visual Studio Code 项目文件（本地生成）
*.code-workspace
*.vscode/

# 忽略 Rider 项目文件（本地生成）
*.idea/

# 忽略 Windows 和 MacOS 创建的缩略图
Thumbs.db
.DS_Store

# 忽略 Visual Studio 生成的文件
*.obj
*.exe
*.pdb
*.user
*.aps
*.pch
*.vspscc
*_i.c
*_p.c
*.ncb
*.suo
*.tlb
*.tlh
*.bak
*.cache
*.ilk
*.log
[Bb]in
*.lib
*.sbr
/Source/obj/
_ReSharper*/
[Tt]est[Rr]esult*
.vs/

# 忽略 Nuget 包文件夹
packages/
```

## 示例 .gitattributes

以下是一个包含 Flax 项目的 **Git LFS** 仓库的示例 `.gitattributes` 文件。通过使用[大文件存储](https://github.com/git-lfs/git-lfs/wiki/Tutorial)，你可以提高对使用二进制格式且往往很大的资源文件（模型、纹理等）的仓库性能。

```
# Flax 引擎文件
*.flax filter=lfs diff=lfs merge=lfs -text

# 资源源文件类型
*.png filter=lfs diff=lfs merge=lfs -text
*.tga filter=lfs diff=lfs merge=lfs -text
*.raw filter=lfs diff=lfs merge=lfs -text
*.wav filter=lfs diff=lfs merge=lfs -text
*.psd filter=lfs diff=lfs merge=lfs -text
*.mov filter=lfs diff=lfs merge=lfs -text
*.jpg filter=lfs diff=lfs merge=lfs -text
*.jpeg filter=lfs diff=lfs merge=lfs -text
*.hdr filter=lfs diff=lfs merge=lfs -text
*.fbx filter=lfs diff=lfs merge=lfs -text
```
