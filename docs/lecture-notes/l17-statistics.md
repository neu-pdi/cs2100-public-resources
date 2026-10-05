---
sidebar_position: 17
lecture_number: 17
title: Statistical Variables
---

# Statistical Variables

So far, we have been using variables in the computer programming sense. To do data science, we need to understand variables in the statistical sense, too.

Some differences between statistical variables and computer programming variables:

| Computer programming | Statistics |
|-|-|
| a variable is a named reference to a location in the computer's memory | a variable is a characteristic that can be measured or categorized |
| it holds exactly one value at any time while the program runs | it represents the range of possible values across a dataset |
| it's designed to describe what value is currently stored and how it's used in logic / operations | it's designed to describe what values occur in a dataset |
| `age = 25`, `name: Optional[str] = None`, `has_bodyguard = True` | age, birth month, what time the bus arrives, whether or not it rains |
| variables can have many types (int, string, boolean, list, object, etc.) | variables are generally either quantitative or categorical (next section) |

### Polls: For each, is this describing a variable in the statistical or computer programming sense?

- score = score + 5
- In our dataset, age ranges from 18 to 65
- age = 5, and then later, age = 6
- Shoe size is a variable we collected from 200 survey respondents
- The loop variable idx goes from 0 to 9
- Is zip_code a variable in this dataset?

(The above examples were adapted from Claude AI output.)

## Variable types

Statistical variables are generally quantitative or categorical. Quantitative variables have numeric meaning. Categorical variables represent labels or categories — they describe a quality or characteristic rather than a quantity.

### Categorical

The classic trap: Numbers that are actually categorical variables. E.g., zip code, phone numbers, student ID numbers. The test isn't "is it stored as a number?" but "does doing arithmetic on these values make sense?"

A **binary** variable is a special case of categorical variable, where there are only two possible values. E.g.: whether or not someone is being sarcastic, whether or not someone blinks

An **ordinal** variable is a special case of categorical variable, where the categories have an inherent order. Ordinal variables will appear on the TRACE evaluations which you should complete at the end of the semester.

<img width="511" height="154" alt="An ordinal variable" src="https://github.com/user-attachments/assets/8417a69b-265f-4bbf-83c1-5039d799d6c7" />


Source of that image: https://www.mymarketresearchmethods.com/types-of-data-nominal-ordinal-interval-ratio/

### Quantitative

Quantitative variables are either **continuous** or **discrete**.

| Discrete | Continuous |
|-|-|
| can only take on specific, separate values -- there are gaps between possible values, and you can't meaningfully have a value in between two consecutive ones | can take on any value within a given range — between any two values, there's always another possible value |
| E.g., number of marbles, number of bugs in a program | E.g., time, temperature, distance |

### Polls: For each, should it be a continuous or discrete variable?

- Number of emails in an inbox
- Time it takes the bus to get to the airport
- Height of a plant
- Number of courses a student is enrolled in
- Volume of water in a glass
- Shoe size

(The above examples were adapted from Claude AI output.)

### Binning

Binning is the process of taking a quantitative variable and grouping its values into intervals or "bins." **It turns quantitative data into categorical data.**

It helps with analysis, since it's easier to summarize "ages 20–29, 30–39, 40–49" than every individual age.

### Polls: Here are the runtimes (in milliseconds) of 12 test cases:

12, 15, 18, 23, 26, 29, 31, 38, 42, 44, 45, 49

You decide to bin them into equal-width bins of size 10, starting at 10:

- Bin A: 10–19
- Bin B: 20–29
- Bin C: 30–39
- Bin D: 40–49

Poll 1: How many runtimes fall into Bin B (20–29)?

1. 2
2. 3
3. 4
4. 5

Poll 2: Which bin contains the most runtimes?

1. Bin A
2. Bin B
3. Bin C
4. Bin D

Poll 3: Instead of equal-width bins, you want 3 equal-frequency bins (so they have 4 runtimes each). What would the first bin (fastest 4 test cases) contain?

1. 12, 15, 18, 23
2. 12, 15, 18, 26
3. 12, 15, 18, 23, 26
4. All runtimes below 20

## Mean and median

**Mean = sum of all values ÷ number of values**

Let's calculate the mean on this dataset:

Dataset: 4, 5, 6, 7, 8
Mean = 30 / 5 = 6

And this dataset:

Dataset: 4, 5, 6, 7, 50
Mean = 72 / 5 = 14.4

Does 14.4 feel like it represents this data well? (Four of the five values are way below it.)

**Median = the value in the middle when data is sorted (or average of the two middle values if there's an even count)**

Same dataset: 4, 5, 6, 7, 50 -> sorted, middle value = 6

Now compare: median (6) vs. mean (14.4) — median is much more representative when there's an extreme value.

### Poll: What are the mean and median of this dataset? Which one better represents a "typical" value?

Dataset: 10, 12, 13, 14, 90

(Free response)

### Poll: A company reports that thir mean salary is $120,000/year. An employee tells you that most people there actually make around $65,000. Please propose an explanation for this discrepancy.

## Variance and standard deviation

Here are two datasets with the same mean but very different spread:

Dataset A: 48, 49, 50, 51, 52 -> mean = 50

Dataset B: 10, 30, 50, 70, 90 -> mean = 50

How do we communicate that A is more reliably close to the mean than B?

1. First instinct: average distance from the mean

A natural first guess to measure "spread": average of (value − mean)

Try it on Dataset B (mean = 50):

(10-50) + (30-50) + (50-50) + (70-50) + (90-50) = -40 + -20 + 0 + 20 + 40 = 0

The positive and negative **deviations** cancel out, so this naive approach always gives 0, no matter how spread out the data is. This motivates the next step:

2. Fix the cancellation problem: square the deviations

Since negative and positive deviations cancel, we can square each deviation first so everything is positive:

(value - mean)²

For Dataset B: 1600, 400, 0, 400, 1600

3. Average the squared deviations -> variance

**Variance = average of the squared deviations from the mean**

For Dataset B: (1600 + 400 + 0 + 400 + 1600) / 5 = 4000 / 5 = 800

For Dataset A: (4,1,0,1,4)/5 = 10/5 = 2 (much smaller, so more reliably close to the mean)

1. Flag the units problem -> standard deviation

If our data is in milliseconds, what are the units of variance? milliseconds², squared units

Squared units can be hard to interpret intuitively. So, we take the square root.

**Standard deviation = square root of variance**

### Poll: Dataset A: 48, 49, 50, 51, 52. Dataset B: 10, 30, 50, 70, 90. Both have a mean of 50. Which has the higher variance?

1. Dataset A
2. Dataset B
3. They're equal
4. Cannot be determined

### Poll: Given the dataset 4, 8, 6, 10, 12, what are the variance and standard deviation?

(Free response)

### Poll: Two sorting algorithms both have a mean runtime of 50ms. Algorithm A has a standard deviation of 2ms. Algorithm B has a standard deviation of 40ms. Which algorithm has a more consistent runtime?

1. Algorithm A
2. Algorithm B
3. They're equally consistent
4. Cannot be determined from this information
