---
sidebar_position: 2
lecture_number: 2
title: Programming in Python
---

# Programming in Python

Poll: How can I swap the values of `x: int` and `y: int`?

a)
```python
temp: int = x
x = y
y = temp
```

b)
```python
temp: int = x
temp = y
y = x
```

c)
```python
temp: int = y
x = y
x = temp
```

d)
```python
temp: int = x
y = temp
x = y
```

## Choose how to represent data

### String manipulation

Strings in Python can be represented using single quotes (`'cat'`) or double quotes (`"cat"`).

One way to represent a double quote in a string is to represent the string using single quotes, and vice versa:

- `'This is a double quote: "'`
- `"This is a single quote: '"`

We can also represent a literal double quote in the string using an escape sequence to indicate that it shouldn't end the string: `"This is a double quote: \""`

Here is a list of string escape sequences:

- "\t"    tab character
- "\n"    newline character
- "\r"    carriage return
- "\""    double quote character
- "\'"    single quote character
- "\\"    backslash character

#### String concatenation

- "Joseph" + "Aoun"
- "Joseph" + " " + "Aoun"
- We can multiply a string by an integer: "!" * 10

Poll: What does this print? `print("I am so excited" + "!" * 3)`

1. I am so excited! I am so excited! I am so excited!
2. I am so excited!I am so excited!I am so excited!
3. I am so excited!!!​
4. Nothing – it breaks

#### F-string​

We can put a variable directly in a string to save time.

```python
cats: int = 4
print(f"There are {cats} cats in this room."​)


>> There are 4 cats in this room.
```

It also helps reduce the number of places where a bug can happen in the code.

### Float

We've seen these types in the examples so far: `int`, `str`.

What if we want to represent a number that isn't an integer? Like 2.5? Then we use a `float`.

```python
num: float = 2.5
```

Tip: dividing any two numbers in Python results in a float -- even if the operands are `int`s, and the result has an integer value.
```python
print(type(4 / 2))

>> <class 'float'>
```

### Boolean

- Store the result of a yes-no question​
- Only 2 (legit) values: True and False
- We're assuming you've seen booleans before

```python
my_decision: bool = True
```

#### Some boolean operators
- Opposite
  - `not my_decision​`
- Comparisons: `<`, `<=`, `>`, `>=`, `==`, `!=`
  - `4 < 6`
- And (both must be true to result in true)​
  - `my_decision and your_decision`
- Or (true if either/both are true)​
  - `my_decision or your_decision`

### Order of operations

- Math order of operations:
  2. (Parentheses)
  3. Exponents
    - `4**2 * 3`
      `>> 48`
  4. Multiplication/Division (left to right)
  5. Addition/Subtraction (left to right)
- Math happens before comparison operations
  - `7 < 2 + 8`
    `>> True`
- Comparison happens before boolean operations​
  - `3 < 4 and 5 < 7`
    `True`

### None

None works like a value that represents the absence of a value.

```python
bodyguard_name: str = None # doesn't have a value -- I don't have a bodyguard
```

It's different from "" or 0 (see [Null Island](https://en.wikipedia.org/wiki/Null_Island))

Can store `None` in a list​
```python
grades: List[int] = [5, None, 0]
```

Cannot add `None` to a number or string
- `None + "hi"` does not work
- `len(None)` does not work​

To specify that a type might be `None`, we use `Optional`. For example:
```python
from typing import Optional

def get_number_or_None(hopefully_a_number: str) -> Optional[int]:
    try:
        return int(hopefully_a_number)
    except ValueError:
        return None
```

## Types

We started using types in our Python code since day one (last lecture). Here are two new types, which need to be imported:

```python
from typing import List, Set

nums: List[int] = [1, 2, 3]
words: Set[str] = {'hi', 'hello', 'howdy'}
```

We're assuming you have used lists before. Sets may be new to some.

A set is very similar to a list: it is a collection of items.

Differences between a set and a list:
- A set is unordered
- A set can only hold each item (at most) once -- no duplicates​

