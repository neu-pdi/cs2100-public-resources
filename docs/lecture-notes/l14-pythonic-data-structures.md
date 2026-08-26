---
sidebar_position: 14
lecture_number: 14
title: Pythonic Lists
---

# Pythonic Lists

## Lists

We've seen how to create lists by listing their elements:
```python
my_nums: list[int] = [6, 7, 8, 9]
words: list[str] = ['never', 'gonna', 'give', 'you', 'up']
```

## split() and join()

There's a built-in `str` function in Python that splits a `str` into separate words:
```python
words: list[str] = 'never gonna give you up'.split()
```
results in `['never', 'gonna', 'give', 'you', 'up']`

To split a `str` using something other than whitespaces, we can use the optional parameter `sep`:
```python
words: list[str] = 'never gonna give you up'.split(sep = 'e')
```
results in `['n', 'v', 'r gonna giv', ' you up']`

To do the opposite (combine a list of `str` into a single `str`), we use the `join()` function:

```python
phrase: str = ' '.join(['never', 'gonna', 'give', 'you', 'up'])
also_phrase: str = 'e'.join(['n', 'v', 'r gonna giv', ' you up'])
```

The `str` to the left of the `.join()` is used as the "glue" or "fenceposts" between the `str`s when combining them.
Both `phrase` and `also_phrase` are equal to `'never gonna give you up'`

## List indices

In Python (and most other programming languages), lists are indexed starting with 0 on the very left, and increasing as it goes to the right.

```python
words: list[str] = 'never gonna give you up'.split()
second_word: str = words[1]
first_word: str = words[0]


first_three_words: list[str] = [first_word, second_word, words[2]]
print(first_three_words)   # ['never', 'gonna', 'give']
```

Remember: this means that the last index in the list is its length minus one.

Let's see what happens if we try to access an index that is larger than that.
```
IndexError: list index out of range
```

Unlike other programming langauges, Python also has a second set of indices starting with -1 on the very right, and counting down (more negative) as it steps leftward.

```python
last_word: str = words[-1]
penultimate_word: str = words[-2]
print(f'{penultimate_word} {last_word}')      # you up
```

## List slices

Python allows us to use "slicing" to get a sub-list (a contiguous part of the list).

```python
letters: list[str] = list('abcdefghijklmnopqrstuvwxyz')
print(letters)  # ['a', 'b', 'c', 'd', ..., 'x', 'y', 'z']

second_third_fourth_letters: list[str] = letters[2:5]
print(second_third_fourth_letters)  # ['c', 'd', 'e']
```

To "slice" a list: in the square brackets, we provide the starting index (inclusive) and the stopping index (exclusive). The start must be to the left of the stop, and both must be valid indices.

It returns a new list that is a copy of that part of the original list, without modifying the original list.

If we want to start at the very beginning of the list, we can omit the starting index:
```python
letters: list[str] = list('abcdefghijklmnopqrstuvwxyz')
print(letters[:4])  # ['a', 'b', 'c', 'd']
```

And if we want to end at the very end of the list, we can omit the stopping index:
```python
letters: list[str] = list('abcdefghijklmnopqrstuvwxyz')
print(letters[20:])  # ['u', 'v', 'w', 'x', 'y', 'z']
```

Omitting both just creates a copy of the entire list:
```python
letters: list[str] = list('abcdefghijklmnopqrstuvwxyz')
print(''.join(letters[:]))  # abcdefghijklmnopqrstuvwxyz
```

Poll: What is printed?
```python
letters: list[str] = list('abcdefghijklmnopqrstuvwxyz')

print(f'{letters[-len(letters)]} {''.join(letters[23:])} {letters[-1]}')
```

1. `a wxyz z`
2. `a xyz z`
3. `z wxyz z`
4. `z xyz z`

## Modifying a list

We can replace elements in a list:
```python
my_nums[-1] = 900
```

