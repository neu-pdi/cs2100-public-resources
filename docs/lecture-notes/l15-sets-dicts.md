---
sidebar_position: 15
lecture_number: 15
title: Pythonic Sets and Dictionaries
---

# Pythonic Sets and Dictionaries

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

## (if time) The Accumulator Pattern

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

## (if time) functools.reduce() and itertools.accumulate()

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
