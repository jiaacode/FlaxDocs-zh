# 本地化

Flax 包含了一系列用于游戏本地化和国际化的广泛工具。这包括 UI 语言本地化、值区域设置（数字、货币和日期格式）以及为不同语言创建翻译。请参阅本文档部分，学习如何为不同语言翻译你的游戏。

Flax 支持所有区域设置，并为 C++ 和 C# 实现了 `CultureInfo` 类型（RFC 4646）。

## 本地化设置

![本地化设置](/manual/media/localization-settings.png)

**本地化设置** 是一个 json 设置资源，包含本地化配置，并添加到[游戏设置](../game-settings/index.md)中。它是游戏翻译的根仪表板。

要创建它，请使用 *内容* 窗口，*右键单击* 并选择 **新建 -> 设置**。然后指定名称，选择类型 **本地化设置** 并确认（[教程](../game-settings/index.md#creating-settings)）。

### 编辑器部分

* **预览** - 游戏内预览的当前语言和区域设置。
* **语言区域** - 游戏支持的本地化列表。每个语言区域由一个或多个本地化字符串表资源定义。仪表板显示每种语言的翻译进度，并列出所有使用的表（双击表名可在 *内容* 窗口中导航到它）。
* **数据** - 原始资源编辑器（用于直接编辑的已用字符串表列表）。

### 仪表板

**语言区域** 部分提供了语言翻译概览，并包含一组用于附加操作的按钮：
* **更新** - 刷新仪表板统计信息。
* **添加语言区域...** - 显示区域选择器，并为其创建带有未翻译字符串表的新本地化。
* **导出...** - 将本地化字符串导出为 `.pot` 文件以供翻译。导出的文件包含所有用于本地化的键。可用于创建带有翻译的 `.po` 文件，以便导入回项目。
* **在代码中查找本地化字符串** - 在项目源文件中搜索本地化字符串的使用。
* **在内容中查找本地化字符串** - 在项目内容文件（场景、预制体）中搜索本地化字符串的使用。

### 工作流程

在游戏制作期间使用本地化的示例工作流程。

1) *关卡和 UI 设置* - 游戏开发者创建游戏地图并设置 UI（在场景或预制体中）。各种游戏对象和资源包含 UI 显示字符串。程序员使用 `LocalizedString` 类型用于文本（在脚本/资源中），这些文本将在未来被本地化。

2) *本地化设置* - 向项目添加新的本地化设置。设置将在游戏中使用的语言区域（包括默认的 `en` 语言）。

3) *标记可本地化文本* - 使用本地化字符串编辑器 `+` 按钮为所有使用的 UI 文本生成本地化字符串条目。

4) *查找本地化字符串* - 使用仪表板查找代码和资源中的所有本地化字符串。它不会添加重复项，只会添加新条目。

5) *导出* - 将所有本地化字符串键导出为 `.pot` 文件以供翻译。

6) *翻译* - 执行所有使用文本的翻译（在外部工具中或通过编辑字符串表资源）。

7) *导入翻译* - 将翻译后的 `.po` 文件导入为 `本地化字符串表`（本地化设置包含已使用表的列表）

8) *测试* - 验证翻译是否正常工作。使用语言预览工具更改语言。

根据游戏制作规模和团队经验，本地化可以在制作初期或后期进行。选择最适合你的方式。

## 本地化字符串表

![本地化字符串表编辑器](/manual/media/localized-string-table.png)

`LocalizedStringTable` 是一种 json 格式的资源，用于存储给定语言区域的本地化文本列表。它支持复数和多行条目。空字段以红色轮廓高亮显示，以标记为缺失（需要翻译）。

Flax 支持从 `.po` 文件**导入翻译后的字符串**到本地化字符串表资源。只需将其 *拖放* 到 *内容* 窗口中即可。要了解有关 PO 格式的更多信息，请参阅[此文档](https://www.gnu.org/software/gettext/manual/html_node/PO-Files.html)。

## 本地化字符串

![本地化字符串编辑器](/manual/media/localized-string.png)

**本地化字符串** 是一种用于轻松进行文本本地化的脚本类型。它包含两个字段：`Id` 和 `Value`。*Id* 是本地化字符串标识符，*Value* 是自定义覆盖的文本值（如果设置了 *Value*，则不会使用 *Id*）。

在编辑器中，*Id* 文本字段包含一个实用按钮，可从本地化设置中显示本地化字符串选择器。如果 *Value* 字段为空，则会显示当前来自本地化的文本水印。你也可以手动设置 *Value*。通过使用 *Value* 文本字段右侧的 `+` 按钮，你可以将文本添加到项目中所有语言区域的本地化设置中（插入的值将传递给默认的 `en` 语言区域，其余区域设置将具有空的、缺失的文本翻译）。

`LocalizedString` 在 C++ 和 C# 脚本 API 中都受支持，可用于文本本地化，而不是使用原始 `String` 类型。它支持内置字符串类型之间的隐式转换，并且可以序列化或反序列化。

## 本地化和区域设置

`Localization` 包含用于字符串本地化收集的脚本 API，并为当前区域设置实现值格式化处理。

# [C#](#tab/code-csharp)

```cs
var myStr = Localization.GetString("localized_id", "Fallback value");
var myStrPlural = Localization.GetPluralString("localized_id_n", 2, "Count: {}");
var number =  string.Format("{0:n}", 1234);
```

***

# [C++](#tab/code-cpp)

```cpp
#include "Engine/Localization/Localization.h"

auto myStr = Localization::GetString(TEXT("localized_id"), TEXT("Fallback value"));
auto myStrPlural = Localization::GetPluralString(TEXT("localized_id_n"), 2, TEXT("Count: {}"));
auto number =  String::Format(TEXT("{0:n}"), 1234);
```

***

要了解有关 C++ 中字符串格式化的更多信息，请参阅[此文档](../../scripting/cpp/string-formatting.md)。

# [Visual Script](#tab/code-vs)

![可视化脚本本地化字符串格式化](F:\desktop\manualcn\editor\localization\media\localization-vs-format.png)

***

## 更改当前语言

`Localization` 包含用于更改游戏的当前显示语言和用于值格式化的当前区域设置的脚本 API。

### 编辑器预览

使用本地化设置资源编辑器仪表板进行当前语言预览。

![本地化预览](/manual/media/localization-preview.gif)

# [C#](#tab/code-csharp)

```cs
using System.Globalization;

Debug.Log("Current language: " + Localization.CurrentLanguage);
Debug.Log("Current culture: " + Localization.CurrentCulture);
Localization.LocalizationChanged += () => { Debug.Log("Localization changed!"); };
Localization.SetCurrentLanguageCulture(new CultureInfo("en-US"));
```

***

# [C++](#tab/code-cpp)

```cpp
#include "Engine/Localization/Localization.h"

void OnLocalizationChanged()
{
    LOG(Info, "Localization changed!");
}

LOG(Info, "Current language: {}", Localization::GetCurrentLanguage());
LOG(Info, "Current culture: {}", Localization::GetCurrentCulture());
Localization::LocalizationChanged.Bind(&::OnLocalizationChanged);
Localization::SetCurrentLanguageCulture(CultureInfo("en-US"));
```

***

# [Visual Script](#tab/code-vs)

![**本地化可视化脚本**](F:/desktop/manual/editor/localization/media/localization-vs-language.png)

***
