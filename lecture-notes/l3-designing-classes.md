---
sidebar_position: 3
lecture_number: 3
title: Designing Classes
---

# Designing Classes

Motivation: "nouns" in the real world (versus "verbs" which are functions)

Classes encapsulate data and code. ​They achieve abstraction by masking details of implementation. (e.g., like how we push a button/turn a key to start a car without knowing how exactly it works)

Another way to think about a class is a way to create a new type.

Here are some classes that are built in to Python (types that we already use):

| Class (data type) | Object (an instance of a class) |
| ----------------- | ------------------------------- |
| str | word: str = "hello" |
| list | items: List[int] = [1, 2, 3] |

## How to make your own class: attributes, methods, and constructor

- Class header
  - Define using class​
  - Name starts with capital letter
- Parts of a class
  - Attributes
    - Named using `self.`
  - Methods
    - Functions inside a class​
    - First parameter is always `self`
  - Constructor
    - Special method that is called when the object is "instantiated"
    - To initialize the attributes
    - Signature: `def __init__(self):`

Let's walk through this class definition:

```python
class Pet:
    """Represents a household pet"""
    def __init__(self, pet_name: str, owner_name: str, animal: str):
        self.name: str = pet_name
        self.owner: str = owner_name
        if animal == 'cat':
            self.sound: str = 'meow'
        elif animal == 'dog':
            self.sound = 'bark'
        else:
            self.sound = 'hello'

    def make_sound(self) -> str:
        """Returns the pet's sound"""
        return self.sound
```

Now that we have created this new type called `Pet`, we can use it for a variable called `mini`:

```python
mini: Pet = Pet('Mini', 'Rasika', 'cat')
print(mini.make_sound()) # meow
```

Exercise: Let's define a class called `Cat`

- Attributes: self.name, self.age
- Constructor:
  - Take name as parameter
  - Make self.age equal 0
- Methods:
  - `birthday()` increments `self.age`
  - `make_sound()` returns the string `'meow'`, multiplied by the cat's age (with spaces in between)

```python
class Cat:
    """Represents a cat with a name"""
    def __init__(self, name: str):
        self.name = name
        self.age = 0
    
    def birthday(self) -> None:
        """Increments cat's age"""
        self.age += 1
    
    def make_sound(self) -> str:
        """Returns 'meow' multiplied by cat's age, with spaces in between"""
        return ('meow ' * self.age).strip()
```

Poll: What does this output?
```python
mini: Cat = Cat('Mini')
for year in range(3):
    mini.birthday()
print(mini.make_sound() + Cat('mega').make_sound())
```

1. meow meow meow
2. (blank line)
3. mini mini mini mega
4. mini mega

## Organizing tests using unittest.TestCase

We saw an example of this in Lecture 1. We can organize our tests -- each class gets its own corresponding test class, where we test all of its methods.

To create a test class for a class named `Class`:
1. Create a class called `TestClass(unittest.TestCase)`
2. Put all the tests for `Class` inside `TestClass`
  - `unittest.TestCase` contains a bunch of helpful methods that we inherit
    - `self.assertEqual()` takes two arguments. If they are equal, it does nothing. If they are not equal, it raises an error.
    - `self.assertAlmostEqual()` works like `assertEqual()`, but it allows a small difference if used for `float`s.
    - `self.assertRaises()` takes an error as an argument, and does nothing if the block of code raises that error. If the block of code does not raise that error, then `assertRaises()` raises an `AssertionError`. Recall this example: `with self.assertRaises(ValueError): get_area_of_rectangle(-1, 4)`
    - The name of each method that has tests in it should start with `test_`
3. Then outside of `TestClass`, call `unittest.main()`
  - Optional verbosity parameter can be 1, 2, or 3
4. Don't forget to `import unittest` at the top of the file

Exercise: Let's write tests for `Cat`.

## Identify test cases and implement them as unit tests
## Write well-named and organized tests which help the reader understand the purpose of a function
## Use setup and cleanup
## Handle mutable state in tests

### Aside #1 about mutability: alias vs. copy

Given an object, an alias is simply another reference to the same object (same place in the computer's memory).
A copy is another object (different place in the computer's memory) that has the same elements and looks exactly the same.

```python
original: List[int] = [1, 2, 3]

alias: List[int] = original
copy: List[int] = original.copy()

original[2] = 90

print(alias) # [1, 2, 90]
print(copy) # [1, 2, 3]
```

### Aside #2 about mutability: passing mutable objects as arguments

If we pass an object as an argument to a function, an _alias_ is created, not a copy.

```python
def sum_with_bad_manners(in_list: List[int]) -> int:
    sum: int = 0
    while (len(in_list) > 0):
        sum += in_list.pop()
    return sum


my_list: List[int] = [1, 2, 3, 4]
print(f'Sum: {sum_with_bad_manners(my_list)}') # Sum: 10
print(my_list) # []
```

Good manners: Functions should always leave their args unchanged

## Use try/accept safely
