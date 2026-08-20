# 模型窗口

![模型](F:\desktop\manual\graphics\models\media\model-window.png)

**模型窗口** 是预览和重新导入模型资源的主要工具。要显示它，只需在 *内容* 窗口中双击模型即可。

## 界面

模型窗口的 UI 由视口、工具栏和属性面板组成。

![模型窗口](F:\desktop\manual\graphics\models\media\model-window-layout.png)

1. 视口
2. 工具栏
3. 属性面板

### 工具栏

下表列出了工具栏中的选项及其作用。

| 图标                                           | 描述                             |
| ---------------------------------------------- | -------------------------------- |
| ![图标](/manual/media/model-editor-ui-toolstrip-1.png) | 在 *内容* 窗口中显示并选择该资源 |
| ![图标](/manual/media/model-editor-ui-toolstrip-2.png) | 保存已编辑的模型资源             |
| ![图标](/manual/media/model-editor-ui-toolstrip-3.png) | 打开文档                         |

### 视口

视口面板显示模型的预览。你可以使用 **鼠标按钮** 和 **WSAD** 键在视口中导航，使用第一人称视角摄像机。

在左上角，视口包含一个 **视图** 按钮小部件，其中包含许多用于视口自定义和模型调试的选项（LOD 预览、摄像机设置等）。

#### 细节级别

在使用静态模型的细节级别时，你可以通过设置 **视图** -> **预览 LOD** 来预览自定义 LOD（值 -1 使用默认 LOD）。要在视口中预览当前 LOD 统计信息，请使用 **视图** -> **显示** -> **当前 LOD**。

![当前 LOD 统计信息](F:\desktop\manual\graphics\models\media\preview-current-lod.jpg)

![自动模型 LOD](F:\desktop\manual\graphics\models\media\automatic-model-lod.gif)

### 属性面板

![属性](F:\desktop\manual\graphics\models\media\model-uv-preview.gif)

此面板显示模型资源属性，并组织为单独的选项卡。

- **网格** - 每个模型细节级别（*LOD*）的属性。这包括 LOD 三角形/顶点统计、边界、网格的材质槽绑定，以及隔离或高亮显示网格的选项。
- **材质** - 此模型使用的材质槽列表。
- **UV** - 模型纹理坐标通道调试可视化工具，包括光照贴图 UV。
- **导入** - 模型导入选项（从上次导入恢复）。你可以修改它们，然后按 **重新导入** 按钮从源图像文件更新资源。

要了解有关模型导入选项的更多信息，请参阅专门的[模型导入设置](import.md)页面。
