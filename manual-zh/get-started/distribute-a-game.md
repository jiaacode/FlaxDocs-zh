# 分发你的游戏

当你准备好发布游戏时，使用 [Game Cooker](../editor/game-cooker/index.md) 创建一个发布构建，并将其分发。请按照以下步骤操作。

## 1. 创建一个游戏并通过质量保证测试

在你发布游戏之前，理想情况下，你必须首先拥有一个已开发的游戏，并执行足够的质量保证测试，以交付高质量的产品。

## 2. 遵循指南

所有使用 Flax 引擎制作的商业游戏都必须遵循各种指南。这是 [EULA](https://flaxengine.com/licensing/) 所要求的，在安装引擎之前必须接受该协议。它不会影响真正的非商业产品（教育性质、完全免费）。请访问 [商业产品发布指南](https://flaxengine.com/release/) 页面以了解更多信息。

## 3. 构建游戏

现在准备最终构建。请记住使用 **Release** 模式，并使用 [预处理器变量](../scripting/preprocessor.md) 移除任何调试/测试代码部分。使用 [Game Cooker](../editor/game-cooker/index.md) 工具为目标平台生成游戏文件。

![Game Cooker](/manual/media/build-release.jpg)

## 4. 分发你的游戏

每个平台都有其自己的构建过程和自定义输出数据格式，但在大多数情况下，只需从 *Output* 目录中获取文件即可。
如何分发你的游戏取决于你自己。

![游戏输出](/manual/media/build-output.jpg)
