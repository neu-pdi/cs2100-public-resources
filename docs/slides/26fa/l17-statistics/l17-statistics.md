---
marp: true
style: @import url('https://unpkg.com/tailwindcss@^2/dist/utilities.min.css');

---

# Statistical Measures
## Welcome back to CS 2100!
## Prof. Rasika Bhalerao

---

# Exercise:

```python
data = {
    'title': ['The Matrix', 'Inception', 'Interstellar', 'Blade Runner'],
    'year': [1999, 2010, 2014, 1982],
    'rating': [8.7, 8.8, 8.6, 8.1]
}
df = pd.DataFrame(data)
```

Let's:
- get the average rating
- print a sentence like `"The Matrix was released in 1999"` for each movie
- add a new movie `"Dune"` with `year=2021` and `rating=8.0`


---

# Common Pandas operations: selecting a column

```python
print(list(df['Age']))  # [10, 13]

print(df['Age'])
```
```
0    10
1    13
Name: Age, dtype: int64
```

---

# Common Pandas operations: iterating through rows

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

---

# Common Pandas operations: iterating through rows

## Each row is a dict

```python
for index, row in df.iterrows():
    print(f"{row['Person']}'s age is {row['Age']}")
```
```
Cat's age is 10
Elephant's age is 13
```

---

# Common Pandas operations: adding more rows

Create another dataframe and use `concat()` to concatenate them

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

---

# Common Pandas operations: adding more columns

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

---

## Poll: How can I find the age of the oldest person in `df`?
1. `df(max['Age'])`
2. `max(df['Age'])`
3. `max(row['Age'] for _, row in df.iterrows())`
4. `max('Age' for _, row in df.iterrows())`

---

# Statistical Variables

<style scoped>
section {
  font-size: 25px;
}
</style>

| Computer programming | Statistics |
|-|-|
| a variable is a named reference to a location in the computer's memory | a variable is a characteristic that can be measured or categorized |
| it holds exactly one value at any time while the program runs | it represents the range of possible values across a dataset |
| it's designed to describe what value is currently stored and how it's used in logic / operations | it's designed to describe what values occur in a dataset |
| `age = 25`, `name: Optional[str] = None`, `has_bodyguard = True` | age, birth month, what time the bus arrives, whether or not it rains |
| variables can have many types (int, string, boolean, list, object, etc.) | variables are generally either quantitative or categorical (next section) |

---

## Poll: Is this describing a variable in the statistical or computer programming sense?

# `score = score + 5`

1. Statistical
2. Programming

---

## Poll: Is this describing a variable in the statistical or computer programming sense?

# In our dataset, age ranges from 18 to 65

1. Statistical
2. Programming

---

## Poll: Is this describing a variable in the statistical or computer programming sense?

# age = 5, and then later, age = 6

1. Statistical
2. Programming

---

## Poll: Is this describing a variable in the statistical or computer programming sense?

# Shoe size is a variable we collected from 200 survey respondents

1. Statistical
2. Programming

---

## Poll: Is this describing a variable in the statistical or computer programming sense?

# The loop variable idx goes from 0 to 9

1. Statistical
2. Programming

---

## Poll: Is this describing a variable in the statistical or computer programming sense?

# Is zip_code a variable in this dataset?

1. Statistical
2. Programming

---

# Statistical Variable types

**Quantitative variables** have numeric meaning.

**Categorical variables** represent labels or categories — they describe a quality or characteristic rather than a quantity.


**Classic trap: Numbers that are actually categorical variables.** E.g., zip code, phone numbers, student ID numbers.

The test isn't "is it stored as a number?" but "does doing arithmetic on these values make sense?"

---

## Special Categorical Variables

**Binary**: only two possible values. E.g., whether or not someone is being sarcastic, whether or not someone blinks

**Ordinal**: categories have an inherent order.

Ordinal variables will appear on the TRACE evaluations which you should complete at the end of the semester.

<img width="511" height="154" alt="An ordinal variable" src="https://github.com/user-attachments/assets/8417a69b-265f-4bbf-83c1-5039d799d6c7" />


Source of that image: https://www.mymarketresearchmethods.com/types-of-data-nominal-ordinal-interval-ratio/

---

## Quantitative Variable Types

| Discrete | Continuous |
|-|-|
| can only take on specific, separate values -- there are gaps between possible values, and you can't meaningfully have a value in between two consecutive ones | can take on any value within a given range — between any two values, there's always another possible value |
| E.g., number of marbles, number of bugs in a program | E.g., time, temperature, distance |

---

## Poll: Should it be a continuous or discrete variable?

# Number of emails in an inbox

1. Continuous
2. Discrete

---

## Poll: Should it be a continuous or discrete variable?

# Time it takes the bus to get to the airport

1. Continuous
2. Discrete

---

## Poll: Should it be a continuous or discrete variable?

# Height of a plant

1. Continuous
2. Discrete

---

## Poll: Should it be a continuous or discrete variable?

# Number of courses a student is enrolled in

1. Continuous
2. Discrete

---

## Poll: Should it be a continuous or discrete variable?

# Volume of water in a glass

1. Continuous
2. Discrete

---

## Poll: Should it be a continuous or discrete variable?

# Shoe size

1. Continuous
2. Discrete

---

## Binning

