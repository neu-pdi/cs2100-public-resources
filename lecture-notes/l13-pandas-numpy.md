---
sidebar_position: 13
lecture_number: 13
title: Pandas and Numpy
---

# Pandas and Numpy
In the realm of data science it crucial to understand how to effectively store, manipulate, and analyze collections of data. This lecture explores Python's fundamental data structures and libraries that enable efficient data handling and processing. Techniques used in Data Science frequently rely on working with collections of values often in a tabular or multi-dimensional form to describe and find patterns.

An Environmental Scientist might work with readings from sensors collecting atmospheric data to measure changes in gas concentrations for climate change research. Since these readings are collected at regular intervals over time, preserving the chronological order of measurements is an important feature of a data structure used for this task.

## Built-In Sequences
Sequential data types help us maintain an ordered relationship between data points and perform operations such as iteration, slicing, sorting and concatenation. Python has two categories of built-in sequential types: _containers_ and _flat sequences_. Container sequences (such as `list` and `tuple`) store references to collections of _objects_ stored externally, whilst flat sequences (such as `str`, `bytes` and `array.array`) organise homogeneous collections of _raw value_ elements stored internally within the sequence.

### Lists
The Python list is a container sequence that contains a collection of pointers to different memory addresses where each individual element of the list is stored in memory. It should feel quite natural for you at this point to think about readings from a sensor inside a list that we can slice and iterate over.

The list is a particularly flexible data type in Python because it allows us to mix different kinds of elements within the sequence. The trade-off we have to make for this flexibility is performance—each element in a list is a separate object with it's own header containing metadata about its type, the number of other objects pointing to it (reference count) as well as well as the value itself. When we iterate over the items in a list, Python jumps between different memory locations to access each element in a given sequence.

### Arrays
If we are working with millions of values—as Data Scientists frequently do—storing each value as a separate Python object introduces a lot of overhead that impacts efficiency and performance on large sets of data. Arrays are a data structure that help us overcome this performance bottleneck by sacrificing the flexibility of types that can be accommodated within a list.

Arrays are a flat sequence of values stored in consecutive memory locations, where all elements are the of same data type. Since arrays occupy a continuous block of memory and each element takes up exactly the same amount of space, the interpreter can quickly calculate where any specific element is located using index and the size of each element in the array. The uniform structure of an array allows for fast iteration through elements and efficient representation of multi-dimensional data like matrices. This makes arrays particularly valuable in scientific computing, where you often work with large collections of values of the same type (like floating-point values) and is structured for mathematical operations and data processing.
 
Python's standard library includes an `array.array` data type that creates [arrays](https://docs.python.org/3/library/array.html) which work similar to lists, but with an important constraint: all elements must be the same data type. When creating an `array.array`, you must specify which data type it will hold, and you are limited to the basic data types available in C (like integers, floats, and characters). This restriction exists because [CPython](https://github.com/python/cpython)—the standard Python interpreter—is implemented in C, and `array.array` uses C's native data types for storage. This design gives you some of the memory efficiency benefits of C arrays while still providing a Python interface you can manipulate like a list. However, the trade-off is less flexibility compared to Python lists, which can mix different data types in the same container.

```python
from array import array

a = array("l", [1, 2, 3])

print(type(a))
print(a[0])
```
```
<class 'array.array'>
1
```
Arrays are a particularly efficient mechanism for working with collections of numbers, however `array.array` can be cumbersome when you want to represent matrices and multiple dimensions that are commonly used in data science and scientific computing.