There will be more about sets in [Lecture 12](https://neu-pdi.github.io/cs2100-public-resources/lecture-notes/l12-data-structures).

## Control structures

We're assuming you've seen conditionals and iteration before, though possibly in a different programming langauge. Here it is in Python:

### Conditionals

#### If / else

```python
secret_num: int = 8
guess: int = int(input('My guess: '))

if secret_num == guess:
    print('I guessed it!')
elif (secret_num + 1 == guess) or (secret_num - 1 == guess):
    print('So close!')
else:
    print('Maybe next time!')
```

Tip: we can put a conditional expression in one line:
```python
print('yes' if my_decision else 'no')
print(f'{num_cats} cat{'s' if num_cats > 1 else ''}')
```

#### Match case statements

If there are many cases, a match-case statement might be more practical:

```python
name: str = input('Please enter your name: ')
match name:
    case 'SpongeBob':
        print('You are a sponge')
    case 'Patrick':
        print('You are a starfish')
    case _:
        print('I don\'t know you')
```

A match-case statement finds the first case that matches​, and only executes that one case (or zero cases if none match).

The `case _` is a catch-all that matches anything that didn't fit any other cases. It is not required, but if it is there, it must be the last case.

### Iteration

#### While loops

```python
animal: str = input('Please enter an animal: ')

while not is_animal(animal):
    animal = input('That wasn\'t an animal. Please enter an animal: ')
```

#### For loops over numbers

We use while loops when we don't know in advance how many iterations we will need. If we do know the number of iterations (given the variables we currently have), then a for loop is more appropriate.

For loops in Python can use a helpful function called `range()`:

```python
for i in range(4):
    print(i)

>> 0
   1
   2
   3
```

We can start a range at a number other than 0:

```python
for i in range(2, 5):
    print(i)

>> 2
   3
   4
```

We can also ask it to count in "steps" larger than 1:

```python
for i in range(10, 50, 5):
    print(i)

>> 10
   15
   20
   25
   30
   35
   40
   45
```

#### For loops over the elements of a collection

It turns out that the `range()` function returns a collection, which the for loop iterates over. We can instead tell Python to iterate over the elements of a different collection:

```python
for character in 'I love cats!':
    print(character.upper())

>> I
 
   L
   O
   V
   E
 
   C
   A
   T
   S
   !
```

Poll: What's wrong with this function? Why doesn't the docstring match the code?

```python
"""Function to generate a random float"""
from random import random

def sarcasm(phrase: str) -> str:
    """Returns the sarcastic version of the provided phrase, where a 
    randomly selected half of the characters are uppercase, and the 
    others are lowercase.
    
    Parameters
    ----------
    phrase : str
        The phrase to turn sarcastic
    
    Returns
    -------
    str
        The sarcastic version of the phrase
    """
    sarcastic_phrase = ''
    for character in phrase:
        if random() < 0.5:
            sarcastic_phrase += character.upper()
    return sarcastic_phrase
```

1. It's adding the index of the character, not the character itself
2. It skips adding about half of the letters
3. Sometimes, it doesn't return a string at all
4. It adds extra characters to the string

Poll: Which of these is a one-line version of the inside of the (correct) `sarcasm()` function?

1. `return ''.join([character.upper() for character in phrase if random() < 0.5])`
2. `return ''.join([character.upper() if random() < 0.5 for character in phrase])`
3. `return ''.join([character.upper() if random() else character.lower() for character in phrase])`
4. `return ''.join([character.upper() if random() < 0.5 else character.lower() for character in phrase])`

#### For loops over a collection, keeping track of indices

```python
for index, word in enumerate(['American Shorthair', 'Balinese', 'Cheetah']):
    print(f'{index}: {word}')

>> 0: American Shorthair
   1: Balinese
   2: Cheetah
```

## Read and write data from user input and text files

We've been using the `input('prompt')` function which returns the user's response to the provided `'prompt'`.

We can also read data from a file:

```python
with open('story.txt', 'r', encoding="utf-8") as file:
    for line in file.readlines():
        print(line)
```

If, instead of reading from the file, we want to write to the file, then we must use a different option than `'r'`.

- `open('story.txt', 'r')`: read the file
- `open('story.txt', 'w')`: write the file (overwrite it if it already exists)
- `open('story.txt', 'a')`: append to the end of the file (and create the file if it doesn't exist)

We can then write to the file using `file.write("Line to write to file")`.

## Import code

We've been importing modules like `import unittest` and `from typing import List, Set`.

We can also import code from a file that we wrote ourselves: `import my_file`

When a Python file is imported, all of the code inside it is executed. (Try it out -- put `print('hello')` in a new file and import it.) That's why we put our code inside functions -- we don't want the code inside to be executed when it's imported!

In a function named `main()`, we call all the functions that we want to run when the file is run (not imported).

And we add this at the end of the file so that the `main()` function is only called when the file is run, not imported:

```
if __name__ == '__main__':
    main()
```

Try this out using today's lecture code -- what happens if you keep all those `print()` statements outside of functions, and then import the file? Does it get fixed when you move that code into functions which are only called in `main()`? (Don't forget the `if __name__ == '__main__'` conditional at the end!)
