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
