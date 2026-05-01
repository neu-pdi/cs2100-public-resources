---
sidebar_position: 9
lecture_number: 9
title: Data Structures
---

# Data Structures

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

## Sets

A set is very similar to a list: it is a collection of items.

```python
words: set[str] = {'hi', 'hi', 'hello', 'hi', 'howdy', 'hi'}

print(words)  # {'hi', 'hello', 'howdy'}
```

Differences between a set and a list:
- A set is unordered
- A set can only hold each item (at most) once -- no duplicates​

### Some set syntax

Creating a set:
```python
words: set[str] = {'hi', 'hi', 'hello', 'hi', 'howdy', 'hi'}  # explicitly listing them

numbers: set[int] = set(range(5))  # using the set constructor
print(numbers)  # {0, 1, 2, 3, 4}

list_of_floats: list[float] = [3.4, 3.2, 2.9, 3.4, 3.0]
measurements: set[float] = set(list_of_floats)  # using the set constructor that takes an existing collection
print(measurements)  # {3.2, 3.0, 2.9, 3.4}
```

Adding and removing items, iterating over a set, and getting its size:
```python
nums: set[float] = set()  # empty set

for i in range(100):
    random_float = round(random(), 2) # random float rounded to nearest hundredth
    nums.add(random_float)  # add it to the set

print(len(nums))  # print the size of the set

numbers: set[int] = set(range(5))
numbers.remove(3)
print(numbers)  # {0, 1, 2, 4}
```

Binary set operations:
- Union (`a | b`): a set that has all elements that are in either set `a` or set `b`
- Intersection (`a & b`): a set that has all elements that are in both set `a` and set `b`
- Subset (`a <= b`): `True` if all elements in `a` are also in `b`, and `False` otherwise
  - Strict subset (`a < b`): `True` if `a <= b` **and `a` is not equal to `b`**, and `False` otherwise
- Subtraction (`a - b`): a set that has all elements in `a` that are not in `b`

```python
nums_a: set[int] = set(range(1, 5))
nums_b: set[int] = set(range(3, 9))

print(nums_a | nums_b)  # {1, 2, 3, 4, 5, 6, 7, 8}
print(nums_a & nums_b)  # {3, 4}
print(nums_a <= nums_b) # False
print(nums_a - nums_b)  # {1, 2}
```

Poll: Why is there no binary "Addition" operation for sets? (There is Subtraction.)
1. Because it would be the same as the Intersection operation
2. Because it would be the same as the Union operation
3. Because it would be the same as the Subtraction operation
4. There is an Addition operation

Exercise: Let's write a function that takes a `str` and counts the number of unique (distinct) words in it.

```python
def count_unique_words(text: str) -> int:
    return len(set(text.split()))

print(count_unique_words('hello hi hi hello howdy hi'))  # 3
```

Exercise: Let's write a function that checks if any two people in this room have the same birthday. It should have a loop that iterates (up to) 80 times. (Instructors should replace that number with the number of students in the room.) Each iteration, it should:
- Ask the user to input their birthday via two separate `int`s: the month and the day (ask twice to get the two `int`s)
- Store their birthday as a tuple
- If that birthday is already in the set, return `True`
- If not, add it to the set
After the loop (which it should only reach if no two people have the same birthday), it should return `False`.

```python
num_students: int = 80

def any_same_birthdays() -> bool:
    birthdays: set[Tuple[int, int]] = set()

    for _ in range(num_students):
        month: int = int(input('Please enter the month as a number between 1 and 12: '))
        day: int = int(input('Please enter the day as a number between 1 and 31: '))
        date: Tuple[int, int] = (month, day)
        if date in birthdays:
            return True
        else:
            birthdays.add(date)

    return False
```

## Dictionaries

We use curly brackets (`{` and `}`) to represent sets. But we also use them to represent another data type:
```python
print(type({'hello'}))  # <class 'set'>
print(type({}))         # <class 'dict'>
```
Curly brackets, when empty (or non-empty, but formatted a specific way), denote a dictionary.

A dictionary is also known as an "associative array".
It's like a list, but the indices are not required to be contiguous ints -- the indices can be of any type

A dictionary maps key --> value
Each key can appear at most once (the keys are a set)​

Here are two examples which map each animal (`str`) to their age (`int`):
```python
ages: dict[str, int] = {'elephant': 12, 'cat': 10}
print(ages)  # {'elephant': 12, 'cat': 10}

also_ages: dict[str, int] = dict([('elephant', 12), ('cat', 10)])
print(also_ages)  # {'elephant': 12, 'cat': 10}  (same as before)
```

### Some dictionary syntax

