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
print(mini.make_sound() + Cat('Mega').make_sound())
```

1. meow meow meow
2. (blank line)
3. Mini Mini Mini Mega
4. Mini Mega

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

For this course, you must write tests for every function or method that you write.

When testing a function, we consider all the ways the function might behave:
- The normal / happy case to check that the method works for expected inputs
  - `assertEqual(5, add(2, 3))`
  - `assertNotEqual(1, add(2, 3))`
  - `assertEqual('A', calculateGrade(96))`
- Invalid inputs
  - `with self.assertRaises(ValueError): calculateGrade(-600)`
  - `with self.assertRaises(ValueError): add('two', 3)`
  - `with self.assertRaises(ValueError): get_area_of_rectangle(-1, 4)`
- Edge cases at the boundaries of the normal case (almost invalid, but not quite)
  - `assertEqual(0, get_area_of_rectangle(0, 4))`
  - `assertEqual(0, divide(0, 1))`

If the function has conditionals, make sure you have test cases for each branch.

Poll: We're testing a function `calculateGrade(score: int) -> str` that returns a letter grade given a percentage. Which test case is MOST important to include?

1. `assertEqual('B+', calculateGrade(87))`
2. `assertEqual('F', calculateGrade(0))`
3. `with self.assertRaises(ValueError): calculateGrade(-600)`
4. All of these are equally important

Open ended poll: What other test cases can you come up with?

<img width="320" height="136" alt="tweet joke meme about never having enough tests" src="https://github.com/user-attachments/assets/01b08756-143a-4bbf-af40-2af6316574f6" />
(Source: [https://www.reddit.com/r/QualityAssurance/comments/3na0fq/qa_engineer_walks_into_a_bar](https://www.reddit.com/r/QualityAssurance/comments/3na0fq/qa_engineer_walks_into_a_bar))


## Write well-named and organized tests which help the reader understand the purpose of a function

Poll: What's wrong with this test?
```python
def test_make_sound_works_after_four_years(self) -> None:
    self.assertEqual("", Cat('giga').make_sound())
```
1. The test runs, but it fails (that's not how the implementation is supposed to work)
2. Not all of the tests in this function always get executed
3. The function's name doesn't reflect what it tests
4. It's using the wrong type of test

Poll: What's wrong with this test?
```python
def test_make_sound_works_during_first_four_years(self) -> None:
    large: Cat = Cat('large')
    meows: str = ""
    for _ in range(4):
        self.assertEqual(meows, large.make_sound())
        large.birthday()
        meows = (meows + " meow").strip()
```
1. The test runs, but it fails (that's not how the implementation is supposed to work)
2. Not all of the tests in this function always get executed
3. The function's name doesn't reflect what it tests
4. It's using the wrong type of test

Poll: What's wrong with this test?
```python
def test_negative_area(self) -> None:
    with self.assertRaises(ValueError):
        self.assertEqual(-400, get_area_of_rectangle(-4, 100))
```
1. The test runs, but it fails (that's not how the implementation is supposed to work)
2. Not all of the tests in this function always get executed (it is possible for some tests to not run)
3. The function's name doesn't reflect what it tests
4. It's using the wrong type of test

## Using setUp and tearDown

`unittest` comes with four methods that we can write help us to reduce redundancy and write cleaner tests:

- `def setUp(self) -> None:` is a method which, if implemented, runs before each test.
- `def tearDown(self) -> None:` similarly runs after each test.
- `def setUpClass(cls) -> None:` runs once at the beginning, before any tests have run. It needs the annotation `@classmethod` right above the method definition, which we will discuss more later on in the semester. Notice also that the argument is `cls`, not `self`.
- `def tearDownClass(cls) -> None:` runs once at the end, after all of the tests have run. It also needs the annotation `@classmethod` right above the method definition. We will discuss class methods later in the semester, and you don't need to understand the annotation to write tests using `setUpClass(cls)` and `tearDownClass(cls)`.

Poll: Why does this break? Why is it better to use `setUp()`?
```python
class TestShirt(unittest.TestCase):
    def __init__(self) -> None:
        self.shirt = Shirt(500, 'green')
    
    def test_set_size_works_for_positive_values(self) -> None:
        self.shirt.set_size(600)
        self.assertEqual(600, self.shirt.size)
    
    def test_cannot_set_size_to_negative_value(self) -> None:
      self.assertEqual(500, self.shirt.size)
      self.shirt.set_size(-700)
      self.assertEqual(500, self.shirt.size)
```

1. It unnecessarily tests the same thing multiple times
2. It requires the tests to be run in a certain order, which is not guraranteed
3. It doesn't test what the name implies it is testing
4. It is possible for some tests to not be run

## Using try/except safely

There is a control structure that we have not introduced until now: try / except

```python
a: int = 4
b: int = 0

try:
    result = a / b
    print(result)
except ZeroDivisionError:
    print("Cannot divide by zero")
```

It allows us to try to run risky code, and if an error is raised during that risky code, then it jumps immediately to the corresponding `except` block.

It is acceptable to use try / except blocks while testing something: it is an alternative to using the built-in `self.assertRaises()`.

Otherwise, we try to minimize the use of try / except, and only use it when absolutely necessary. We don't want to simply avoid fixing legitimate bugs by wrapping our code in a try / except.

Places where try / except is commonly used:

- Converting values
```python
def get_user_age() -> int:
    """Get a numerical age from the user"""
    user_input: str = input("Enter your age: ")
    try:
        age: int = int(user_input)
        return age
    except ValueError:
        print("Please enter a valid number")
        return -1
    
def parse_json_safely(json_string: str) -> Any:
    """Convert data from JSON to a readable format"""
    try:
        return json.loads(json_string)
    except json.JSONDecodeError as e:
        print(f"Invalid JSON: {e}")
        return {}
```
- Operations that rely on external things like network requests or database operations
- Reading from files (though using a `with` block, as we have been doing, is recommended instead)

Keywords in a try / except block:
- Each error that can be raised should get its own `except` block. It is okay to have multiple `except` blocks for the same `try` block.
- One `except` block can handle multiple errors, if they require the same process: `except (ValueError, TypeError) as e:`
- Inside an `except` block, we may choose to `raise` a different error.
- If there is a `finally` block at the end of a try / except block, then it is run in all cases (whether the `try` was fully executed, or it jumped to the `except`.
- If there is an `else` block at the end of a try / except block, then it is run only if the `try` was fully executed (and it never jumped to an `except` block

Best practices:
- Only use try / except for the few legitimate reasons, not for control flow of the program
- Make the errors handled in `except` blocks as specific as possible. It is okay to list multiple specific errors in the same `except` block.


Poll: What is output?
```python
def noodle(hopefully_a_number: str) -> None:
    try:
        num: int = int(hopefully_a_number)
        print('Cats rule')
    except AssertionError as e:
        print(f'{hopefully_a_number} is not a number')

noodle('hello')
```

1. Cats rule
2. hello is not a number
3. Cats rule
   hello is not a number
4. No output - it raises the error


Poll: What is output?
```python
def noodle(hopefully_a_number: str) -> None:
    try:
        num: int = int(hopefully_a_number)
        print('Cats rule')
    except ValueError as e:
        print(f'{hopefully_a_number} is not a number')

noodle('hello')
```

1. Cats rule
2. hello is not a number
3. Cats rule
   hello is not a number
4. No output - it raises the error
