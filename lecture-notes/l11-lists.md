---
sidebar_position: 11
lecture_number: 11
title: Lists
---

# Lists

We've seen how to create lists by listing their elements:
```python
my_nums: List[int] = [6, 7, 8, 9]
harry_styles_words: List[str] = ['Tastes', 'like', 'strawberries', 'on', 'a', 'summer', 'evening']
```

## `split()` and `join()`

There's a built-in `str` function in Python that splits a `str` into separate words:
```python
harry_styles_words: List[str] = 'Tastes like strawberries on a summer evening'.split()
```
results in `['Tastes', 'like', 'strawberries', 'on', 'a', 'summer', 'evening']`

To split a `str` using something other than whitespaces, we can use the optional parameter `sep`:
```python
harry_styles_words: List[str] = 'Tastes like strawberries on a summer evening'.split(sep = 'e')
```
results in `['Tast', 's lik', ' strawb', 'rri', 's on a summ', 'r ', 'v', 'ning']`

To do the opposite (combine a list of `str` into a single `str`), we use the `join()` function:

```python
harry_styles_phrase: str = ' '.join(['Tastes', 'like', 'strawberries', 'on', 'a', 'summer', 'evening'])
also_harry_styles_phrase: str = 'e'.join(['Tast', 's lik', ' strawb', 'rri', 's on a summ', 'r ', 'v', 'ning'])
```

The `str` to the left of the `.join()` is used as the "glue" or "fenceposts" between the `str`s when combining them.
Both `harry_styles_phrase` and `also_harry_styles_phrase` are equal to `'Tastes like strawberries on a summer evening'`

## List indices

In Python (and most other programming languages), lists are indexed starting with 0 on the very left, and increasing as it goes to the right.

```python
harry_styles_words: List[str] = 'Tastes like strawberries on a summer evening'.split()
second_word: str = harry_styles_words[1]
first_word: str = harry_styles_words[0]


first_three_words: List[str] = [first_word, second_word, harry_styles_words[2]]
print(first_three_words)   # ['Tastes', 'like', 'strawberries']
```

Remember: this means that the last index in the list is its length minus one.

Let's see what happens if we try to access an index that is larger than that.
```
IndexError: list index out of range
```

Unlike other programming langauges, Python also has a second set of indices starting with -1 on the very right, and counting down (more negative) as it steps leftward.

```python
last_word: str = harry_styles_words[-1]
penultimate_word: str = harry_styles_words[-2]
print(f'{penultimate_word} {last_word}')      # summer evening
```

## List slices

Python allows us to use "slicing" to get a sub-list (a contiguous part of the list).

```python
letters: List[str] = list('abcdefghijklmnopqrstuvwxyz')
print(letters)  # ['a', 'b', 'c', 'd', ..., 'x', 'y', 'z']

second_third_fourth_letters: List[str] = letters[2:5]
print(second_third_fourth_letters)  # ['c', 'd', 'e']
```

To "slice" a list: in the square brackets, we provide the starting index (inclusive) and the stopping index (exclusive). The start must be to the left of the stop, and both must be valid indices.

It returns a new list that is a copy of that part of the original list, without modifying the original list.

If we want to start at the very beginning of the list, we can omit the starting index:
```python
letters: List[str] = list('abcdefghijklmnopqrstuvwxyz')
print(letters[:4])  # ['a', 'b', 'c', 'd']
```

And if we want to end at the very end of the list, we can omit the stopping index:
```python
letters: List[str] = list('abcdefghijklmnopqrstuvwxyz')
print(letters[20:])  # ['u', 'v', 'w', 'x', 'y', 'z']
```

Omitting both just creates a copy of the entire list:
```python
letters: List[str] = list('abcdefghijklmnopqrstuvwxyz')
print(''.join(letters[:]))  # abcdefghijklmnopqrstuvwxyz
```

Poll: What is printed?
```python
letters: List[str] = list('abcdefghijklmnopqrstuvwxyz')

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
my_nums: List[int] = [6, 7, 8, 9]

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

## List comprehension

Poll: Let's say we want to write a function that takes a list of integers, and returns a copy of it, but without the negative numbers. The way to write this function using the tools we already covered so far would be:

a)
```python
def positive_copy(nums: List[int]) -> List[int]:
    result: List[int] = list()
    for i in nums:
        if i >= 0:
            result.append(i)
    return result
```

b)
```python
def positive_copy(nums: List[int]) -> List[int]:
    result: List[int] = list()
    for i in range(len(nums)):
        if i >= 0:
            result.append(i)
    return result
```

c)
```python
def positive_copy(nums: List[int]) -> List[int]:
    result: List[int] = list()
    for i in range(len(nums)):
        if nums[i] >= 0:
            result.append(nums[i])
    return result
```

d)
```python
def positive_copy(nums: List[int]) -> List[int]:
    result: List[int] = list()
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
my_nums: List[int] = [6, 7, 8, 9]

increased_nums: List[int] = [i + 1 for i in my_nums] # list comprehension

