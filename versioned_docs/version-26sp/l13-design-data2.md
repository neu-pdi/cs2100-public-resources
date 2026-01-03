---
sidebar_position: 13
lecture_number: 13
title: Design Patterns for Handling Data 2
---

# Design Patterns for Handling Data 2

This lecture is intentionally light to leave a time buffer for leftover topics.

## Combining dataframes

We previously discussed concatenating dataframes to add one to the "end" of the other.

```python
import pandas as pd

df = pd.DataFrame(
    {'Person': ['Elephant', 'Cat'],
    'Age': [13, 10]})

new_rows = pd.DataFrame({
    'Person': ['Dog', 'Giraffe'],
    'Age': [3, 6]})

df = pd.concat([df, new_rows], ignore_index=True)

print(df)
```
```
     Person  Age
0  Elephant   13
1       Cat   10
2       Dog    3
3   Giraffe    6
```

If we want to instead combine two datasets side-by-side, rather than adding one to the end of the other, we need to "merge" the two datasets.

By default, the `pandas.merge()` function will combine dataframes using any columns that have the same name:
```python
df = pd.DataFrame(
    {'Person': ['Elephant', 'Cat', 'Dog', 'Giraffe'],
    'Age': [13, 10, 3, 6]})

other_df = pd.DataFrame(
    {'Person': ['Dog', 'Giraffe', 'Elephant', 'Cat'],
     'BFF': ['Cat', 'Elephant', 'Giraffe', 'Cat']}
)

print(pd.merge(df, other_df))
```
```
     Person  Age       BFF
0  Elephant   13   Giraffe
1       Cat   10       Cat
2       Dog    3       Cat
3   Giraffe    6  Elephant
```

If there are multiple columns with the same name, we can specify which one to use with the `on` argument. If the columns with the same name don't "agree" across the two dataframes (e.g., in one dataset, the cat's age is 10, and in the other, the cat's age is 6), it will include both of the disagreeing columns, suffixed by the original dataframe (`x` or `y`):
```python
df = pd.DataFrame(
    {'Person': ['Elephant', 'Cat', 'Dog', 'Giraffe'],
    'Age': [13, 10, 3, 6]})

other_df = pd.DataFrame(
    {'Person': ['Dog', 'Giraffe', 'Elephant', 'Cat'],
     'Age': [13, 10, 3, 6],  # these ages are different from the ones in df
     'BFF': ['Cat', 'Elephant', 'Giraffe', 'Cat']}
)

print(pd.merge(df, other_df, on='Person'))
```
```
     Person  Age_x  Age_y       BFF
0  Elephant     13      3   Giraffe
1       Cat     10      6       Cat
2       Dog      3     13       Cat
3   Giraffe      6     10  Elephant
```

If there are values that only appear in one dataset, but not the other, then by default, it will omit those rows entirely:
```python
df = pd.DataFrame(
    {'Person': ['Elephant', 'Cat', 'Dog', 'Giraffe'],
    'Age': [13, 10, 3, 6]})

df_age_year = pd.DataFrame({
    'Age': [3, 6, 9, 10],
    'Year': [2022, 2019, 2016, 2015]
})

print(pd.merge(df, df_age_year))
```
```
    Person  Age  Year
0      Cat   10  2015
1      Dog    3  2022
2  Giraffe    6  2019
```
If we want to change that, we can use the `how` parameter. If we pass it `'left'`, then the resulting dataframe will include all rows from the left dataframe, filling in `NaN` ("Not a Number") values for the missing pieces.
```python
df = pd.DataFrame(
    {'Person': ['Elephant', 'Cat', 'Dog', 'Giraffe'],
    'Age': [13, 10, 3, 6]})

df_age_year = pd.DataFrame({
    'Age': [3, 6, 9, 10],
    'Year': [2022, 2019, 2016, 2015]
})

print(pd.merge(df, df_age_year, on='left'))
```
```
     Person  Age    Year
0  Elephant   13     NaN
1       Cat   10  2015.0
2       Dog    3  2022.0
3   Giraffe    6  2019.0
```

Similarly for `'right'`:
```python
df = pd.DataFrame(
    {'Person': ['Elephant', 'Cat', 'Dog', 'Giraffe'],
    'Age': [13, 10, 3, 6]})

df_age_year = pd.DataFrame({
    'Age': [3, 6, 9, 10],
    'Year': [2022, 2019, 2016, 2015]
})

print(pd.merge(df, df_age_year, on='right'))
```
```
    Person  Age  Year
0      Dog    3  2022
1  Giraffe    6  2019
2      NaN    9  2016
3      Cat   10  2015
```

To include all rows from both, we use `'outer'`, and to only include rows that were in both (the default) we use `'inner'`.
```python
df = pd.DataFrame(
    {'Person': ['Elephant', 'Cat', 'Dog', 'Giraffe'],
    'Age': [13, 10, 3, 6]})

df_age_year = pd.DataFrame({
    'Age': [3, 6, 9, 10],
    'Year': [2022, 2019, 2016, 2015]
})

print(pd.merge(df, df_age_year, on='outer'))
```
```
     Person  Age    Year
0  Elephant   13     NaN
1       Cat   10  2015.0
2       Dog    3  2022.0
3   Giraffe    6  2019.0
4       NaN    9  2016.0
```

Poll: What is output?
```python
df_all_students = pd.DataFrame({
    'ID': [1, 2, 3, 4],
    'Name': ['Cat', 'Dog', 'Elephant', 'Giraffe']
})

df_swimming_class_grades = pd.DataFrame({
    'ID': [1, 3, 5],
    'Grade': ['A', 'B', 'C']
})

print(pd.merge(df_all_students, df_swimming_class_grades, on='ID', how='left'))
```
1. A dataframe with 3 rows
2. A dataframe with 4 rows
3. A dataframe with 5 rows
4. Error -- cannot merge dataframes with different lengths

## MapReduce

We covered the `map()`, `filter()`, and `functools.reduce()` functions in [Lecture 11](https://neu-pdi.github.io/cs2100-public-resources/lecture-notes/l11-lists#map-and-filter). We also covered filtering in more depth in [Lecture 15](https://neu-pdi.github.io/cs2100-public-resources/lecture-notes/l15-design-data1#filtering-with-pandas).

MapReduce is a framework for processing data using the `map` and `reduce` concepts, independent of programming language:
1. **Map phase**: In this phase, the data is broken into pieces, and each piece is "mapped" or transformed.
2. **Reduce phase**: In this phase, the mapped data is then "reduced" or combined into a result.

For example, let's say we are counting the frequency of each word in a piece of text.
1. The map phase will involve splitting the text into words, and mapping each word to a key-value pair such as `(word, 1)`, where `word` is the word being mapped.
2. The reduce phase will involve grouping the key-value pairs by word, and then reducing, or adding up, the numbers in each group.

The MapReduce framework is a popular way to process large datasets because it can be split across multiple computers: the separate chunks don't rely on each other, so each chunk can go to a different computer. The results will be reduced, or combined, together at the end.