## Statistics and vector math with Numpy
[NumPy](https://numpy.org/) (or Numerical Python) is a library that provides data structures and algorithms for numeric applications in Python. NumPy was developed in 2005 by Travis Oliphant by combining the Numeric and Numarray Python projects. The NumPy array acts as a container format for passing data between compatible scientific computing libraries such as SciPy and pandas.

:::info
You may need to install NumPy. To do that, in VSCode, go to the Terminal and execute the command `pip install numpy`.
:::

The NumPy library is implemented in C and can use multiple CPU cores for higher performance than standard single threaded Python functions for working with arrays. The library contains numerous optimised functions for common operations in scientific computing and working with multi-dimensional arrays without the use of Python `for` loops.

Here we import `numpy` and use it to create a 2-dimensional vector:

```python
import numpy as np

v1 = np.array([
    [1, 2, 3],
    [4, 5, 6]
])

print(v1)
print("v1 Python type:", type(v1))
print("NumPy array type:", v1.dtype)
print("v1 as python list:", v1.tolist())
```
```
[[1 2 3]
 [4 5 6]]

v1 Python type: <class 'numpy.ndarray'>
NumPy array type: int64
v1 as python list: [[1, 2, 3], [4, 5, 6]]
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
#### NumPy Objects
NumPy provides two fundamental objects: an N-dimensional array object `ndarray` and a universal function object `ufunc`. NumPy arrays can store a broader range of types than the standard C types available in `array.array` and has the ability to work with null values and reference other Python objects.

The [_shape_](https://numpy.org/devdocs/reference/arrays.ndarray.html#arrays-ndarray) of an array defines how elements in an array are read, an array containing six elements in two dimensions has the shape of a 2 x 3 matrix. The shape of an array helps determine its [_stride_](https://arxiv.org/pdf/1102.1523.pdf), the number of elements that must be jumped through in a one dimensional array layout to get to the next element of the dimension. This allows ndarrays to be reshaped without having to make copies of the underlying data. NumPy arrays also have a modified [indexing syntax](https://numpy.org/doc/stable/user/basics.indexing.html) that adds the ability to slice over multiple dimensions.
```python
import numpy as np

a = np.arange(6)
print(a)

# Change into a two-dimensional matrix by changing shape
print("\nReshape")
a.shape = (2, 3)
print(a)

# Transpose the array
print("\nTranspose")
print(a.transpose())
```
```
[0 1 2 3 4 5]

Reshape
[[0 1 2]
 [3 4 5]]
 
Transpose
[[0 3]
 [1 4]
 [2 5]]
```
### Vector operations

We can perform mathematical vector operations using `numpy` vectors. NumPy calls these operations [universal functions](https://numpy.org/doc/stable/user/basics.ufuncs.html) or `ufuncs` which perform element-by-element operations over the contents of an array. Common mathematical operations such as addition, multiplication, division, square roots and exponential have optimised operations written in C, allowing them to be performed faster than standard Python operations.

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

:::tip
When you create a NumPy array, the actual data is stored and managed by C rather than Python's standard object system. Python displays a string representation of the underlying C data when you print an array. The data only becomes a Python object when you explicitly convert it—for example, by turning an array into a Python list. This is a concept which can be tricky to grasp at first, but you should try to avoid scenarios where you are turning NumPy arrays into Python objects for iteration or loops and explore how to use ufuncs to pefrom the same function.
:::

If the two vectors being added have different dimensions, it will raise a `ValueError`.
The exception is if one of the vectors is 1-dimensional, with a length equal to the length of each row in the other vector. In that case, it will add that same vector to each row. This is known as [_broadcasting_](https://numpy.org/doc/stable/user/basics.broadcasting.html), it allows input arrays with different shapes to be used with universal functions by automatically expanding the smaller array.

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

## Processing tabular data using Pandas

[Pandas](https://pandas.pydata.org/) is a popular library for data analysis. It lets us work with spreadsheets and tables in Python. It was developed by Wes McKinney in 2008 and the name derived from the term Panel Data and designed to perform data analaysis and visualisation. Pandas helps you work with tabular data using NumPy arrays to store the underlying data.

:::info
If this is your first time using Pandas, you will need to install it. To do that, in VSCode, go to the Terminal and execute the command `pip install pandas`.

Even if this is not your first time using Pandas, you may need to install the MyPy type hints for Pandas (which is a separate install). To do that, in VSCode, go to the Terminal and execute the command `pip install pandas-stubs`.
:::

Pandas has a number of data types for data analysis:
- *Series*: one-dimensional labelled arrays of any data type
- *DataFrames*: two-dimensional labelled arrays of any data type
- *Time series*: index as data times
- *Panels*: three-dimensional container of data
<br/>
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