We can access a value given its key in two different ways: brackets (`[key]`) or using the `get(key)` method. The `get(key)` has the added benefit that it handles the case if the `key` is not in the `dict`.
```python
ages: dict[str, int] = {'elephant': 12, 'cat': 10}

print(ages['cat'])  # 10
print(ages.get('cat'))  # 10
print(ages.get('dog'))  # None
print(ages.get('dog'), 3)  # 3
print(ages['dog'])  # raises KeyError
```

We can add or update a `key` -> `value` pair. If we add the same `key` twice, it overwrites the original `value` with the second `value`.
```python
ages: dict[str, int] = {'cat': 10}

ages['elephant'] = 12
print(ages)  # {'cat': 10, 'elephant': 12}

ages.update([('elephant', 13)])
print(ages)  # {'cat': 10, 'elephant': 13}

ages['elephant'] = 14
print(ages)  # {'cat': 10, 'elephant': 14}

ages.update([('dog', 3)])
print(ages)  # {'cat': 10, 'elephant': 14, 'dog': 3}
```

We can iterate over a `dict` in two ways: over its `key`s, or over its `key-value` pairs:
```python
ages: dict[str, int] = {'cat': 10, 'elephant': 14, 'dog': 3}

for key in ages:
    print(f"{key}'s age is {ages.get(key)}")

for key, value in ages.items():
    print(f"{key}'s age is {value}")
```

Exercise: Let's write a function that takes a `str` and returns a dictionary that maps from each unique word in the `str` to the number of times it appears.

```python
def word_counter(text: str) -> dict[str, int]:
    word_counts: dict[str, int] = dict()
    for word in text.split():
        word_counts[word] = word_counts.get(word, 0) + 1
    return word_counts

print(word_counter('hello hi hi hello howdy hi'))  # {'hello': 2, 'hi': 3, 'howdy': 1}
```

Exercise: Let's write a function that helps us with [Scrabble](https://playscrabble.com/).
- A very common situation: We are playing Scrabble. We see we have 3 'O's. What can we do?
- The plan: get a map that gives us options based on a letter
- Let's write a function that takes a letter as a parameter and returns a dictionary where:
  - The keys are all possible frequencies of that letter (except zero)
  - The values are the sets of words in the dictionary with that many of that letter
