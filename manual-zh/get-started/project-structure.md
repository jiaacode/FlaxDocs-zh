# Flax 项目结构

![项目结构](media/project-structure.png)

所有 Flax 项目都具有统一的结构。这种严格的组织有助于开发，并为所有 Flax 游戏提供更好的标准化。

Flax 编辑器可以加载位于你驱动器上任何位置的项目。只需要放置一个有效的 **.flaxproj** 文件来描述项目（名称、元数据）。Flax 编辑器将生成所有项目文件夹（如果它们缺失的话，包括 Cache、Content、Logs 和 Source 目录），以及 C# 项目和解决方案文件。

## 示例 .flaxproj

```xml
{
	"Name": "My Project",
	"Version": "1.0",
	"Company": "",
	"Copyright": "",
	"GameTarget": "MyProjectTarget",
	"EditorTarget": "MyProjectEditorTarget",
	"References": [
		{
			"Name": "$(EnginePath)/Flax.flaxproj"
		},
		{
			"Name": "$(ProjectPath)/Plugins/MyPlugin/MyPlugin.flaxproj"
		}
	],
	"DefaultScene": "297f662e43c41143e406ae9ab85097f2"
}
```

***

 * 要了解有关项目文件属性的更多信息，请参阅[参考](https://docs.flaxengine.com/api/FlaxEditor.ProjectInfo.html)。

   ## 文件夹结构

   * **&lt;根目录&gt;**
    * **Binaries** - 编译后的游戏脚本二进制文件
    * **Cache** - 编辑器本地缓存文件夹、构建缓存，用于缩略图、游戏烘焙器缓存和其他临时文件
    * **Content** - 包含所有游戏资源（模型、纹理、设置等）
      * **SceneData** - 用于[私有场景资源](scenes/scene-data.md)的专用目录
      * **Shaders** - 自动导入的着色器资源（来自源代码）
      * **GameSettings.json** - 游戏设置资源的固定位置
    * **Logs** - 包含编辑器日志文件（和崩溃转储）
    * **Screenshots** - 包含你在编辑器中截取的屏幕截图文件（`.png` 格式，使用 `F12` 键）
    * **Source** - 包含所有游戏脚本文件（C++ 和 C# 脚本），组织成模块
      * **Shaders** - 着色器源文件
      * **&lt;GameModule&gt;** - 包含游戏模块代码的子文件夹
        * **&lt;GameModule&gt;.Build.cs** - 游戏模块构建脚本
      * **GameTarget.Build.cs** - 游戏目标构建配置脚本
      * **GameEditorTarget.Build.cs** - 编辑器目标构建配置脚本
    * **&lt;项目名称&gt;.sln** - 项目脚本解决方案文件，使用 Visual Studio 打开
    * **&lt;项目名称&gt;.flaxproj** - 项目描述和元数据文件（供编辑器和启动器使用）
