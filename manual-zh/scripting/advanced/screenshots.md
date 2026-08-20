# 屏幕截图

Flax 包含内置的屏幕截图工具。它会捕获渲染目标或场景渲染任务的输出内容，并将其保存到文件。

## 示例代码

以下是一个捕获游戏视口屏幕截图并将其保存到文件的示例用法代码。

```cs
// 选择输出文件的路径
var path = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.Desktop), "screenshot.png");

// 将游戏屏幕捕获到文件（异步执行）
FlaxEngine.Screenshot.Capture(MainRenderTask.Instance, path);
```

***

你也可以使用内置功能进行渲染目标捕获，并将 GPU 纹理保存到文件。捕获方法将创建一个异步任务，将数据从 GPU 纹理下载回 CPU 暂存纹理，并将其保存到文件。如果你手动使用暂存纹理，捕获方法将立即对该数据执行操作。

此功能在编辑器中以及所有支持平台的运行时均可用。

## 在编辑器中

![编辑器视口屏幕截图](/manual/media/viewport-screenshot-2.png)

要截取聚焦的游戏视图或游戏编辑视图的屏幕截图，你可以使用 **F12** 键或主菜单选项 **工具 -> 截取屏幕截图**。

![游戏视口屏幕截图](/manual/media/viewport-screenshot-1.png)

如果你想截取游戏视口的**高分辨率**屏幕截图，可以 *右键单击* 停靠窗口选项卡，使用选项提高分辨率缩放（例如提高到 2），然后使用附加的屏幕截图选项。保存的图像存储在 **项目文件夹/Screenshots** 目录中。
