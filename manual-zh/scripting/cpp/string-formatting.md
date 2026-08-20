# Flax 中 C++ 的字符串格式化

Flax 使用 [fmt](https://fmt.dev/6.2.1/index.html) 库来格式化字符串。格式化语法类似于 C# 中的语法，被认为易于使用且具有相当的可扩展性。相同的格式化样式也可用于 `LOG` 宏中来打印格式化消息。

## 语法

格式字符串包含由花括号 `{}` 包围的`替换字段`。未包含在花括号中的任何内容都被视为字面文本，原样复制到输出中。如果需要在字面文本中包含花括号字符，可以通过重复来转义：`{{` 和 `}}`。

要了解更多信息，请参阅参考：[fmt 语法](https://fmt.dev/6.2.1/syntax.html)。

## 示例

下面演示了 `String::Format` 的用法，它提供字符串格式化功能。宏 `LOG_STR` 直接将字符串打印到输出日志。

```cpp
auto str1 = String::Format(TEXT("a: {0}, b: {1}, a: {0}"), TEXT("a"), TEXT("b"));
LOG_STR(Info, str1);
auto str2 = String::Format(TEXT("1: {}, 2: {}, 3: {}"), 1, 2, 3);
LOG_STR(Info, str2);
auto str3 = String::Format(TEXT("vector: {0}"), Vector3(1, 2, 3));
LOG_STR(Info, str3);
auto str4 = String::Format(TEXT("string: {0}"), this->ToString());
LOG_STR(Info, str4);
auto str5 = String::Format(TEXT("boolean: {0}"), true);
LOG_STR(Info, str5);
```

***

## 自定义类型格式化

下面是一个如何为自定义类型实现自动格式化的示例：

```cpp
// 自定义结构体
struct MyStruct
{
	Vector2 Direction;
	float Speed;
};

// 使用辅助宏为自定义结构体声明打印支持
#include "Engine/Core/Formatting.h"
DEFINE_DEFAULT_FORMATTING(MyStruct, "Direction:{0} Speed:{1}", v.Direction, v.Speed);

// 将结构体打印为字符串
MyStruct data = { Vector2(1, 2), 10.0f };
auto str1 = String::Format(TEXT("{0}"), data);
LOG_STR(Info, str1);
```

***

## 命名参数

字符串格式文本可以包含有序参数，例如 `{0}`、`{1}`、`{2}`、`{}` 等，也可以包含命名参数，如 `{PlayerName}`、`{Currency}` 等。这可以通过将 `fmt::arg(argName, argValue)` 传递给字符串格式化函数来实现。

```cpp
String text1 = String::Format(TEXT("text: {0}, {1}"), TEXT("one"), TEXT("two"));
String text2 = String::Format(TEXT("text: {arg0}, {arg1}"), fmt::arg(TEXT("arg0"), TEXT("one")), fmt::arg(TEXT("arg1"), TEXT("two")));
ASSERT(text1 == text2);
```

***
