---
sidebar_position: 3
lecture_number: 3
title: Python Control Structures
---

# Python Control Structures

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

(If enough time to explain list comprehension) Poll: Which of these is a one-line version of the inside of the (correct) `sarcasm()` function?

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

## Refactoring and constants

Refactoring is moving the code around without changing the functionality. Programmers refactor their code to make it more readable, more testable, and easier to modify.

We often refactor...
- Code used in multiple places into a single function that gets called multiple times
- Code from a complex function into smaller functions
- (Magic) numbers or string literals into constants

**Magic numbers** are unnamed numeric literals in code. We don't like magic numbers.
We name our literals (except for -1, 0, 1, and 2) to make our code self-documenting.

We name our literals by making them into **constants**: variables named in `UPPER_SNAKE_CASE` that aren't meant to be modified while the programming is running.

### Why use named constants?

- Readability
```python
SECONDS_PER_MINUTE = 60
MINUTES_PER_HOUR = 60
HOURS_PER_DAY = 24
SECONDS_PER_DAY = SECONDS_PER_MINUTE * MINUTES_PER_HOUR * HOURS_PER_DAY
```

- Safety
```python
timer(SECONDS_PER_DAY)
timer(86400)
```

- Maintainability
```python
CREDITS_TO_GRADUATE = 128
NUMBER_OF_CAMPUSES = 10
```

## Import code

We've been importing modules like `import pytest`.

We can also import code from a file that we wrote ourselves: `import my_file`

When a Python file is imported, all of the code inside it is executed. (Try it out -- put `print('hello')` in a new file and import it.) That's why we put our code inside functions -- we don't want the code inside to be executed when it's imported!

In a function named `main()`, we call all the functions that we want to run when the file is run (not imported).

And we add this at the end of the file so that the `main()` function is only called when the file is run, not imported:

```
if __name__ == '__main__':
    main()
```

Try this out using today's lecture code -- what happens if you keep all those `print()` statements outside of functions, and then import the file? Does it get fixed when you move that code into functions which are only called in `main()`? (Don't forget the `if __name__ == '__main__'` conditional at the end!)
