---
marp: true
style: @import url('https://unpkg.com/tailwindcss@^2/dist/utilities.min.css');

---

# Review for Quiz 3
## Welcome back to CS 2100!
## Prof. Rasika Bhalerao

---

<div class="grid grid-cols-2 gap-4">
<div>

## Topics revisited from previous quizzes

- Unit testing
  - Using `assert` and reading its test output
  - Using `pytest.raises()` and reading its test output
  - Identifying test cases

- Classes
  - Constructors, methods, attributes
  - `__str__()` and `__eq__()`

- State and aliasing
  - References and mutation
  - `None` and `Optional`

</div>
<div>

## New topics on Quiz 3

- Lists, sets, and dictionaries
  - List comprehension
  - Iterating through lists, sets, and dictionaries
  - Rules about contents of lists, sets, and dictionaries
  - Sorting and filtering
  - Binary operators (`|`, `-`, etc.)

- Mean and variance
  - Formulas for mean, variance, and standard deviation
  - Interpreting mean, variance, and standard deviation

</div>
</div>

---

# List comprehension

Move the body of a `for loop` to right before the `for` (after the opening bracket `[`)
```python
my_nums: List[int] = [6, 7, 8, 9]

increased_nums: List[int] = [i + 1 for i in my_nums] # list comprehension

print(increased_nums)  # [7, 8, 9, 10]
```

If we want the resulting list to **filter elements**, we add the `if` clause after the `for` clause.

```python
def positive_copy(nums: List[int]) -> List[int]:
    return [i for i in nums if i >= 0]
```

---

## Poll: Which list comprehension correctly creates a list of **only** the even numbers from 1 to 10?

1. `[x if x % 2 == 0 for x in range(1, 11)]`

2. `[x for x in range(1, 11) where x % 2 == 0]`

3. `[x for x in range(1, 11) if x % 2 == 0]`

4. `[x % 2 == 0 for x in range(1, 11)]`

---

# Sorting

```python
words: List[str] = 'never gonna give you up'.split()

sorted_alphabetically: List[str] = sorted(words)
print(' '.join(sorted_alphabetically)) # give gonna never up you

sorted_by_length: List[str] = sorted(words, key = lambda word: len(word))
print(' '.join(sorted_by_length))  # up you give gonna never
```

The `sorted()` function has an optional argument `key`, which is a function that is applied to each element when determining the sorted order.

---

## Poll: Given this list of tuples representing students and their scores:
```python
[('Mini', 85), ('Binnie', 92), ('Ginnie', 78), ('Spleenie', 92)]
```
## Which code will sort the students by score in descending order (highest to lowest)?

1. `sorted(students, key=lambda x: -x[1], reverse=True)`
2. `sorted(students, key=lambda x: x[1], reverse=True)`
3. `sorted(students, key=lambda x: -x[1])`
4. `sorted(students, reverse=True)`


---

# Dictionaries

- Maps `key` --> `value`
- Can have the same `value` twice, but not the same `key` twice (`key`s are a set)
- If we map a `key` to a `value`, and then later on, map the same `key` to a different `value`, it overwrites the old `value` with the new one
- `dictionary['cat']` vs `dictionary.get('cat', 4)`:
  - get method will return `4` if `'cat'` isn't in the dictionary (or `None` if we didn't specify the `4`)
  - brackets will raise `KeyError` if `'cat'` isn't in the dictionary

---

## Poll: What happens?

```python
student_grades = {"Binnie": 85, "Ginnie": 92, "Mini": 78}

result1 = student_grades.get("Spleenie")
result2 = student_grades.get("Spleenie", 0)
result3 = student_grades["Spleenie"]
```

1. All three results will be None
2. `result1` is `None`, `result2` is 0, and the third result line raises a `KeyError`
3. The first result line raises a `KeyError`, `result2` is 0, and `result3` is `None`
4. All three result lines raise a `KeyError` because 'Spleenie' is not in the dictionary

---

# Dictionary syntax: iteration

```python
ages: Dict[str, int] = {'cat': 10, 'elephant': 14, 'dog': 3}
```

- iterate over its `key`s

```python
for key in ages:
    print(f"{key}'s age is {ages.get(key)}")
```

- iterate over its `key-value` pairs
```python
for key, value in ages.items():
    print(f"{key}'s age is {value}")
```

---

## Poll: Which correctly prints each student's name and grade?

```python
grades = {"Binnie": 85, "Ginnie": 92, "Mini": 78}
```

<div class="grid grid-cols-2 gap-4">
<div>

1. 
```python
for student in grades:
    print(student, grades[student])
```

2.
```python
for student, grade in grades.items():
    print(student, grade)
```

</div>
<div>

3.
```python
for pair in grades:
    print(pair[0], pair[1])
```

4.
```python
for pair in grades:
    print(pair[0], pair[1])
```

</div>
</div>

---

# Set operations

- Union (`a | b`): a set that has all elements that are in either set `a` or set `b`
- Intersection (`a & b`): a set that has all elements that are in both set `a` and set `b`
- Subset (`a <= b`): `True` if all elements in `a` are also in `b`, and `False` otherwise
  - Strict subset (`a < b`): `True` if `a <= b` **and `a` is not equal to `b`**, and `False` otherwise
- Subtraction (`a - b`): a set that has all elements in `a` that are not in `b`

---

## Poll: What is in `result1` and `result2`?

```python
students_in_math = {'Mini', 'Binnie', 'Ginnie'}
students_in_cs = {'Mini', 'Mega', 'Micro'}

result1 = students_in_math & students_in_cs
result2 = students_in_math | students_in_cs
```

<div class="grid grid-cols-2 gap-4">
<div>

1. 
```python
result1 = {'Mini'}
result2 = {'Mini', 'Binnie',
    'Ginnie', 'Mega', 'Micro'}
```

2.
```python
result1 = {'Mini', 'Binnie', 
    'Ginnie', 'Mega', 'Micro'}
result2 = {'Mini'}
```

</div>
<div>

3.
```python
result1 = {'Mini'}
result2 = {'Mini'}
```

4.
```python
result1 = {'Mini', 'Binnie', 
    'Ginnie', 'Mega', 'Micro'}
result2 = {'Mini', 'Binnie', 
    'Ginnie', 'Mega', 'Micro'}
```

</div>
</div>

---

# Mean, variance, and standard deviation

## Mean = sum of all values ÷ number of values

## Variance = mean of the squared deviations from the mean

## Standard deviation = square root of variance

---

# Let's go through Practice Quiz 3!

---

# Poll:

# 1. What is your main takeaway from today?

# 2. What would you like to revisit next time?