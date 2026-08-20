# Flax 中 C++ 的集合

## Array（数组）

`Array<T>` 是一个通用的动态分配和可调整大小的列表对象。使用它来存储值列表。

示例：

```cpp
#include "Engine/Core/Collections/Array.h"

Array<String> messages;
messages.Add(TEXT("one")); // 向列表添加项
messages.Add(TEXT("two"));
messages.Add(TEXT("three"));
int32 count = messages.Count(); // 获取项数量
bool hasTwo = messages.Contains(TEXT("two")); // 工具方法，如 Find、Contains、IndexOf、Reverse
messages.Insert(0, TEXT("zero")); // 在索引处插入
messages.Dequeue(); messages.Enqueue(TEXT("a")); // 可以像队列一样工作
messages.Pop(); messages.Push(TEXT("a")); // 可以像栈一样工作

// 使用 for-range 循环遍历列表
for (auto& item : messages)
	LOG_STR(Info, item);

// 使用 for 循环遍历列表
for (int32 i = 0; i < messages.Count(); i++)
	LOG_STR(Info, messages[i]);

Array<int32> values;
int32 defaults[] = {1, 2, 3, 4};
values.SetCapacity(100); // 动态可调整大小的分配
values.Add(defaults, ARRAY_COUNT(defaults)); // 添加值范围
values.Clear(); // 清除值（保留分配）
values.SetCapacity(0); // 同时也清除分配
```

***

### ArrayExtensions

对于 Array 的更高级用法，请使用 `ArrayExtensions`，示例：

```cpp
#include "Engine/Core/Collections/ArrayExtensions.h"

const std::function<bool(const ModelInstanceEntry&)> IsValidMaterial = [](const ModelInstanceEntry& e) -> bool
{
    return e.Material;
};
// 工具方法，如 Any、All、IndexOf、GroupBy
if (ArrayExtensions::Any(Entries, IsValidMaterial))
{
    // 执行某些操作...
}
```

***

## Dictionary（字典）

`Dictionary<Key, Value>` 是一个无序字典的模板，将键与值配对映射。

```cpp
#include "Engine/Core/Collections/Dictionary.h"

Dictionary<String, int32> map;
map[TEXT("Speed")] = 10;
map[TEXT("Car")] = 0;
map.Add(TEXT("Key"), 11);
bool containsCar = map.ContainsKey(TEXT("Car"));
bool contains0 = map.ContainsValue(0);
for (auto& e : map)
    LOG(Info, "Key: {0}, Value: {1}", e.Key, e.Value);
```

***

## HashSet（哈希集合）

`HashSet<T>` 是一个无序值集合的模板（无重复项，具有 *O(1)* 查找访问）。它的工作方式类似于 `Dictionary`，不同之处在于它只存储键，没有配对的数值。

```cpp
#include "Engine/Core/Collections/HashSet.h"

HashSet<String> map;
map.Add(TEXT("Speed"));
map.Add(TEXT("Car"));
map.Add(TEXT("Key"));
bool containsCar = map.Contains(TEXT("Car"));
for (auto& e : map)
    LOG(Info, "Item: {0}", e.Item);
```

***

## ChunkedArray（分块数组）

`ChunkedArray<T, ChunkSize>` 是一个具有可变容量的动态数组模板，它使用固定大小的内存块来存储数据，而不是使用线性分配。对于单个线性分配效率不高的情况（例如非常大的数据集且不断增长），它更加优化。

```cpp
#include "Engine/Core/Collections/ChunkedArray.h"

ChunkedArray<int32, 1024> flags;
for (int32 i = 0; i < 4096; i++)
	flags.Add((int32)(Math::Cos((float)i / 100.0f) * 100.0f));
```

***

## BitArray（位数组）

`BitArray<>` 是一个具有可变容量的动态数组模板，用于存储位值。它使用 `uint32` 为每个项提供 32 位的优化存储，并包含用于访问数据的 API。

```cpp
#include "Engine/Core/Collections/BitArray.h"

BitArray<> flags;
for (int32 i = 0; i < 100; i++)
    flags.Add(i % 2);
```

***

## 哈希函数

`Dictionary` 和 `HashSet` 集合使用键哈希来实现快速查找。Flax 使用 `uint32 GetHash(const Type& key)` 签名来匹配 `Type` 的哈希函数（引用是可选的）。示例哈希函数在 `Engine/Core/Collections/HashFunctions.h` 中实现。

## 排序

对于数据排序，尤其是在使用 `Array` 时，可以使用 `Sorting` 头文件中实现的排序方法。

示例：

```cpp
#include "Engine/Core/Collections/Sorting.h"

Array<String> names;
names.Add(TEXT("zzzz"));
names.Add(TEXT("bbb"));
names.Add(TEXT("aaa"));
names.Add(TEXT("fff"));
Sorting::QuickSort(names.Get(), names.Count());
for (auto& e : names)
    LOG_STR(Info, e);
```

***

## 分配器

默认情况下，所有集合都使用 `Platform::Allocate` 分配的堆内存来存储数据。然而，在某些情况下，如果程序员知道集合最多存储 X 个项目，或者不太可能增长到很大，则可以使用自定义的、更优化的分配器来获得更高的性能。

分配器：
* `HeapAllocation`
* `InlinedAllocation`
* `FixedAllocation`

例如，如果以下示例中使用的 Array 最多可以容纳 10 个项目，则可以使用具有预定义容量的 `FixedAllocation<>`，它将使用栈内存来放置项目——速度更快。

```cpp
Array<int32, FixedAllocation<10>> myItens;
for (int32 i = 0; i < 10; i++)
{
	if (i % 2 == 0) // 执行一些酷炫的检查
	{
		myItens.Add(i * 2 + 1);
	}
}
// 对 myItens 执行某些操作...
```

***

如果数组更有可能包含最多 10 个项目，但可以调整大小以容纳更多，则可以使用 `InlinedAllocation<>`，因为它支持增长超过预定义的固定容量：

```cpp
Array<int32, InlinedAllocation<10>> myItens;
```

***

使用分配器是更高级的用例，但可以提高游戏性能。此外，脚本 API 绑定生成器支持在使用 `API_` 宏为 C#/Visual Script 暴露游戏组件时使用自定义分配器。
