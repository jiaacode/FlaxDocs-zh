# 修改精灵图集

精灵图集同时包含精灵和帧数据。目前可以通过两种方式之一输入帧数据。一种方法是在单击添加帧“+”按钮后输入帧位置和大小值。添加帧后，你可以在右侧导航栏中输入位置和大小值。另一种向图集添加帧的方法是通过代码，API 参考在[此处](https://docs.flaxengine.com/api/FlaxEngine.SpriteAtlas.html#FlaxEngine_SpriteAtlas_AddSprite)。

在下图中，添加帧“+”按钮已被多次单击，并且正在输入帧数据值。

![修改精灵图集](/manual/media/sprites-04.jpg)

输入所有帧数据后，你就可以将精灵添加到场景中。右键单击 UI 画布，为图像精灵添加 UI 控件，并在属性视图中配置 Image 值。另一种将精灵添加到场景中的方法是将精灵直接拖放到场景层级中。你可以在属性窗口中修改精灵所显示的帧。

> [!Note]
> Flax 编辑器的未来版本将提供从不同精灵表单自动创建精灵图集的功能。

![图像属性](/manual/media/sprites-05.jpg)

精灵现已准备好使用或制作动画。

![完成的精灵](/manual/media/sprites-06.jpg)
