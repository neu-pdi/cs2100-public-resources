---
sidebar_position: 33
lecture_number: 33
title: The Model-View-Controller Paradigm
---

# The Model-View-Controller Paradigm

## Separating concerns between the Model, View, and Controller

Our programs are getting large and complicated. We like to organize our code by separating it into "categories."

The Model

- The Model should contain all classes related to the functionality of a program. Most classes that we have written so far this semester belong in the Model category.
- The Model should not care about what functionality is needed when
- The Model should not depend on the controller calling its methods in a certain order
- The Model should not care when / how results are shown to user

The View

- Displays results to user
- Should not care how results were calculated
- Should not directly respond to user actions

The Controller

- The Controller takes user inputs
- The Controller tells the model what to do, tells view what info to display
- The Controller should not care how the model implemented the functionality
- The Controller should not care how results are displayed
- The Controller is the only one that can talk to the model and view (Model and view cannot directly talk to each other)

Images

Examples

## Designing the Model

Tic Tac Toe model
