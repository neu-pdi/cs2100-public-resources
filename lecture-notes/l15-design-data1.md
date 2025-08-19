---
sidebar_position: 15
lecture_number: 15
title: Design Patterns for Handling Data 1
---

# Design Patterns for Handling Data 1

## Functions are objects

As we saw in [Lecture 10](https://neu-pdi.github.io/cs2100-public-resources/lecture-notes/l10-generics#generic-functions), we can pass functions as arguments into other functions. This means that a variable can represent a function.
We also saw that the variable type for a function that takes an argument of type `T` and returns type `R` is `Callable[[T], R]`.

Functions have attributes, just like other objects that can be represented using variables. Here we access and print its attribute `__name__`:
```python
from typing import Callable

def my_function() -> None:
    print('um hi')

print(my_function.__name__)  # my_function
```

If we have a variable that holds a function, we can call (execute) that function using parentheses like normal.
```python
def my_function() -> None:
    print('um hi')

# print(my_function.__name__)

def execute_multiple(func: Callable[[], None], times: int) -> None:
    """Executes the function func times number of times"""
    for _ in range(times):
        func()

execute_multiple(my_function, 5)
```

We can also declare a function variable in one line:
```python
add: Callable[[int, int], int] = lambda x, y: x + y

print(add(4, 5))  # 9
```

Poll: Which of these variables is a function that safely divides `int`s or returns `None` if that's impossible?
1. `divide: Callable[[int, int], Optional[float]] = lambda num, den: num / den`
2. `divide: Callable[[int, int], float] = lambda num, den: num / den if den != 0 else None`
3. `divide: Callable[[int, int], Optional[float]] = lambda num, den: num / den if den != 0 else None`
4. `divide: Callable[[int, int], Optional[float]] = lambda num, den: try: num / den except ZeroDivisionError: None if den != 0 else None`

## Sorting with Pandas

Storing functions as variables is useful when sorting and filtering data.

Here is an example using Python's built-in `sorted()` function:
```python
words: List[str] = 'never gonna give you up'.split()

sorted_alphabetically: List[str] = sorted(words)
print(' '.join(sorted_alphabetically)) # give gonna never up you

sorted_by_length: List[str] = sorted(words, key = lambda word: len(word))
print(' '.join(sorted_by_length))  # up you give gonna never
```
The `sorted()` function has an optional argument `key`, which is a function that is applied to each element when determining the sorted order.

Poll: Which of these lists is sorted by the number of vowels?
1. `sorted(words, key=lambda word: 'aeiou' in word))`
2. `sorted(words, key=lambda word: len([i for i in word if i in 'aeiou']))`
3. `sorted(words, key=lambda word: len([i for i in word if word in 'aeiou']))`
4. `sorted(words, key=lambda word, i: len([i for i in word if word in 'aeiou']))`

The function for sorting elements of a Pandas dataframe also has a `key` argument, but the function passed to that argument should accept the entire column as an argument, and return the entire transformed column.

```python
df = pd.DataFrame(
    {'Person': ['Elephant', 'Cat', 'Frog'],
    'Age': [13, 10, 3]})

print(df.sort_values(by='Person'))
```
```
     Person  Age
1       Cat   10
0  Elephant   13
2      Frog    3
```
```python
print(df.sort_values(by='Person', key=lambda col: [len(word) for word in col]))
```
```
     Person  Age
1       Cat   10
2      Frog    3
0  Elephant   13
```

## Filtering with Pandas

Quick note: Recall that we can iterate through a dataframe like this:
```python
for index, row in df.iterrows():
    # use row as a dict where the column names are its keys
```

We can filter a Pandas dataframe to rows that match our criteria.
Here, we select the rows where the age is more than 5:
```python
df = pd.DataFrame(
    {'Person': ['Elephant', 'Cat', 'Frog'],
    'Age': [13, 10, 3]})

print(df[df['Age'] > 5])
```
```
     Person  Age
0  Elephant   13
1       Cat   10
```

For criteria that are more complicated than a simple expression like `df['Age'] > 5`, we can instead use a function.
This function should take the entire dataset as the argument. It should return a list of booleans that is the same length as the dataset; indexes that are marked `True` will be included in the filtered dataset.
```python
df = pd.DataFrame(
    {'Person': ['Elephant', 'Cat', 'Frog'],
    'Age': [13, 10, 3]})

print(df[[True, False, True]])
```
```
     Person  Age
0  Elephant   13
2      Frog    3
```
```python
print(df[lambda dataframe: ['a' in row['Person'] for _, row in dataframe.iterrows()]])
```
```
     Person  Age
0  Elephant   13
1       Cat   10
```

Poll: Let's say we have a dataset of books, and the columns are `Title` (`str`), `Author` (`str`), and `Year` (`int`). How can we get the authors of the books whose titles contain the letter 'e', sorted by year?
1. `df[lambda dataframe: ['e' in row['Title'] for _, row in dataframe.iterrows()]].sort_values(by='Year')['Author']`
2. `df[['e' in row['Title'] for _, row in df.iterrows()]].sort_values(by='Year')['Author']`
3. `df[['e' in row['Title']]].sort_values(by='Year')['Author']`
4. `df[['e' in 'Title']].sort_values(by='Year')['Author']`

## Scaling and normalizing data

Data will look vastly different just based on the units used. For example, length measured in inches will yield different numbers than length measured in centimeters -- even if they are both describing the same things.

It turns out that this becomes a problem for machine learning models (and also for our own visualizations). Machine learning models can give more "importance" to bigger numbers, just as visualizations can trick people into thinking that some things are larger than others.

<img width="560" height="337" alt="https://www.heap.io/blog/how-to-lie-with-data-visualization" src="https://github.com/user-attachments/assets/df77acb6-74e9-4d15-9f46-6daf2fede4a5" />
Source: https://www.heap.io/blog/how-to-lie-with-data-visualization

To address this issue, data scientists often adjust the _scale_ of a variable so that it is in the same range as another variable.

The process of scaling variables so that all of them are in the range between 0 and 1 is called _normalizing_ the data.
Luckily, this doesn't need a fancy Python package (though there is one). It's a simple formula:
```
x_normalized = (x - x_min) / (x_max - x_min)
```
where `x_min` is the minimum and `x_max` is the maximum data point for the variable `x`. We transform each value of `x` into `x_normalized` this way, and the set of `x_normalized` values will be our new dataset comprised of numbers between 0 and 1.

Poll: Let's say that this is our dataset of values for the variable `x`: [6, 8, 9, 8, 7]. What is the dataset after normalizing it?
1. [0.25, 0.75, 1, 0.75, 0.5]
2. [0, 0.67, 1, 0.67, 0.33]
3. [0, 0.5, 0.75, 0.5, 0.25]
4. [0, 4, 1, 3, 2]

## Argmax

It is useful to know that Numpy has a function called `argsort()` which takes a list of elements and returns a list of its indices, moved to the locations they would be in if the list was sorted.
```python
words: List[str] = 'never gonna give you up'.split()

sorted_alphabetically: List[str] = sorted(words)

print(sorted_alphabetically)  # ['give', 'gonna', 'never', 'up', 'you']

indices_of_sorted_words = np.argsort(words)

print(indices_of_sorted_words)  # [2 1 0 4 3]
```
This is saying that, if the list of words was sorted alphabetically, the word at index 4 would be first, then the word at index 6, then the word at index 1, etc. until the last word, which would ironically be the word at index 0.
