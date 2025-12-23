---
marp: true
style: @import url('https://unpkg.com/tailwindcss@^2/dist/utilities.min.css');

---

# Trees
## Welcome back to CS 2100!
## Prof. Rasika Bhalerao

---

## Poll: What's wrong with this recursive function?

```python
def find_max(nums: list[int], index: int = 0) -> int:
    """Returns the maximum of the numbers in nums, starting from the given index"""
    if index == len(nums) - 1:
        return nums[index]
    else:
        max_of_rest: int = find_max(nums, index)
        if nums[index] < max_of_rest:
            return max_of_rest
        else:
            return nums[index]
```
1. It's missing a base case
2. It's missing a recursive case
3. The recursive case doesn't progress towards the base case
4. It has an "off-by-one bug"

---

## Poll: What's wrong with this recursive function?

```python
def countdown(n: int) -> None:
    """Prints numbers from n down to 0, one on each line"""
    if n > 0:
        print(n)
        countdown(n - 1)
```
1. It's missing a base case
2. It's missing a recursive case
3. The recursive case doesn't progress towards the base case
4. It has an "off-by-one bug"

---

![Explore1](https://github.com/user-attachments/assets/3e23ac26-ed8e-44f0-b2ae-fd14c0918171)

---

![Explore2](https://github.com/user-attachments/assets/7ddba700-9257-4594-97e9-4e8f7c4cafa7)

---

![Explore3](https://github.com/user-attachments/assets/8c4dfdbc-04ed-45b0-ab2f-08ef49dbf367)

---

## You may have seen trees like this decision tree:

<img width="680" height="391" alt="Major decision tree" src="https://github.com/user-attachments/assets/e9606628-aa61-4d8e-8fd5-7f28d38c0738" />

---

## Some tree terminology / rules

- Each _node_ may have data
- There is a _root_ node (the start)
- Each node points to any number of _child_ nodes
- Cycles are not permitted
- There are any number of _leaf_ nodes (node with no children)

---

<img width="640" height="336" alt="Binary tree" src="https://github.com/user-attachments/assets/71392c71-7bc2-429d-8473-443149489779" />

Source: [Reddit](https://www.reddit.com/r/ProgrammerHumor/comments/1pdvb8/and_here_we_can_see_a_complete_binary_tree_in_its/)

Note: In computer science, we draw our trees with the root at the top and the leaves at the bottom.


---

## Poll: Is this a tree?

<img width="350" height="263" alt="Donut decisions" src="https://github.com/user-attachments/assets/8969d2dc-63a1-4769-842f-ccc7ddc3cb6c" />

Source: https://www.canva.com/graphs/decision-trees/
1. Yes
2. No

---

<div class="grid grid-cols-2 gap-4">
<div>

<img width="677" height="641" alt="Solar panel decisions" src="https://github.com/user-attachments/assets/e860de90-71cf-4d60-86a6-cedc1c136d28" />

</div>
<div>

Source: https://xkcd.com/1924/

## Poll: Is this a tree?

1. Yes
2. No

</div>
</div>

---

## Poll: Which of these are trees?

<img width="778" height="353" alt="Trees" src="https://github.com/user-attachments/assets/fca0b102-a230-4495-b41e-7af9aefb9b28" />

1. A
2. B
3. C
4. D

---

## Poll: Which of these are trees? (B and B' are equivalent.)

<img width="778" height="410" alt="Trees" src="https://github.com/user-attachments/assets/a4171635-c164-4f1b-b98a-3454a95214c6" />

1. A
2. B and B'
3. C

---

<div class="grid grid-cols-2 gap-4">
<div>

```python
T = TypeVar('T')

class Node(Generic[T]):
    def __init__(self, data: T):
        self.data = data
        self.left: Optional[Node[T]] = None
        self.right: Optional[Node[T]] = None
    
    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Node):
            raise NotImplementedError
        return self.data.__eq__(other.data)
    
    def __str__(self) -> str:
        value: str = f'{self.data}'
        if self.left is not None:
            value += f' {self.left}'
        else:
            value += '  *'
        if self.right is not None:
            value += f' {self.right}'
        else:
            value += '  *'
        return f'({value})'
```

</div>
<div>

```python    
class Tree(Generic[T]):
    def __init__(
            self,
            root_data: Optional[T] = None
    ) -> None:
        if root_data is None:
            self.root: Optional[Node[T]] = None
        else:
            self.root = Node[T](root_data)
    
    def __str__(self) -> str:
        return self.root.__str__()

tree: Tree[str] = Tree[str]('Entry way')

assert tree.root is not None
tree.root.left = Node[str]('Living room')

tree.root.left.right = Node[str]('Kitchen')

print(tree)
```
```
(Entry way (Living room  * (Kitchen  *  *))  *)
```

</div>
</div>

---

```
(Entry way (Living room  * (Kitchen  *  *))  *)
```

Split that printed output into multiple lines:

```
(Entry way
           (Living room
                        *
                        (Kitchen  *  *))
           *
)
```

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

---

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

---

## What's a Binary Search Tree good for?

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
6. When we iterate over a `SortedSet` the elements will be increasing in size

---

Let's use recursion to search for an element in a `Tree`:

```python
class Tree(Generic[T]):
    def __init__(self, root_data: Optional[T] = None) -> None:
        if root_data is None:
            self.root: Optional[Node[T]] = None
        else:
            self.root = Node[T](root_data)
    
    def __str__(self) -> str:
        return self.root.__str__()
    
    def __contains__(self, item: T) -> bool:
        return self.contains(item, self.root)
    
    def contains(self, item: T, node: Optional[Node[T]]) -> bool:
        if node is None:
            return False
        elif node.data == item:
            return True
        else:
            return self.contains(item, node.left) or self.contains(item, node.right)

tree: Tree[str] = Tree[str]('Entry way')

assert tree.root is not None
tree.root.left = Node[str]('Living room')

tree.root.left.right = Node[str]('Kitchen')

print('Kitchen' in tree)  # True
print('Bathroom' in tree)  # False
```

---

![Slide13](https://github.com/user-attachments/assets/6a627c0f-867f-45b6-8afa-3d20b67d9ff8)

---

![Slide14](https://github.com/user-attachments/assets/c70db772-73be-42b2-aa90-ee6a5225ba84)

---

![Slide15](https://github.com/user-attachments/assets/5b3fe703-eb21-472f-92f4-a2bba567d815)

---

![Slide16](https://github.com/user-attachments/assets/c55f2f3d-c335-424f-9054-202d244c7313)

---

![Slide17](https://github.com/user-attachments/assets/6e7a9ff3-b044-4197-b577-bad02df80d76)

---

![Slide18](https://github.com/user-attachments/assets/b52ca5ca-0efc-4f27-a2bf-a92d4b6690f8)

---

![Slide19](https://github.com/user-attachments/assets/4c29b0dd-9f43-4899-b287-55fa0892bb5e)

---

![Slide20](https://github.com/user-attachments/assets/9e9782bc-ae40-4c16-9a41-465dcc11ba88)

---

![Slide21](https://github.com/user-attachments/assets/a3ca4d23-3296-4eb3-b5ad-e6bb87d89050)

---

![Slide22](https://github.com/user-attachments/assets/b7f77aeb-8e8a-463d-a85c-fc517a73e03c)

---

![Slide23](https://github.com/user-attachments/assets/a56e13a7-e7e6-44a8-8a77-9eb471b97359)

---

![Slide24](https://github.com/user-attachments/assets/06e27194-206f-4c4e-9549-b88fa98bbd48)

---

![Slide25](https://github.com/user-attachments/assets/89856963-8d71-4580-8b5b-d53811316fe4)

---

![Slide26](https://github.com/user-attachments/assets/cb218201-9c0b-488d-9063-e69c0c64de54)

---

![Slide27](https://github.com/user-attachments/assets/5f1cbec5-0e43-4bea-abe1-ed496bfd47ce)

---

![Slide28](https://github.com/user-attachments/assets/a0bf8c01-b0a0-4fe2-a7cc-9a9d167880a8)

---

![Slide29](https://github.com/user-attachments/assets/f03cc2cc-bba6-47a8-ba61-f704b733d981)

---

![Slide30](https://github.com/user-attachments/assets/2bc2ec91-b7e1-44c0-9387-f5757b3fab28)

---

# That recursive backtracking algorithm is called **Depth-First Search**, since it explores "deep" in one area before moving on to other unexplored "shallow" places (closer to the root).


---

## Poll: This is pseudocode for a Depth-First Search on a graph that is not a tree (because it has cycles). What's a good base case?

```
DFS(node):
    Base case:
        ???
    Recursive case:
        For each child:
            Add child to explored nodes
            DFS(child)
```
1. If the node is in the set of explored nodes, do nothing
2. If the node is a leaf, add it to the set of explored nodes
3. If the node is `None`, do nothing
4. If the node is `None`, add it to the set of explored nodes

---

# Poll:

# 1. What is your main takeaway from today?

# 2. What would you like to revisit next time?