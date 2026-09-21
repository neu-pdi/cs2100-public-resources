---
marp: true
style: @import url('https://unpkg.com/tailwindcss@^2/dist/utilities.min.css');

---

# Quiz 1 Debrief and Ethics
## Welcome back to CS 2100!
## Prof. Rasika Bhalerao

---

## Recall: Steps to demonstrate Value-Sensitive Design in assignments

1. **Identify the stakeholders**: identify people who are affected by the software in any way
2. **Identify the values**: identify the values at stake for those stakeholders when considering the software
3. **Fill out a stakeholder-value matrix**: create a table, where the columns are the values, and the rows are the stakeholders, and write in how each stakeholder's value relates to the software
4. **Identify and analyze conflicts in the matrix**: for each conflict in the matrix, identify whether and how to address it

---

## Bias and Unfairness (throughout the process)

- We will not solve society's issues with a VSD matrix
  - That's a more challenging and continuous process
- But we can mitigate bias and unfairness in our technology

---

## How bias and unfairness enter our technology

- Tech relies on dataset that doesn’t reflect stats of the population it represents
  - E.g. dataset of "the general population" includes zero women
- Tools used to collect data are biased
  - E.g. survey has multiple-choice questions that are impossible to answer correctly
- Technologists misunderstand the data
  - E.g. they don't understand the context in which the data was collected -> dismiss important data points / select the wrong variables
- Technologists make mistakes
  - E.g. many reports of fraud in September -> technologists assume the start of an academic year causes students to commit fraud
- Tech is used for a different purpose than the one for which it was built
  - E.g. platform for communication in vulnerable communities is used to harass them

---

## Bias and unfairness can be created or amplified once the technology is implemented in a particular societal context.

- Tech reflects historical injustices as they unfold and compound
  - E.g. word representations reflect the bias of text on which they are trained
- Users have implicit biases, and tech exacerbates the impact of those biases
  - E.g. it reinforces stereotypes
- Tech has disparate impact given the social context and features outside the model
  - E.g. a tool that is very useful to one population may be harmful or inaccessible to another population
- Unfairness is compounded through feedback loops
  - E.g. social media highlights posts which have already received attention

---

# Privacy

Privacy is
> the ability to determine for ourselves when, how, and to what extent information about us is communicated to others

(Westin, 1967, as summarized in DeCew 2018)

But,
> individual privacy often appears to be in conflict with the interests of society or the state: a balance must be struck between public and private interests. For example, people describe a 'tradeoff' between privacy and national security. If privacy is _only_ understood in this way, privacy often loses.

([Dr. Katie Creel](https://kathleenacreel.com/))

---

# Privacy

So...
- We make decisions about privacy using social models and context
- Help us determine the right tradeoffs

---

# Privacy

Here are the questions that we use throughout this course to help us make those decisions:

| Question | Answer |
| - | - |
| What type of information is shared? |  |
| Who is the subject of the information? |  |
| Who is the sender of the information? |  |
| Who are the potential recipients of the information? |  |
| What principles govern the collection and transmission of this information? |  |

---

## Privacy Case study: Gaggle, a messaging app for schools

Gaggle, an online platform designed for use in the classroom that seeks to replace communcation tools such as blogging software and email clients with similar software equipped with content filters, states that "Gaggle will not distribute to third parties any staff data or student data without the consent of either a parent/guardian or a qualified educational institution except in cases of Possible Student Situations (PSS), which may be reported to law enforcement."

Imagine that a student sent a message to another student at 8pm on a Saturday and Gaggle flagged it as a potential indicator that the student is depressed.

---

## Privacy Case study: Gaggle, a messaging app for schools

<div class="grid grid-cols-2 gap-4">
<div>

# What type of information is shared?

## Student data (the message, sender, recipient, timestamp, location)

</div>
<div>

# Who is the subject of the information?

## The student and their mental health concerns

</div>
</div>

---

## Privacy Case study: Gaggle, a messaging app for schools

<div class="grid grid-cols-2 gap-4">
<div>

# Who is the sender of the information?

## The student

</div>
<div>

# Who are the potential recipients of the information?

### The other student and Gaggle. If Gaggle alerts the parents, school administration, or law enforcement, then they will also become recipients.

</div>
</div>

Potential recipients of the information include unintended recipients, such as people looking over the shoulder of school administrators, or any students or teachers who notice the contacting of law enforcement.

---


# What principles govern the collection and transmission of this information?

## "Gaggle will not distribute to third parties any staff data or student data without the consent of either a parent/guardian or a qualified educational institution except in cases of Possible Student Situations (PSS), which may be reported to law enforcement."

---

## Polls: Your Case Study: Algorithmic hiring

“Shamazon” (a fictitious company) is looking to hire software engineers, and you have been tasked with designing a tool to filter the submitted resumes and select the ideal candidates for hire.

| Question | Answer |
| - | - |
| What type of information is shared? |  |
| Who is the subject of the information? |  |
| Who is the sender of the information? |  |
| Who are the potential recipients of the information? |  |
| What principles govern the collection and transmission of this information? |  |

---

# Poll:

# 1. What is your main takeaway from today?

# 2. What would you like to revisit next time?