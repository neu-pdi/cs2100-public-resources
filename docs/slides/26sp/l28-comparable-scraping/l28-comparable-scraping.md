---
marp: true
style: @import url('https://unpkg.com/tailwindcss@^2/dist/utilities.min.css');

---

# Comparison and Scraping
## Welcome back to CS 2100!
## Prof. Rasika Bhalerao

---

# Comparison and Scraping

---

## Motivating question:

Which string is bigger: "abacus" or "cat"

Which object is bigger: a balloon, or ten nickels?

---

```python
numbers = [20, 10, 30]
print(sorted(numbers))

numbers = [Int(20), Int(10), Int(30)]
print(sorted(numbers))
```
```
[10, 20, 30]
Traceback (most recent call last):
File "/Users/rasikabhalerao/2025Fall/2100/Lectures/l25/l25.py", line 34, in <module>
print(sorted(numbers))
      ^^^^^^^^^^^^^^^
TypeError: '<' not supported between instances of 'Int' and 'Int'
```

---

## Where we're headed...

<div class="grid grid-cols-2 gap-4">
<div>

```python
class Int:
    def __init__(self, number: int) -> None:
        self.number = number

    def __repr__(self) -> str:
        return f"{self.number}"

    def __lt__(self, other: Int) -> bool:
        if not isinstance(other, Int):
            return NotImplemented
        return self.number < other.number

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Int):
            return False
        return self.number == other.number
```

</div>
<div>

```python
numbers = [
    Int(20), 
    Int(10), 
    Int(30)
]
print(sorted(numbers))
```
```
[10, 20, 30]
```

</div>
</div>


---

# Comparable protocol (and no interface)

- `__eq__(self, other: object) -> bool`: equals `==`
- `__ne__(self, other: object) -> bool`: not equals `!=`
- `__lt__(self, other: object) -> bool`: less than `<`
- `__le__(self, other: object) -> bool`: less than or equal to `<=`
- `__gt__(self, other: object) -> bool`: greater than `>`
- `__ge__(self, other: object) -> bool`: greater than or equal to `>=`

#### Don't need all six
#### Common: Implement `__eq__()` and one ordering method like `__lt__()`

---

#### Exercise: Let's write a class for a Plant. Plant are bigger if they get more sunlight.
```python
class Plant:
    def __init__(self) -> None:
        self.sunlight_hours = 0

    def get_sunlight(self) -> None:
        self.sunlight_hours += 1
    
    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Plant):
            return False
        return self.sunlight_hours == other.sunlight_hours
    
    def __lt__(self, other: object) -> bool:
        if not isinstance(other, Plant):
            return NotImplemented
        return self.sunlight_hours < other.sunlight_hours

plant1 = Plant()
plant2 = Plant()

plant1.get_sunlight()
```

---

## Poll: What goes in the ??? ?

<style scoped>
section {
  font-size: 25px;
}
</style>
```python
class Bouquet:
    """Bouquets are compared by the number of flowers in them"""
    def __init__(self, flowers: list[Flower]):
        self.flowers = flowers
    
    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Bouquet):
            return False
        return ???  
    
    def __gt__(self, other: object) -> bool:
        if not isinstance(other, Bouquet):
            return NotImplemented
        return ???        
```
1. `len(self.flowers) == len(other.flowers)` and `len(self.flowers) < len(other.flowers)`
2. `len(self.flowers) == len(other.flowers)` and `len(self.flowers) > len(other.flowers)`
3. `len(self.flowers) != len(other.flowers)` and `len(self.flowers) < len(other.flowers)`
4. `len(self.flowers) != len(other.flowers)` and `len(self.flowers) > len(other.flowers)`

---

## Poll: What does the comparison protocol do in Python?

1. It lets us define the "length" of an object (the number returned by `len()`)
2. It lets us iterate over the sub-parts of an object (using a `for` loop)
3. It lets us define what it means for an object to be "bigger" or "smaller" than another object
4. It lets us map each object to an int that is used as an index in a hash table

---

# Scraping

Let's save this webpage to our computer: https://en.wikipedia.org/wiki/Web_scraping

(Webpage, Complete)

And let's look at the downloaded HTML file in VSCode.

It contains links to more pages, which contain links to more pages... it's a tree! (Or a graph because it has cycles)

---

<style scoped>
section {
    font-size: 20px;
}
</style>

# Scraping webpages with BeautifulSoup

Instead of reading a website yourself, you can write code to download the page and extract the data you care about

