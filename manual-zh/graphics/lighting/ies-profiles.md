# IES 光分布文件

![IES 光分布文件](/manual/media/ies_profiles_sample.png)

**IES 光分布文件** 是包含光源周围光强度信息的资源。它们用于模拟现实生活中的光发射特性。为[点光源](light-types/point-light.md)和[聚光灯](light-types/spot-light.md)使用 IES 光分布文件可增加更多真实感，并强烈推荐用于建筑可视化。

## 导入 IES 光分布文件

Flax 支持从 `.ies` 文件导入 IES 光分布文件。导入过程与其他资源相同，只是没有额外的导入设置。

要获取 IES 光分布文件，请访问照明制造商的网站（例如 [Philips](http://www.usa.lighting.philips.com/support/support/literature/photometric-data)）。几乎所有主要照明制造商都免费提供它们。

## 使用 IES 光分布文件

![IES 光分布文件](/manual/media/ies.png)

导入 IES 光分布文件后，只需将其拖放到点光源或聚光灯的 `IES Texture` 属性中即可。
此外，你可以缩放导入的 IES 光分布文件亮度。

![IES 属性](/manual/media/ies-properties.jpg)
