---
sidebar_position: 12
lecture_number: 12
title: More Data Structures
---

# Sets and Dictionaries

We have already worked with two data structures: Lists and Tuples. Both are ways to keep an ordered collection of elements, all of which are the same type[^1].
Recall from Lecture 9: a tuple is a lot like a list, but it's immutable: its contents cannot be changed after the tuple is initially created.

[^1]: Yes, Python allows us to put different types in the same List or Tuple, but it's discouraged, and MyPy blocks it for us.

## Sets

A set is very similar to a list: it is a collection of items.

```python
from typing import Set

words: Set[str] = {'hi', 'hi', 'hello', 'hi', 'howdy', 'hi'}

print(words)  # {'hi', 'hello', 'howdy'}
```

Differences between a set and a list:
- A set is unordered
- A set can only hold each item (at most) once -- no duplicates​

### Some set syntax

Creating a set:
```python
words: Set[str] = {'hi', 'hi', 'hello', 'hi', 'howdy', 'hi'}  # explicitly listing them

numbers: Set[int] = set(range(5))  # using the set constructor
print(numbers)  # {0, 1, 2, 3, 4}

list_of_floats: List[float] = [3.4, 3.2, 2.9, 3.4, 3.0]
measurements: Set[float] = set(list_of_floats)  # using the set constructor that takes an existing collection
print(measurements)  # {3.2, 3.0, 2.9, 3.4}
```

Adding and removing items, iterating over a set, and getting its size:
```python
nums: Set[float] = set()  # empty set

for i in range(100):
    random_float = round(random(), 2) # random float rounded to nearest hundredth
    nums.add(random_float)  # add it to the set

print(len(nums))  # print the size of the set

numbers: Set[int] = set(range(5))
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
nums_a: Set[int] = set(range(1, 5))
nums_b: Set[int] = set(range(3, 9))

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
    birthdays: Set[Tuple[int, int]] = set()

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
ages: Dict[str, int] = {'elephant': 12, 'cat': 10}
print(ages)  # {'elephant': 12, 'cat': 10}

also_ages: Dict[str, int] = dict([('elephant', 12), ('cat', 10)])
print(also_ages)  # {'elephant': 12, 'cat': 10}  (same as before)
```

### Some dictionary syntax

We can access a value given its key in two different ways: brackets (`[key]`) or using the `get(key)` method. The `get(key)` has the added benefit that it handles the case if the `key` is not in the `dict`.
```python
ages: Dict[str, int] = {'elephant': 12, 'cat': 10}

print(ages['cat'])  # 10
print(ages.get('cat'))  # 10
print(ages.get('dog'))  # None
print(ages.get('dog'), 3)  # 3
print(ages['dog'])  # raises KeyError
```

We can add or update a `key` -> `value` pair. If we add the same `key` twice, it overwrites the original `value` with the second `value`.
```python
ages: Dict[str, int] = {'cat': 10}

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
ages: Dict[str, int] = {'cat': 10, 'elephant': 14, 'dog': 3}

for key in ages:
    print(f"{key}'s age is {ages.get(key)}")

for key, value in ages.items():
    print(f"{key}'s age is {value}")
```

Exercise: Let's write a function that takes a `str` and returns a dictionary that maps from each unique word in the `str` to the number of times it appears.

```python
def word_counter(text: str) -> Dict[str, int]:
    word_counts: Dict[str, int] = dict()
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
def scrabble_helper(letter: str) -> Dict[int, Set[str]]:
    result: Dict[int, Set[str]] = dict()
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

result: Dict[int, Set[str]] = scrabble_helper('r')

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
