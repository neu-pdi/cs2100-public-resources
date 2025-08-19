---
sidebar_position: 13
lecture_number: 13
title: Pandas and Numpy
---

# Pandas and Numpy

## Processing tabular data using Pandas

[Pandas](https://pandas.pydata.org/) is a popular library for data analysis. It lets us work with spreadsheets and tables in Python.

If this is your first time using Pandas, you will need to install it. To do that, in VSCode, go to the Terminal and execute the command `pip install pandas`.

Even if this is not your first time using Pandas, you may need to install the MyPy type hints for Pandas (which is a separate install). To do that, in VSCode, go to the Terminal and execute the command `pip install pandas-stubs`.

We can use Pandas to create and view a dataframe like this:
```python
import pandas as pd

df = pd.DataFrame(
    {'Person': ['Elephant', 'Cat'],
    'Age': [13, 10]})
print(df)
```
```
     Person  Age
0       Cat   10
1  Elephant   13
```
This dataset contains two people: Cat and Elephant. It also has a column for their ages.
The topmost line of the printed output is the name of each column. The leftmost column is the index of each row.

We can read in a dataframe that is stored in a CSV file called `data.csv`. (If you are looking for an example CSV dataset file, [Kaggle search](https://www.kaggle.com/search) is a great place to look.)
```python
df = pd.read_csv('/path/to/data.csv')
```
To get the same dataset as before, we put this as the contents of `data.csv`:
```
Person,Age
Cat,10
Elephant,13
```
To write an existing dataframe to a new file, we use `to_csv()`:
```python
df.to_csv('new_file.csv')
```

To select one column, and process it like a list, we use brackets (`[column]`):
```python
print(list(df['Age']))  # [10, 13]
print(df['Age'])
```
```
0    10
1    13
Name: Age, dtype: int64
```

To iterate through the dataset, row by row:
```python
for index, row in df.iterrows():
    print(f'Row number {index}:\n{row}\n')
```
```
Row number 0:
Person    Cat
Age        10
Name: 0, dtype: object

Row number 1:
Person    Elephant
Age             13
Name: 1, dtype: object
```

Each row can be used like a `dict`:
```python
for index, row in df.iterrows():
    print(f"{row['Person']}'s age is {row['Age']}")
```
```
Cat's age is 10
Elephant's age is 13
```

To add more rows to a dataframe, we create another dataframe and use `concat()` to concatenate them:
```python
new_rows = pd.DataFrame({
    'Person': ['Dog', 'Giraffe'],
    'Age': [3, 6]})

df = pd.concat([df, new_rows], ignore_index=True)
print(df)
```
```
     Person  Age
0       Cat   10
1  Elephant   13
2       Dog    3
3   Giraffe    6
```

To add a new column to the dataframe we use brackets (`df[new_column_name]`) again:
```python
df['BFF'] = ['Cat', 'Giraffe', 'Cat', 'Elephant']
print(df)
```
```
     Person  Age       BFF
0       Cat   10       Cat
1  Elephant   13   Giraffe
2       Dog    3       Cat
3   Giraffe    6  Elephant
```
(BFF = best friend forever)

We will do more Pandas operations (like sorting and filtering) in Lecture 15.

Poll: How can I find the age of the oldest person in `df`?
1. `df(max['Age'])`
2. `max(df['Age'])`
3. `max(row['Age'] for _, row in df.iterrows())`
4. `max('Age' for _, row in df.iterrows())`

## Statistics and vector math with Numpy

[Numpy](https://numpy.org/) is a popular, powerful package for scientific computing. You may also need to `pip install numpy`.

Here we import `numpy` and use it to create a 2-dimensional vector:
```python
import numpy as np

v1 = np.array([
    [1, 2, 3],
    [4, 5, 6]
])

print(v1)
```
```
[[1 2 3]
 [4 5 6]]
```

Numpy also has a handy function for generating a random integer between a lower (inclusive) and upper (exclusive) bound:
```python
num: int = np.random.randint(10, 20)
```

And it has functions for calculating the mean and variance of a vector, which also works on regular `list`s:
```python
print(np.mean(np.array([3, 4, 5])))  # 4.0
print(np.var(np.array([3, 4, 5])))  # 0.6666666666666666

print(np.mean([3, 4, 5]))  # 4.0
print(np.var([3, 4, 5]))  # 0.6666666666666666
```

### Vector operations

We can perform mathematical vector operations using `numpy` vectors.

#### Vector addition

If we add two regular `list`s in Python, it will concatenate them (combine them end-to-end).
If we add two `numpy` vectors together, it will add the corresponding elements together.
```python
v1 = np.array([
    [1, 2, 3],
    [4, 5, 6]
])

v2 = np.array([
    [7, 8, 9],
    [0, 0, 0]
])

print(v1 + v2)
```
```
[[ 8 10 12]
 [ 4  5  6]]
```

If the two vectors being added have different dimensions, it will raise a `ValueError`.
The exception is if one of the vectors is 1-dimensional, with a length equal to the length of each row in the other vector. In that case, it will add that same vector to each row.
```python
v1 = np.array([
    [1, 2, 3],
    [4, 5, 6]
])

v2 = np.array(
    [7, 8, 9],
)

print(v1 + v2)
```
```
[[ 8 10 12]
 [11 13 15]]
```

Vector addition in Numpy is commutative: the order of the vectors being added does not matter.

#### Scalar multiplication

If we multiply a regular `list` by a scalar (a single number), it will concatenate that `list` to itself that many times.
```python
print([3, 4, 5] * 4)  # [3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5]
```
In Numpy, multiplying a vector by a scalar multiplies each element by that number.
```python
v1 = np.array([
    [1, 2, 3],
    [4, 5, 6]
])

print(v1 * 3)
```
```
[[ 3  6  9]
 [12 15 18]]
```
```python
print(3.4 * v1)
```
```
[[ 3.4  6.8 10.2]
 [13.6 17.  20.4]]
```

Scalar multiplication is also commutative (the order of the scalar and the vector does not matter).

#### Length

If we calculate the length of a regular `list` in Python, it will tell us the number of elements in that `list`.
The length of a Numpy vector is its norm, or its distance from origin.
```python
print(np.linalg.norm(np.array([3, 0, 4])))  # 5.0
```

Poll: What is this function doing?
```python
def something(n: int) -> np.ndarray:
    matrix = np.random.randint(n, size=(n, n))
    return np.mean(matrix, axis=1)
```
1. It creates a vector of length 1 (just one number) which is the average of `n` random numbers between 0 and `n`
2. It creates a vector of length `n`, and each element in it is the average of `n` random numbers between 0 and `n`
3. It creates a vector of length 1 which is the average of `n` squared random numbers between 0 and `n`
4. It creates a vector of length `n`, and each element in it is a random number between 0 and `n`

## Creating and raising our own Errors

We've seen that we can raise errors when we need to stop the program.
```python
def int_divide(num1: int, num2: int) -> int:
    """Returns the result of dividing num1 and num2, rounded to the nearest int"""
    if num2 == 0:
        raise ZeroDivisionError
    return round(num1 / num2)

print(int_divide(7, 3))  # 2
```

We can also create our own exceptions, there is not a built-in error which fits our needs.

```python
class CatPettingError(Exception):
    """Custom exception raised when cat petting has gone wrong"""
    def __init__(self, message: str = "The cat did not like that."):
        super().__init__(message)

def pet_cat() -> None:
    if random() < 0.3:
        raise CatPettingError
    print('purrr')

for i in range(5):
    pet_cat()
```

There are only two differences between our custom exception and the built-in errors:
- Its name (`CatPettingError`)
- The message it prints when raised (`"The cat did not like that."`)
This is useful if we want to give the client a more useful hint as to what went wrong.

## The os module
The `os` module is helpful for interacting with the file system.

Here are three functions that are particularly useful:
- `os.path.exists("path/to/file")` checks if the file exists
- `os.path.join('base/path', 'filename')` safely combines the base path and the filename to create a `str` holdiong the path to the file
- `os.listdir('path/to/directory')` lists the files in the directory

Because the function `open('filename', 'w')` overwrites the file if it already exists, these functions in the `os` module can help us to prevent overwriting precious files.

Exercise: let's write a function that writes a given dataframe to a given file, but only if that file does not already exist. If it exists, then it should raise a FileExistsError.
```python
import os

def safe_to_csv(df: pd.core.frame.DataFrame, filename: str) -> None:
    if os.path.exists(filename):
        raise FileExistsError
    df.to_csv(filename)
```