We can also insert or append elements in a list (which makes the list longer):
```python
my_nums: list[int] = [6, 7, 8, 9]

my_nums.insert(0, 5)
print(my_nums)  # [5, 6, 7, 8, 9]

my_nums.insert(3, 600)
print(my_nums)  # [5, 6, 7, 600, 8, 9]

my_nums.append(10)
print(my_nums)  # [5, 6, 7, 600, 8, 9, 10]
```

For `insert()`, the first argument is the index, and the second argument is the element to insert into the list.

We can append multiple elements at once using `extend()`:

```python
my_nums.extend([700, 800, 900])
print(my_nums)   # [5, 6, 7, 600, 8, 9, 10, 700, 800, 900]
```

## 2D lists

The elements in a list can be lists themselves. This is called a 2-dimensional list, or 2D list.

```python
nums = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

first_row = nums[0]
print(first_row)  # [1, 2, 3]

last_element_of_first_row = first_row[-1]
print(last_element_of_first_row)  # 3

last_element_of_last_row = nums[-1][-1]
print(last_element_of_last_row)  # 9
```

Indexing and slicing work the same way in lists of any dimension.

Poll: What gets printed?

```python
more_nums = [
    [col * row for col in range(row)]
    for row in range(6)
]

print(more_nums[4][:2])
```

1. `[0, 2]`
1. `[0, 2, 4, 8]`
2. `[0, 4]`
3. `[0, 4, 8, 12]`


## List comprehension

Poll: Let's say we want to write a function that takes a list of integers, and returns a copy of it, but without the negative numbers. The way to write this function using the tools we already covered so far would be:

a)
```python
def positive_copy(nums: list[int]) -> list[int]:
    result: list[int] = list()
    for i in nums:
        if i >= 0:
            result.append(i)
    return result
```

b)
```python
def positive_copy(nums: list[int]) -> list[int]:
    result: list[int] = list()
    for i in range(len(nums)):
        if i >= 0:
            result.append(i)
    return result
```

c)
```python
def positive_copy(nums: list[int]) -> list[int]:
    result: list[int] = list()
    for i in range(len(nums)):
        if nums[i] >= 0:
            result.append(nums[i])
    return result
```

d)
```python
def positive_copy(nums: list[int]) -> list[int]:
    result: list[int] = list()
    for i in range(0, -len(nums), -1):
        if nums[i - 1] >= 0:
            result.insert(0, nums[i - 1])
    return result
```

Implementing that function by first creating an empty list, and then adding elements one by one, is not efficient. When we first create the empty list, Python doesn't know how long we expect the list to become, so it allocates a very small amount of space in the computer's memory. Then, as we add elements, it keeps having to make adjustments as it realizes that it didn't allocate enough space.

It's also hard to read, as we saw from that poll.

Instead, we can use list comprehension to let Python optimize it for efficiency.

We've seen some list comprehension already before today.
Here's an example using list comprehension to give a copy of the original list, but with each element increased by one:
```python
my_nums: list[int] = [6, 7, 8, 9]

increased_nums: list[int] = [i + 1 for i in my_nums] # list comprehension

print(increased_nums)  # [7, 8, 9, 10]
```
One way to look at this format is that we simply moved the body of a `for loop` to right before the `for` (after the opening bracket `[`).

If we want the resulting list to filter some elements, we add the `if` clause after the `for` clause.

Here is `positive_copy()` using list comprehension:
```python
def positive_copy(nums: list[int]) -> list[int]:
    return [i for i in nums if i >= 0]
```

List comprehension can be used for things that aren't lists. Here is an example that iterates over a string and creates a set:
```python
phrase: str = 'never gonna give you up'

letters: set[str] = {letter.lower() for letter in phrase}

print(letters)  # {'v', 'g', 'i', 'o', 'n', 'a', 'y', 'p', 'u', 'e', 'r', ' '}
```

List comprehension is a powerful tool. It can make `for` loops easier to read, though it is always up to you to decide which version is easiest to read for your code. Sometimes, a basic `for` loop is more readable.
