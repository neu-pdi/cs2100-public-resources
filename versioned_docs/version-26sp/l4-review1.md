---
sidebar_position: 4
lecture_number: 4
title: Review for Quiz 1
---

# Review for Quiz 1

## Functions and documentation

It is recommended to review these topics:
- Documentation elements (description, arguments, returns, errors)
- Defining functions with types
- Conditionals and iteration
- `None` and `Optional`

## Unit testing

It is recommended to review these topics:
- `self.assertEqual()`, `self.assertTrue()`, and `self.assertRaises()`
- Identifying test cases

We will not ask you to test functions that print things or take user input on the exam.

## Git

It is recommended to review these topics:
- What is a repo? What is remote / local?
- `git clone <url>` copies the remote repo to your computer
- `git add <filename>` stages the changes in the file, and `git add .` stages all changes in the directory
- `git commit -m "message"` commits the staged changes
- `git push` pushes all local commits to the remote repo
- `git pull` copies all commits from the remote repo to your local repo which are not already there

## Homework help: Git / command line / Pawtograder review

Recommended: Instructor goes to Pawtograder > HW1 > Test Assignment and "starts" the assignment like a student.

Helpful reminders:
- How to test functions that take user input or print things (mock the user)
- Tests in `tests/test_*.py` should pass on *anyone's* implementation, not just yours. (Don't make the tests specific to your chosen additional questions). Tests specific to your implementation should go in `tests/impl_*.py`.
- For testing additional questions (especially generic, non-specific tests), use `dict`
