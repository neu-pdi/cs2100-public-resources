---
sidebar_position: 36
lecture_number: 36
title: Coding with AI
---

# Coding with AI

## Brief intro to generative AI

https://docs.google.com/presentation/d/1Z5f5ntyQ6xhSC160Go66ej8Kkh3UmkheGyYoOfZRk2k/edit?usp=sharing

The rest of this lecture is summarized from research literature, blogs, and personal accounts.

Some papers:

- https://scholarspace.manoa.hawaii.edu/items/d961b643-a1d6-4c57-80f4-2b2e86a8c134
- https://dl.acm.org/doi/10.1145/3696630.3730566
- https://ui.adsabs.harvard.edu/abs/2024arXiv240512195V/abstract

## Where do programmers code with AI?

- The web interface is good for generating a whole thing from start to finish
  - Less interactive experience
- IDE with inline suggestions (extreme auto-complete) and chat interface is good for small parts of a large thing
  - More interactive experience
- Claude Code is a command-line tool that runs from the terminal and executes multi-step tasks
  - Can range from very interactive to completely autnomous

## Common concerns

- Concerns about over-reliance (self-reported by students)
- Hallucinations and incorrect information
- Security flaws
- Outdated information
- Access inequality (paid vs. free versions)
- Reduced deep comprehension for complex tasks
- Some studies show AI slowa down developers (https://arxiv.org/pdf/2507.09089)


## Each task in the PDI process can use AI in some way:

<img width="950" height="432" alt="Systematic Software Design Process" src="https://github.com/user-attachments/assets/cbf24fe1-86a0-46b7-944c-37bc88dc9041" />

### AI can help us do these efficiently, but it cannot replace human creativity and understanding of the codebase.

## [Research shows this is the standard workflow with AI that software developers are trending towards:](https://arxiv.org/abs/2506.00202)

1. **Identify** what domain-related information the AI needs
2. **Engage** with the AI through prompts that state the need as a structured request with specific information, context, the problem statement, and desired outcomes
3. **Evaluate** the AI output against domain knowledge, expected results, and other success criteria
   1. Often run and observe in a sandbox
4. **Calibrate** by providing the AI with feedback and additional context
5. **Tweak** the AI-generated artifacts to better fit standards
6. **Finalize** and write documentation including decisions and rationale

This workflow can be used for any of the tasks in the PDI process.

## Why we discourage "vibe coding" in the PDI sequence:

- "Vibe coding" is where you only evaluate the *execution* of the AI-generated code, and not the code itself
- Vibe coding leads to "productivity collapse"
- When we write code, we learn about how our codebase works (and about how to write better code)
- If we don't understand our own code, it's very hard to troubleshoot, give the right feedback to the AI, add to the codebase, etc.
- So we have the AI write its own brittle fixes
- This tends to spiral into branching dependencies where nobody understands how it works


## Common uses for the web interface

- Learning new syntax (for example, when using a new package)
- Explaining error messages to help debug
- Generating code
  - Generate initial code for a starting point, which you refine there or in an IDE
- Reviewing code
  - Find bugs we might have missed
  - Think of test cases we didn't consider
  - Make things more efficient / easier to read
- Translating between programming languages

## Common uses for Cursor / Windsurf / Github Copilot IDE plugin

- Generate boilerplace code quickly (class with constructor, test class with setup, `if __name__ == '__main__'`, etc)
  - Especially if you already have examples using of how you prefer it in your codebase
- Figure out bugs that require understanding interaction between multiple files (using the IDE's chat feature)
- Make modifications that require modifying parts of multiple files
  - Context is any files you have open in the editor
- Suggest commands that you can choose to run in the IDE's built-in terminal

## Common uses for Claude Code in the terminal

- Autonomously run commands in the terminal (installing stuff, running tests)
- Do multiple things at once (e.g., run commands and write code)
- Automate repetitive coding tasks
- Do Git stuff (commits, PRs, etc.)
- Refactor code accross entire codebases
- Write code that requires understanding dependencies / how many files interact
- Automate entire workflows like test-driven development
- Work for hours without human interaction (this scares Rasika but it is a common use)
- Split tasks and delegate specialized tasks to sub-agents
- Can run as a script in headless mode (no need for a terminal)

Note: There's also a Claude Code VSCode extension (beta) that provides a graphical interface for Claude Code within VSCode, offering a middle ground with inline diff previews and one-click rollback while maintaining Claude Code's agentic capabilities.