Binning is the process of taking a quantitative variable and grouping its values into intervals or "bins."

**It turns quantitative data into categorical data.**

It helps with analysis, since it's easier to summarize "ages 20–29, 30–39, 40–49" than every individual age.

---

Here are the runtimes (in milliseconds) of 12 test cases:

## 12, 15, 18, 23, 26, 29, 31, 38, 42, 44, 45, 49

### You decide to bin them into equal-width bins of size 10, starting at 10:

| | |
|-|-|
| Bin A: 10 - 19 | Bin B: 20–29 |
| Bin C: 30–39 | Bin D: 40–49 |

## Poll 1: How many runtimes fall into Bin B (20–29)?

1. 2
2. 3
3. 4
4. 5

---

Here are the runtimes (in milliseconds) of 12 test cases:

## 12, 15, 18, 23, 26, 29, 31, 38, 42, 44, 45, 49

### You decide to bin them into equal-width bins of size 10, starting at 10:

| | |
|-|-|
| Bin A: 10 - 19 | Bin B: 20–29 |
| Bin C: 30–39 | Bin D: 40–49 |

## Poll 2: Which bin contains the most runtimes?

1. Bin A
2. Bin B
3. Bin C
4. Bin D

---

Here are the runtimes (in milliseconds) of 12 test cases:

## 12, 15, 18, 23, 26, 29, 31, 38, 42, 44, 45, 49

### You decide to bin them into equal-width bins of size 10, starting at 10:

| | |
|-|-|
| Bin A: 10 - 19 | Bin B: 20–29 |
| Bin C: 30–39 | Bin D: 40–49 |

### Poll 3: Instead of equal-width bins, you want 3 equal-frequency bins (so they have 4 runtimes each). What would the first bin (fastest 4 test cases) contain?

| | |
|-|-|
| 1. 12, 15, 18, 23 | 2. 12, 15, 18, 26 |
| 3. 12, 15, 18, 23, 26 | 4. All runtimes below 20 |

---

## Mean and median

**Mean = sum of all values ÷ number of values**

Let's calculate the mean on this dataset:

Dataset: 4, 5, 6, 7, 8
Mean = 30 / 5 = 6

And this dataset:

Dataset: 4, 5, 6, 7, 50
Mean = 72 / 5 = 14.4

## Does 14.4 feel like it represents this data well? (Four of the five values are way below it.)

---

## Median = the value in the middle when data is sorted (or average of the two middle values if there's an even count)

Same dataset: 4, 5, 6, 7, 50 -> sorted, middle value = 6

Now compare: median (6) vs. mean (14.4) — median is much more representative when there's an extreme value.

---

## Poll: What are the mean and median of this dataset? Which one better represents a "typical" value?

Dataset: 10, 12, 13, 14, 90

---

## Poll: A company reports that thir mean salary is $120,000 per year. An employee tells you that most people there actually make around $65,000. Please propose an explanation for this discrepancy.

---

### Variance

Here are two datasets with the same mean but very different spread:

## Dataset A: 48, 49, 50, 51, 52 -> mean = 50

## Dataset B: 10, 30, 50, 70, 90 -> mean = 50

# How do we communicate that A is more reliably close to the mean than B?

---

## First instinct: average distance from the mean

A natural first guess to measure "spread": average of (value − mean)

## Try it on Dataset B:

## Dataset B: 10, 30, 50, 70, 90

(10-50) + (30-50) + (50-50) + (70-50) + (90-50) = -40 + -20 + 0 + 20 + 40 = 0

The positive and negative **deviations** cancel out, so this naive approach always gives 0, no matter how spread out the data is. This motivates the next step...

---

## Fix the cancellation problem: square the deviations

Since negative and positive deviations cancel, we can square each deviation first so everything is positive:

## Dataset B: 10, 30, 50, 70, 90

# (value - mean)²

## For Dataset B: 1600, 400, 0, 400, 1600

---

## Average the squared deviations -> variance

# Variance = average of the squared deviations from the mean

## Dataset A: 48, 49, 50, 51, 52

(1600 + 400 + 0 + 400 + 1600) / 5 = 4000 / 5 = 800

## Dataset B: 10, 30, 50, 70, 90

(4,1,0,1,4)/5 = 10/5 = 2 (much smaller, so more reliably close to the mean)

---

## Units problem -> standard deviation

## If our data is in milliseconds, what are the units of variance? milliseconds², squared units

Squared units can be hard to interpret intuitively. So, we take the square root.

# Standard deviation = square root of variance

---

## Poll: Dataset A: 48, 49, 50, 51, 52. Dataset B: 10, 30, 50, 70, 90. Both have a mean of 50. Which has the higher variance?

1. Dataset A
2. Dataset B
3. They're equal
4. Cannot be determined

---

## Poll: Given the dataset 4, 8, 6, 10, 12, what are the variance and standard deviation?

---

## Poll: Two sorting algorithms both have a mean runtime of 50ms. Algorithm A has a standard deviation of 2ms. Algorithm B has a standard deviation of 40ms. Which algorithm has a more consistent runtime?

1. Algorithm A
2. Algorithm B
3. They're equally consistent
4. Cannot be determined from this information

---

# Poll:

# 1. What is your main takeaway from today?

# 2. What would you like to revisit next time?