print(increased_nums)  # [7, 8, 9, 10]
```
One way to look at this format is that we simply moved the body of a `for loop` to right before the `for` (after the opening bracket `[`).

If we want the resulting list to filter some elements, we add the `if` clause after the `for` clause.

Here is `positive_copy()` using list comprehension:
```python
def positive_copy(nums: List[int]) -> List[int]:
    return [i for i in nums if i >= 0]
```

List comprehension can be used for things that aren't lists. Here is an example that iterates over a string and creates a set:
```python
harrys_phrase: str = 'Tastes like strawberries on a summer evening'

harrys_letters: Set[str] = {letter.lower() for letter in harrys_phrase}

print(harrys_letters)  # {'i', 'v', 'r', ' ', 'l', 'w', 'e', 'u', 'm', 'g', 'k', 't', 'o', 'n', 's', 'b', 'a'}
```

List comprehension is a powerful tool. It can make `for` loops easier to read, though it is always up to you to decide which version is easiest to read for your code. Sometimes, a basic `for` loop is more readable.

## map and filter

What if we want to perform an action for each element in a collection (like list comprehension), but we don't want to waste computer memory storing the resulting collection? The `map()` and `filter()` functions return an object that we can iterate over.

`map(function, original_collection)` returns an object that we can iterate over using a `for` loop, where each iteration uses the result of applying the provided `function` to the corresponding element in the `original_collection`.
```python
harrys_phrase: str = 'Tastes like strawberries on a summer evening'

for word in map(str.upper, harrys_phrase.split()):
    print(word)
```
Prints each word of the phrase on its own line, in uppercase letters.

`filter(function, original_collection)` returns an object that we can iterate over using a `for` loop, but it only includes the elements of `original_collection` for which the `function` returns `True`.
```python
def is_long(word: str) -> bool:
    return len(word) >= 4

harrys_phrase: str = 'Tastes like strawberries on a summer evening'

for word in filter(is_long, harrys_phrase.split()):
    print(word)
```
Prints each word of the phrase that is at least 4 characters long on its own line.

Poll: What does this function do?
```python
def thing(n: int, m: int) -> float:
    total: int = sum([int(random() * n) for i in range(m)])
    return total / n
```

1. It returns a list of `n` random numbers between 0 and `m`
2. It returns a list of `m` random numbers between 0 and `n`
3. It returns the average of `n` random numbers between 0 and `m`
4. It returns the average of `m` random numbers between 0 and `n`

## The Accumulator Pattern

A large part of this course will involve _design patterns_: a structure or template that software engineers have agreed solves a common software problem.

The Accumulator Pattern is used when we want to add up, or _accumulate_, a sequence of items.

Exercise: Let's write a function that:
1. Asks the user how many numbers they would like to input
2. Asks the user for that many numbers (`float`s)
3. Prints the minimum, maximum, and average of those numbers

Let's do it without creating any lists.
```python
count = int(input('How many numbers? '))
sum: float = 0.0
min: float = float('inf')
max: float = float('-inf')
for _ in range(count):
    num = float(input('Please enter a number: '))
    sum += num
    if num < min:
        min = num
    if num > max:
        max = num
print(f'min: {min}\nmax: {max}\navg: {sum / count}')
```

Exercise for the reader: how can we use the Accumulator Pattern to also print the median of the numbers?

Poll: Which of these describes the Accumulator Pattern?
1. Initialize the loop variable before a loop over the sequence, and update the accumulator inside the loop
2. Initialize the loop variable before a loop over the sequence, and add (`+`) to it inside the loop
3. Initialize the accumulator variable before a loop over the sequence, and update it inside the loop
4. Initialize the accumulator variable to `0` before a loop over the sequence, and update it inside the loop

## `functools.reduce()` and `itertools.accumulate()`

`functools.reduce()` and `itertools.accumulate()` are two functions that perform the Accumulator Pattern.

```python
from functools import reduce

def add(num1: int, num2: int) -> int:
    return num1 + num2

my_nums: List[int] = [6, 7, 8, 9]

sum: int = reduce(add, my_nums)
print(sum) # 30
```

The function `reduce(function, collection)` takes two arguments: the `function` that adds (or otherwise "accumulates") elements of the collection, and the `collection`.

`itertools.accumulate()` works similarly, but instead of only returning the single result at the end, it returns an object that we can iterate over with all of the intermediate results, too. (It also swaps the order of the two arguments, so the `collection` is before the `function`.)

Poll: What does this do?
```python
from itertools import accumulate

def max(num1: int, num2: int) -> int:
    if num1 > num2:
        return num1
    else:
        return num2

my_nums: List[int] = [7, 8, 2, 5, 1]

for num in accumulate(my_nums, max):
    print(num)
```

1. It iterates over `my_nums`, printing each number on its own line
2. It iterates over `my_nums`, printing the accumulated sum so far
3. It iterates over `my_nums`, printing the largest number so far
4. It iterates over `my_nums`, printing the same number over and over