```python
import requests
from bs4 import BeautifulSoup

# 1. Fetch the webpage
response = requests.get("https://example.com")

# 2. Parse the HTML
soup = BeautifulSoup(response.text, "html.parser")

# 3. Find what you want
title = soup.find("h1")
links = soup.find_all("a")

# 4. Use the data!
print(title.text)
  ▶ "Example Domain"
print(len(links), "links found")
  ▶ 3 links found
```

## Let's look at Homework 7 (Wikipedia Scraping)

<!-- ## Storing stuff in order

(You may need to `pip3.11 install sortedcontainers`)

```python
ss = SortedSet([3, 1, 4, 1, 5])
print(ss)  # SortedSet([1, 3, 4, 5])
ss.add(2)
print(ss)  # SortedSet([1, 2, 3, 4, 5])
```

```python
sm = SortedDict({2: [1, 2, 3], 1: [0, 0, 0]})
print(sm)  # SortedDict({1: [0, 0, 0], 2: [1, 2, 3]})
```

Exercise: let's create a sorted set of `Bouquet`s and iterate over it

---

## Binary Search Trees

**Binary Tree**: A tree in which each node has at most 2 children

The first and second child of a node are called the left and right child, respectively.

<br/>

**Binary Search Tree**: A binary tree in which each node's data is greater than everything in its left subtree and less than everything in its right subtree

---

<img width="992" height="668" alt="Binary search tree" src="https://github.com/user-attachments/assets/ab04f612-49de-4feb-8dc3-82560a8b70e1" />

---

## Poll: This is a Binary Search Tree. Where should the 12 go?

<img width="548" height="317" alt="Where should the 12 go" src="https://github.com/user-attachments/assets/43e13007-072e-4070-8f21-0e587ea7313c" />

1. A
2. B
3. C
4. D

--- -->

<!-- 
## Poll: Which of these are Binary Search Trees?

<img width="818" height="285" alt="Which of these are BSTs" src="https://github.com/user-attachments/assets/a649123e-0bed-4234-8dd0-37588b1eeb87" />

1. A
2. B
3. C

---

## Poll: Is this a BST?

<img width="268" height="254" alt="Is this a BST" src="https://github.com/user-attachments/assets/7f4294ec-d795-4a7b-8e8c-67b9382339a9" />

1. Yes
2. No

--- -->

<!-- ## What's a Binary Search Tree good for?

Let's say I want to check for whether the tree contains 12. How do we do that?

<img width="449" height="267" alt="What's a BST good for" src="https://github.com/user-attachments/assets/f92480ac-520d-4cba-aa8a-a63f60c0dc05" />

What about searching for 11 (with the same BST)?

---

## What's a Binary Search Tree good for?

Let's say I want to check for whether the tree contains 12. How do we do that?

<img width="449" height="267" alt="What's a BST good for" src="https://github.com/user-attachments/assets/f92480ac-520d-4cba-aa8a-a63f60c0dc05" />

What about searching for 11 (with the same BST)?

Hey, this is more efficient than searching a list!
It's not as efficient as hashing, but it does make a pretty good set.
And it's more useful if you care about the order of things.

---

`sortedcontainers.SortedSet` stores elements using a Binary Search Tree

(`pip install sortedcontainers`)

<div class="grid grid-cols-2 gap-4">
<div>

```python
ss = SortedSet([3, 1, 4, 1, 5])
print(ss)  # SortedSet([1, 3, 4, 5])
ss.add(2)
print(ss)  # SortedSet([1, 2, 3, 4, 5])
```

</div>
<div>

Corresponding `SortedDict`:
```python
sm = SortedDict({2: [1, 2, 3], 1: [0, 0, 0]})
print(sm)  # SortedDict({1: [0, 0, 0], 2: [1, 2, 3]})
```

</div>
</div>

---

| `set` | `sortedcontainers.SortedSet` |
| - | - |
| Stored as a hash table (list of lists)​<br />Index of each element is calculated using `__hash__()` | Stored as a Binary Search Tree<br />Elements must implement Comparable protocol |
| Constant time to look up / add / remove | Logarithmic time to look up / add / remove |
| Use when care more about speed than order | Use when care more about order than speed |

---

## Poll: Which are true?

1. For a `SortedDict`, it is constant time to check whether it contains a key
2. For a `SortedDict`, it is constant time to check whether it contains a value
3. `set`s can store things which don't implement the Comparable protocol
4. `set`s can store things which aren't hashable
5. When we iterate over a `set`, the elements will be increasing in size
6. When we iterate over a `SortedSet` the elements will be increasing in size -->

---

# Poll:

# 1. What is your main takeaway from today?

# 2. What would you like to revisit next time?