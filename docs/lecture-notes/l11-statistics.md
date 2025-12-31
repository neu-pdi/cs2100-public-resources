---
sidebar_position: 11
lecture_number: 11
title: Statistics and Data Visualization
---

# Statistics and Data Visualization

<img width="740" height="241" alt="XKCD Cell Phone Use" src="https://github.com/user-attachments/assets/d121049d-687b-45c5-bf2e-36d62bfa1878" />
Source: https://xkcd.com/925

## Correlation

Correlation measures the strength of a linear relationship between two variables.

In the context of statistics, a variable is a characteristic or attribute that can take on different values. For example, `age` can be a variable, for which we collect data from a group of people. That data will probably be stored as a vector or list (where each element is a person's age). We can also make measurements for the variable `height` for that group of people to create another vector.

In the examples below, we assume that we have two variables: one that takes the value on the x axis, and one that takes the value on the y axis. If it helps, you can imagine that each dot is a person, with their age on the x axis and their height on the y axis.

These two variables have a somewhat strong correlation:
<img width="552" height="428" alt="loose positive correlation" src="https://github.com/user-attachments/assets/d4ad37c9-607f-43d7-b81e-599ee3b0a49b" />

These two variables have a very weak correlation, if at all. Their _correlation coefficient_ is close to 0:
<img width="564" height="428" alt="no correlation" src="https://github.com/user-attachments/assets/d02801d6-9d89-4743-a913-492229606189" />

These two variables have an extremely strong correlation. Their correlation coefficient is close to 1:
<img width="554" height="434" alt="strong positive correlation" src="https://github.com/user-attachments/assets/eccfa599-d971-4d71-a7f9-7b38a29268c4" />

And these two variables also have an extremely strong correlation, but in the negative direction. As `x` increases, `y` decreaes. Their correlation coefficient is close to -1:
<img width="562" height="423" alt="strong negative correlation" src="https://github.com/user-attachments/assets/4888323f-041b-4a0f-b86e-cf2c0cd90e21" />

These two cariables have a slightly strong negative correlaion. Their correlation coefficient is between -1 and 0:
<img width="573" height="420" alt="weak negative correlation" src="https://github.com/user-attachments/assets/959235d5-68fd-4c0c-93a1-3450b89136fd" />

These two variables have a correlation coefficient of 0:
<img width="564" height="423" alt="flat line" src="https://github.com/user-attachments/assets/00f4be1a-b209-4192-a488-b42d0e7cc929" />


The most popular method of calculating correlation is [the Pearson Correlation Coefficient](https://en.wikipedia.org/wiki/Pearson_correlation_coefficient):
The Pearson Correlation Coefficient between two variables `x` and `y` can be calculated using this formula:
<img width="348" height="91" alt="cov(x,y)/(var(x)var(y))" src="https://github.com/user-attachments/assets/e0e1d4c1-c3b5-4ced-910a-e3b3519458e8" />
where `x̄` is the mean of all `x` values, and `ȳ` is the mean of all `y` values. You do not need to memorize this formula -- Python will calculate it for you.

Consider this Pandas dataframe:
```python
df = pd.DataFrame(
    {'Person': ['Elephant', 'Cat', 'Dog'],
    'Age': [13, 10, 3],
    'Height': [5, 4, 1]})

print(np.corrcoef(df['Age'], df['Height']))
```
```
[[1.         0.99853837]
 [0.99853837 1.        ]]
```
This is saying that the correlation coefficient between age and height is 0.9985 -- that's very close to the maximum, which is 1. It makes sense for age and height to be correlated, at least early in life

The `numpy.corrcoef(x, y)` function returns a 2-dimensional array containing the correlation coefficients:
```
[[corr(x,x)      corr(x,y)]
 [corr(y,x)      corr(y,y)]]
```

We can calculate the same thing for every pair of columns in a Pandas dataframe:
```python
print(df.corr(numeric_only=True))
```
```
             Age    Height
Age     1.000000  0.998538
Height  0.998538  1.000000
```
We use `numeric_only=True` to prevent it from trying to do calculations using the columns which contain text data.

Poll: Suppose we have an array which is holding measurements for the variable `x`. Without knowing what `x` is, what is the correlation between `x` and `-x`?
1. 0
2. 1
3. -1
4. Between 0 and 1

Poll: It is sometimes the trend in some courses that students who perform poorly on exams early on end up performing at the top of their class at the end of the semester. (This might be because they feel motivated to study harder.) In a course where this is the case, what would be the correlation between the variables `Quiz_1_score` and `Quiz_4_score`?
1. 0
2. Between -1 and 0
3. Between 0 and 1
4. 1

A common logical fallacy is mistaking correlation for causation. You may have heard of the phrase ["Correlation does not imply causation."](https://en.wikipedia.org/wiki/Correlation_does_not_imply_causation) This means that correlation between two variables does not imply that an increase in one of the variables _causes_ the other to increase (or decrease). It means that we cannot know whether one of the variables is the cause simply by using correlation.

<img width="918" height="371" alt="XKCD Correlation" src="https://github.com/user-attachments/assets/602273a7-ad93-4815-816c-208fab5b62cf" />
Source: https://xkcd.com/552

## Visualization with matplotlib

Those plots above were created using a Python package called `matplotlib`.

Here is a code snippet that randomly generates values for variables `x` and `y` and plots them on a scatterplot. There are `size` number of elements in this dataset, each with an `x` attribute and a `y` attribute.
```python
import matplotlib.pyplot as plt

size: int = 50
x = np.random.rand(size)
y = [-i + 0.1 * np.random.rand() for i in x]

plt.scatter(x, y)

plt.title('Relationship between x and y', fontsize=16, color='blue')
plt.xlabel('x')  # title of the x axis
plt.ylabel('y')  # title of the y axis

plt.show() # type: ignore
```
It also adds a title for the scatterplot, and labels the `x` and `y` axes.

Note: `plt.show()` is needed to make the scatterplot appear on the screen. Without it, the scatterplot will not be visible.
We add the `# type: ignore` so that MyPy will not complain about the untyped function call. `# type: ignore` should not be used anywhere else, except on a line with `plt.show()`. It makes VSCode ignore important errors.

We can also generate a bar graph, if that format better suits our data visualization needs. The syntax is very similar:
```python
import matplotlib.pyplot as plt

num_categories: int = 10
categories: List[int] = [i for i in range(num_categories)]
values = np.random.rand(num_categories)

plt.bar(categories, values)

plt.title('Days gone without mistaking correlation for causation', fontsize=16, color='blue')
plt.xlabel('Number of days')
plt.ylabel('Number of times we went that long')

plt.show() # type: ignore
```
<img width="637" height="466" alt="Bar graph" src="https://github.com/user-attachments/assets/f28e8dd0-5d72-4f71-8ec0-4f1f923ce9d2" />

There is a special type of bar graph called a _histogram_: a histogram displays the number of occurences of a single variable. For example, we might create a histogram for cat heights:
```python
import matplotlib.pyplot as plt

heights = np.random.normal(loc=2, size=40)

plt.hist(heights)

plt.title('Cat heights', fontsize=16, color='blue')

plt.show() # type: ignore
```
<img width="551" height="448" alt="Histogram of cat heights" src="https://github.com/user-attachments/assets/e97666eb-0b9d-4dd7-b02b-45df68fc839f" />

Poll: Which type of visualization should we use to display: the number of roommates that students have (in this class)
1. Scatterplot
2. Bar graph
3. Histogram

Poll: Which type of visualization should we use to display: the relationship between students' number of roommates and average score on an assignment
1. Scatterplot
2. Bar graph
3. Histogram

Poll: Which type of visualization should we use to display: students' favorite colors
1. Scatterplot
2. Bar graph
3. Histogram

Poll: Which type of visualization should we use to display: the number of hours of sleep that students got last night
1. Scatterplot
2. Bar graph
3. Histogram

Poll: Which are true?
1. In this course, we should use `plt.show() # type: ignore` so that our data visualizations show up without triggering the MyPy error about an untyped function call.
2. In this course, we should not use `# type: ignore` anywhere in our code except on the same line as `plt.show()`.
3. `# type: ignore` makes VSCode ignore important errors that MyPy catches.
4. All of the above