- [Here's a list of english words](https://github.com/dwyl/english-words/blob/master/words_alpha.txt) if you need one (the official Scrabble list is harder to get as a text file)

```python
def scrabble_helper(letter: str) -> dict[int, set[str]]:
    result: dict[int, set[str]] = dict()
    with open('/path/to/dictionary.txt', 'r', encoding='utf-8') as english_dict:
        for word in english_dict.readlines():
            if letter in word:
                word = word.strip()
                letter_count = word.count(letter)
                if letter_count in result:
                    result[letter_count].add(word)
                else:
                    result[letter_count] = {word}
    return result

result: dict[int, set[str]] = scrabble_helper('r')

for key, value in result.items():
    if key > 2:
        print(f'{key}: {value}')
```

### JSON

JSON (JavaScript Object Notation) is a popular format for storing data. It's very common for APIs to send us data in JSON format. Here is an example of one: [https://openweathermap.org/api/one-call-3](https://openweathermap.org/api/one-call-3)

JSON data is read as a dictionary. In this example below, we took the [example API response from the Weather API](https://openweathermap.org/api/one-call-3) and stored it in a file called `example_json_data.json`. (We removed the lines with ellipses (`...`), and the commas on the lines before them. We also added an ending bracket (`}`).)
`pprint` ([https://docs.python.org/3/library/pprint.html](https://docs.python.org/3/library/pprint.html)) is a library for printing data in a readable format.
```python
import json, pprint

with open('example_json_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)
    pprint.pp(data)
```

Poll: Which data structure is best suited for this task: we're creating a product that works differently on different operating systems, and we want to know which operating systems we need to support
1. List
2. Tuple
3. Set
4. Dictionary

Poll: Which data structure is best suited for this task: storing the order in which young children should stand in line
1. List
2. Tuple
3. Set
4. Dictionary

Poll: Which data structure is best suited for this task: storing the 7 days of the week (Sunday, Monday, Tuesday, ..., Saturday)
1. List
2. Tuple
3. Set
4. Dictionary

Poll: Which data structure is best suited for this task: keeping track of each student's favorite color
1. List
2. Tuple
3. Set
4. Dictionary

## (if time) map and filter

What if we want to perform an action for each element in a collection (like list comprehension), but we don't want to waste computer memory storing the resulting collection? The `map()` and `filter()` functions return an object that we can iterate over.

`map(function, original_collection)` returns an object that we can iterate over using a `for` loop, where each iteration uses the result of applying the provided `function` to the corresponding element in the `original_collection`.
```python
phrase: str = 'never gonna give you up'

for word in map(str.upper, phrase.split()):
    print(word)
```
Prints each word of the phrase on its own line, in uppercase letters.

`filter(function, original_collection)` returns an object that we can iterate over using a `for` loop, but it only includes the elements of `original_collection` for which the `function` returns `True`.
```python
def is_long(word: str) -> bool:
    return len(word) >= 4

phrase: str = 'never gonna give you up'

for word in filter(is_long, phrase.split()):
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

## functools.reduce() and itertools.accumulate()

`functools.reduce()` and `itertools.accumulate()` are two functions that perform the Accumulator Pattern.

```python
from functools import reduce

def add(num1: int, num2: int) -> int:
    return num1 + num2

my_nums: list[int] = [6, 7, 8, 9]

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

my_nums: list[int] = [7, 8, 2, 5, 1]

for num in accumulate(my_nums, max):
    print(num)
```

1. It iterates over `my_nums`, printing each number on its own line
2. It iterates over `my_nums`, printing the accumulated sum so far
3. It iterates over `my_nums`, printing the largest number so far
4. It iterates over `my_nums`, printing the same number over and over


## Named and default parameters

Motivate by showing `list.sort()` documentation: https://docs.python.org/3/library/stdtypes.html#list.sort

Functions with lots of arguments:
```python
def display_text(text: str, size: int, is_bold: bool, is_italic: bool, is_underlined: bool) -> None:
    ...

display_text('hello', 18, False, False, False)
display_text('goodbye', 18, True, False, False)
```
- Pros: multiple options in the same function without compromising flexibility
- Cons: error prone, must keep track of order of arguments, too many things to specify each time we call the function

Named arguments:
```python
def display_text(text: str, size: int, is_bold: bool, is_italic: bool, is_underlined: bool) -> None:
    ...

display_text(text = 'hello', is_underlined = False, is_bold = False, is_italic = False, size = 18)
```
- Make calls more readable
- Enable you to reorder arguments

Default argument values:
```python
def display_text(
    text: str, size: int = 18, is_bold: bool = False, is_italic: bool = False, is_underlined: bool = False
) -> None:
    ...

display_text(text = 'hello', is_bold = True)
```
- If you usually pass the same value
- Specify what the default value is for an argument that doesn't have a value when the function is called
- In the function signature, arguments with default values must come after arguments without default values
- If we have a function that is already widely used, and we want to add another parameter, give it a default value (so the existing code doesn't break, since they didn't specify a value for that parameter)

Note: Default argument values are evaluated when the function is declared, not when it is called. It is stuck with the value it got the first time, and does not "refresh" each time the function is called. Here's the example from our recommended textbook:
```python
number = 5

def print_number(number: int = number) -> None:
    print(number)

number = 6 # This line does nothing; the default value for the argument is stuck at 5

print_number(8) # 8
print_number()  # 5
print(number)   # 6
```

Open-ended poll: What does this output? Why? (This is an example of code that could look like it's doing one thing, when it's actually doing something else)
```python
def send_message_and_cc_self(message: str, sender: str, recipients: list[str] = []) -> None:
    recipients.append(sender) # add sender to recipients so they get a copy as well
    for r in recipients: # send message to each recipient
        print(f"Sending '{message}' from {sender} to {r}")

send_message_and_cc_self("note to self", "Rasika") # self-only message
send_message_and_cc_self("use RSA next time", "Eve", ["Alice", "Bob"]) # message to multiple people
send_message_and_cc_self("super secret", "admin") # another self-only message
```
Source: [Tyler Yeats](https://aeromancer.dev/)

## Variable argument lists

Python allows us to have a function with an arbitrary number of arguments:
```python
def print_args(*args: T) -> None:
    """Print each argument on a separate line"""
    for item in args:
        print(item)

print_args(1, 2, 3)
```

The function `print_args()` above can take any number of arguments, and they are of the generic type `T`. We can access them inside the function -- each argument to `print_args()` becomes an element in the tuple `args`. If there are no arguments, then `args` will be an empty tuple.

And, if we want a variable argument list, but with named arguments:
```python
def print_args(**kwargs: T) -> None:
    """Print each argument on a separate line"""
    for argument_name, argument_value in kwargs.items():
        print(f'{argument_name}: {argument_value}')

print_args(a = 1, b = 2, c = 3)

a: 1
b: 2
c: 3
```

`**kwargs` stands for "keyword arguments", but you can name it anything you want. Notice that we use two asterisks for `**kwargs` and only one for `*args`.

Poll: How many arguments can I pass to this function?
<img width="1406" height="494" alt="Screenshot of numpy fromfunction" src="https://github.com/user-attachments/assets/a6f69c16-4b86-4c84-b82b-203c82ab5383" />
([https://numpy.org/doc/stable/reference/generated/numpy.fromfunction.html](https://numpy.org/doc/stable/reference/generated/numpy.fromfunction.html))
1. 0
2. 1
3. 2
4. 3
5. 4
6. 6
7. 10
