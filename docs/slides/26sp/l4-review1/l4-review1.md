---
marp: true
style: @import url('https://unpkg.com/tailwindcss@^2/dist/utilities.min.css');

---

# Review for Quiz 1
## Welcome back to CS 2100!
## Prof. Rasika Bhalerao

---

<style scoped>
section {
    font-size: 23px;
}
</style>

<div class="grid grid-cols-2 gap-4">
<div>

# Quiz 1 Topics

## Git
- What is a repo? What is remote / local?
- `git clone <url>` copies the remote repo to your computer
- `git add <filename>` stages the changes in the file, and `git add .` stages all changes in the directory
- `git commit -m "message"` commits the staged changes
- `git push` pushes all local commits to the remote repo
- `git pull` copies all commits from the remote repo to your local repo which are not already there

</div>
<div>

## Functions and documentation
- Documentation elements (description, arguments, returns, errors)
- Defining functions with types
- Conditionals and iteration
- `None` and `Optional`

## Unit testing
- `self.assertEqual()`, `self.assertTrue()`, and `self.assertRaises()`
- Identifying test cases

We will not ask you to test functions that print things or take user input on the exam.

</div>
</div>

---

# Git vocab

- Repository (repo): a set of code and its history
  - local: on your computer
  - remote: on another computer (like GitHub)
- Commit
  - the codebase at a given point in time (noun)
  - to add a set of changes to the repository (verb)
  - Push: to move code from a local to remote repository

---

<style scoped>
section {
    font-size: 20px;
}
</style>


# Git commands

| Location | Definition | git command to put code there | Postal analogy |
| - | - | - | - |
| working area | code that you are currently writing / saving in VSCode |  | Writing on a paper |
| staging area | code that is ready to be commited | `git add <filename>` or `git add .` | Add a stamp and put it in your backpack |
|​ local repository | code that has been committed | `git commit -m "description"` | Put all stamped cards in the mailbox |
| remote repository | code on GitHub | `git push` | Workers move cards to destinations |
| | | | |
| | copy repo from remote to local | `git clone <url>` | Buying special "letter-writing paper" |
| | copy all commits from remote to local which are not already there | `git pull` | Getting a copy of anything anyone else sent to your destination |

---

## Poll: Which command do we use to "download" a repo from GitHub to our laptop?

1. `git clone`
2. `git add`
3. `git commit`
4. `git push`
5. `git status`

---

## Poll: Which command do we use to "stage" changes to be committed?

1. `git clone`
2. `git add`
3. `git commit`
4. `git push`
5. `git status`

---

## Poll: If our local repo is ahead of the remote repo by a commit, what should we use to catch up the remote repo?

1. `git clone`
2. `git add`
3. `git commit`
4. `git push`
5. `git status`

---

# Documentation

1. Overall description of the function
2. Arguments: type and description of each argument
3. Return: type and description of what is returned
   1. Include conditions for it to return `None`
4. Errors raised: type of error and condition to raise it

---

#### Poll: What is missing from this documentation?

```python
def sarcasm(phrase: str) -> Optional[str]:
    """Returns the sarcastic version of the provided phrase, where a random 
    half of the characters are uppercase, and the others are lowercase.

    Parameters
    ----------
    phrase : str
        The phrase to turn sarcastic
    
    Returns
    -------
    str
        The sarcastic version of the phrase
    
    Raises
    ------
    ValueError: if phrase is empty

    """
    if phrase == '':
      raise ValueError()

    sarcastic_phrase = ''
    for character in phrase:
      if not character.isalpha():
        return None
      if random() < 0.5:
        sarcastic_phrase += character.upper()
      else:
        sarcastic_phrase += character.lower()
    return sarcastic_phrase
```

---

<style scoped>
section {
    font-size: 21px;
}
</style>

# Unit Testing

## `self.assertEqual()`
Two arguments: expected value, result of function call
```python
self.assertEqual(4, 2 + 2)
```

## `self.assertRaises()`
Argument: error type, Indented section: function call
```python
with self.assertRaises(ValueError):
  get_area_of_rectangle(-1, 4)
```

## `self.assertTrue()`
One argument: condition that you want to be `True`
```python
self.assertTrue(1 + 1 < 3)
```

---

## Practice Quiz 1

Practice Quiz 1: https://github.com/neu-pdi/cs2100-public-resources/tree/main/docs/quizzes/26sp/Practice%20Quiz%201.pdf

Solution to Practice Quiz 1: https://github.com/neu-pdi/cs2100-public-resources/tree/main/docs/quizzes/26sp/pq1.py

---

# Homework help: Git / command line / Pawtograder review

## Helpful reminders:

- How to test functions that take user input or print things (mock the user)
- Tests in `tests/test_*.py` should pass on *anyone's* implementation, not just yours. (Don't make the tests specific to your chosen additional questions). Tests specific to your implementation should go in `tests/impl_*.py`.
- For testing additional questions (especially generic, non-specific tests), use `dict`

---

# Poll:

# 1. What is your main takeaway from today?

# 2. What would you like to revisit next time?
