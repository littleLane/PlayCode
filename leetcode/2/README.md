# 两数相加

给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照逆序的方式存储的，并且它们的每个节点只能存储一位数字。

如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。

您可以假设除了数字 0 之外，这两个数都不会以 0 开头。

## 示例：

```text
输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
输出：7 -> 0 -> 8
原因：342 + 465 = 807
```

## 题目分析

这个题目考查了链表操作和数字计算两个方面的知识。其中有几个需要注意的点：

- 1、这里链表表示的数字是倒序的，和我们处理大数字字符串的方式如出一辙，所以我们并不需要对链表进行倒序处理
- 2、两个链表的长度有可能不相等，也就是说在进行两个链表相加时，对短链表的值要进行特殊处理
- 3、对链表的相加也就是对每个节点里面对应的 `val` 属性相加
- 4、需要处理两个节点的 `val` 属性相加大于 10 的情况

## 答案解析

