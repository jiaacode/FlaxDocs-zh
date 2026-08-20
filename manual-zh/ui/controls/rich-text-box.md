# 富文本框

![富文本框](/manual/media/rich-text-box.png)

**富文本框** 控件允许使用高级样式选项显示格式化的文本。

## 标签

富文本框标签可用于更改文本的外观和布局。这些标签的工作方式类似于 `HTML` 或 `XML` 标签，但它们的语法不那么严格，更针对游戏进行了优化。

单个标签看起来像 `<tag>`，其中包含特殊的 `<` 和 `>` 字符以及其中的名称。有些标签在作用域内操作，你可以用 `</tag>`（注意 `/` 字符）来结束它们。这些作用域可以嵌套，例如粗体文本作用域内可以包含斜体。

许多标签接受语法为 `<tag=value>` 或 `<tag attribute=value>` 的属性。这些参数值要么是名称，要么是数值。数值可以是常规十进制数、像 `80%` 这样的百分比，或者像 `#FA` 这样的十六进制值。名称可以带或不带双引号指定（特别是当名称包含空格或特殊字符时）。

## HTML 标签列表

所有支持标签的列表（游戏和/或插件也可以提供自定义标签）。

| 标签                                     | 示例                                                         | 描述                                                         |
| ---------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `<b>`                                    | `Here is <b>bold text</b>.`                                  | 将字体样式更改为粗体。                                       |
| `<i>`                                    | `Here is <i>italic text</i>.`                                | 将字体样式更改为斜体。                                       |
| `<br>`                                   | `Here is <br>a newline.`                                     | 插入换行符。                                                 |
| `<color=X>`                              | `Here is <color=red>red</color> and <color=#0000FF>blue</color> text.` | 控制文本和图像的颜色。`X` - 命名的颜色或十六进制值。         |
| `<alpha=X>`                              | `Here is <alpha=50%>transparent</alpha> text.`               | 控制不透明度。`X` - 百分比或十六进制值。                     |
| `<img=X src=X width=Y height=Z scale=W>` | `Here is an image <img=icon1>.`                              | 来自 `RichTextBox` 的 `Images` 属性或通过内容中的文件名全局查找的内联图像（纹理或精灵）。`X` - 图像名称。`Y`/`Z` - 图像宽度/高度覆盖（使用特定值或百分比），`W` - 图像缩放或百分比。 |
| `<size=X>`                               | `Here is <size=50>larger</size> text.`                       | 控制文本大小。`X` - 字体大小（值或百分比）。                 |
| `<font=X size=Y>`                        | `Here is <font size=50>larger</font> text with <font=font1>style</font>.` | 控制文本字体。`X` - 字体资源名称，`Y` - 字体大小（值或百分比）。 |
| `<style=X>`                              | `Here is text with <style=style1>style</style>.`             | 控制文本样式。`X` - 来自 `RichTextBox` 的 `Styles` 属性的样式名称。 |
| `<align=left/center/right>`              | `Here is centered text <align=center>text</align>.`          | 控制内容的水平对齐方式。                                     |
| `<valign=top/bottom/middle/baseline>`    | `Here is centered image <valign=middle><img=icon1></valign>.` | 控制内容的垂直对齐方式。                                     |
| `<center>`                               | `Here is centered text <center>text</center>.`               | 使内容水平居中对齐。                                         |
