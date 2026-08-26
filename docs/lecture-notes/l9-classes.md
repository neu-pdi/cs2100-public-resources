---
sidebar_position: 9
lecture_number: 9
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
| list | items: list[int] = [1, 2, 3] |

## How to make your own class: attributes, methods, and constructor

- Class header
  - Define using `class​`
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

Now that we have created this new type called `Pet`, we can use it for a variable called `mini`.
We instantiate an object (an instance) of a class by putting parentheses after its name, and specifying the constructor's arguments inside (`Pet('Mini', 'Rasika', 'cat')`).
We call its methods using its variabla name and the "dot operator" (`.`).
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

## Organizing tests using pytest

We saw an example of this in Lecture 1. We can organize our tests -- each class gets its own corresponding test class, where we test all of its methods.

To create a test class for a class named `Class`:
1. Create a class called `TestClass`
2. Put all the tests for `Class` inside `TestClass`
  - pytest uses plain `assert` statements for assertions
    - `assert result == expected` replaces `self.assertEqual()`
    - `assert result != expected` replaces `self.assertNotEqual()`
    - `assert result == pytest.approx(expected)` replaces `self.assertAlmostEqual()` for `float`s.
    - `pytest.raises()` is used as a context manager to check that an error is raised. Example: `with pytest.raises(ValueError): get_area_of_rectangle(-1, 4)`
    - The name of each method that has tests in it should start with `test_`
3. Run tests from the command line with `pytest` (no call needed inside the file)
4. Don't forget to `import pytest` at the top of the file

Exercise: Let's write tests for `Cat`.

## Identifying test cases

For this course, you must write tests for every function or method that you write.

When testing a function, we consider all the ways the function might behave:
- The normal / happy case to check that the method works for expected inputs
  - `assert add(2, 3) == 5`
  - `assert add(2, 3) != 1`
  - `assert calculateGrade(96) == 'A'`
- Invalid inputs
  - `with pytest.raises(ValueError): calculateGrade(-600)`
  - `with pytest.raises(ValueError): add('two', 3)`
  - `with pytest.raises(ValueError): get_area_of_rectangle(-1, 4)`
- Edge cases at the boundaries of the normal case (almost invalid, but not quite)
  - `assert get_area_of_rectangle(0, 4) == 0`
  - `assert divide(0, 1) == 0`

If the function has conditionals, make sure you have test cases for each branch.

Poll: We're testing a function `calculateGrade(score: int) -> str` that returns a letter grade given a percentage. Which test case is MOST important to include?

1. `assert calculateGrade(87) == 'B+'`
2. `assert calculateGrade(0) == 'F'`
3. `with pytest.raises(ValueError): calculateGrade(-600)`
4. All of these are equally important

Open ended poll: What other test cases can you come up with?

<img width="320" height="136" alt="tweet joke meme about never having enough tests" src="https://github.com/user-attachments/assets/01b08756-143a-4bbf-af40-2af6316574f6" />
(Source: [https://www.reddit.com/r/QualityAssurance/comments/3na0fq/qa_engineer_walks_into_a_bar](https://www.reddit.com/r/QualityAssurance/comments/3na0fq/qa_engineer_walks_into_a_bar))


## Well-named and organized tests which help the reader understand the purpose of a function

Poll: What's wrong with this test?
```python
def test_make_sound_works_after_four_years(self) -> None:
    assert Cat('giga').make_sound() == ""
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
        assert large.make_sound() == meows
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
    with pytest.raises(ValueError):
        assert get_area_of_rectangle(-4, 100) == -400
```
1. The test runs, but it fails (that's not how the implementation is supposed to work)
2. Not all of the tests in this function always get executed (it is possible for some tests to not run)
3. The function's name doesn't reflect what it tests
4. It's using the wrong type of test

## Using setup_method and teardown_method

`pytest` comes with four methods that we can write to help us reduce redundancy and write cleaner tests:

- `def setup_method(self) -> None:` is a method which, if implemented, runs before each test.
- `def teardown_method(self) -> None:` similarly runs after each test.
- `def setup_class(cls) -> None:` runs once at the beginning, before any tests have run. It needs the decorator `@classmethod` right above the method definition, which we will discuss more later on in the semester. Notice also that the argument is `cls`, not `self`.
- `def teardown_class(cls) -> None:` runs once at the end, after all of the tests have run. It also needs the decorator `@classmethod` right above the method definition. We will discuss class methods later in the semester, and you don't need to understand the decorator to write tests using `setup_class(cls)` and `teardown_class(cls)`.

Poll: Why does this break? Why is it better to use `setup_method()`?
```python
class TestShirt:
    def __init__(self) -> None:
        self.shirt = Shirt(500, 'green')
    
    def test_set_size_works_for_positive_values(self) -> None:
        self.shirt.set_size(600)
        assert self.shirt.size == 600
    
    def test_cannot_set_size_to_negative_value(self) -> None:
      assert self.shirt.size == 500
      self.shirt.set_size(-700)
      assert self.shirt.size == 500
```

1. It unnecessarily tests the same thing multiple times
2. It requires the tests to be run in a certain order, which is not guraranteed
3. It doesn't test what the name implies it is testing
4. It is possible for some tests to not be run
