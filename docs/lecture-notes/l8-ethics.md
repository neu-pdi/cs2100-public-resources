---
sidebar_position: 8
lecture_number: 8
title: Ethics (Bias and Privacy)
---

# Ethics (Bias and Privacy)

### Throughout the VSD Process: Bias and Unfairness

Bias and unfairness are baked into our society in a way that counteracting them is a challenging, continuous task which does not end with a VSD matrix. However, there are some concrete places we can keep in mind to mitigate bias and unfairness in our technology.

Bias and unfairness can enter our technology in a variety of ways. Here are some examples:

- The technology might rely on a dataset that doesn’t accurately reflect the statistics of the population it represents. For example, a dataset of “the general population” can forget to include women.
- The tools used to collect the data might be biased. For example, a survey might include multiple-choice questions that are impossible to answer correctly.
- The technologists building the tool may misunderstand the data. For example, they might not understand the context in which the data was collected, leading to dismissing important data points or selecting the wrong variables for use.
- The technologists building the tool may make mistakes, such as using a correlation between variables to imply causation. For example, if there are many reports of fraud in September, they may assume that the start of a new academic year causes students to commit fraud.
- The technology can be used for a different purpose than the one for which it was built. For example, a platform built for vital communication in vulnerable communities can also be used to spam and harass those vulnerable people.

Bias and unfairness can be created or amplified once the technology is implemented in a particular societal context.

- Technology reflects historical injustices as they unfold and compound. For example, word representations (the numbers used by computers to represent words in a natural language such as English) reflect the bias of text on which they are trained.[^4]
- People using the technology have their own implicit biases, and technology can exacerbate the impact of those biases. Technology can also reinforce those stereotypes to those users.
- Technology can have disparate impact given the social context and features outside the model. For example, a tool that is very useful to one population may be harmful or inaccessible to another population.
- This unfairness is also compounded through feedback loops. For example, social media platforms often highlight posts which have already received a lot of positive attention, which in turn gives those posts even more positive attention, reinforcing society’s standards for which types of posts should receive positive attention.

[^4]: [Garg et. al](https://www.pnas.org/doi/pdf/10.1073/pnas.1720347115)

## Privacy

We have been using the term "privacy" throughout this lecture as one of the values in VSD.
Privacy is "the ability to determine for ourselves when, how, and to what extent information about us is communicated to others" (Westin, 1967, as summarized in DeCew 2018).
But, as [Dr. Katie Creel](https://kathleenacreel.com/) puts it, "individual privacy often appears to be in conflict with the interests of society or the state: a balance must be struck between public and private interests. For example, people describe a 'tradeoff' between privacy and national security. If privacy is _only_ understood in this way, privacy often loses."
So, decisions about privacy are often made using social models and context, to help us determine the right tradeoffs.

Here are the questions that we use throughout this course to help us make those decisions:

| Question | Answer |
| - | - |
| What type of information is shared? |  |
| Who is the subject of the information? |  |
| Who is the sender of the information? |  |
| Who are the potential recipients of the information? |  |
| What principles govern the collection and transmission of this information? |  |

## Privacy Case study: Gaggle, a messaging app for schools

Gaggle, an online platform designed for use in the classroom that seeks to replace communcation tools such as blogging software and email clients with similar software equipped with content filters, states that "Gaggle will not distribute to third parties any staff data or student data without the consent of either a parent/guardian or a qualified educational institution except in cases of Possible Student Situations (PSS), which may be reported to law enforcement."

Imagine that a student sent a message to another student at 8pm on a Saturday and Gaggle flagged it as a potential indicator that the student is depressed.

| Question | Answer |
| - | - |
| What type of information is shared? | Student data (the message, sender, recipient, timestamp, location) |
| Who is the subject of the information? | The student and their mental health concerns |
| Who is the sender of the information? | The student |
| Who are the potential recipients of the information? | The other student and Gaggle. If Gaggle alerts the parents, school administration, or law enforcement, then they will also become recipients. |
| What principles govern the collection and transmission of this information? | "Gaggle will not distribute to third parties any staff data or student data without the consent of either a parent/guardian or a qualified educational institution except in cases of Possible Student Situations (PSS), which may be reported to law enforcement." |

Often, as with our Homework assignments, the potential recipients of the information could also include unintended recipients, such as people looking over the shoulder of school administrators, or any students or teachers who notice the contacting of law enforcement.

## Your Case Study: Algorithmic hiring

Now for some practice. Consider this scenario: “Shamazon” (a fictitious company) is looking to hire software engineers, and you have been tasked with designing a tool to filter the submitted resumes and select the ideal candidates for hire.

- Who are the stakeholders?
- What are the values?
- What is in the stakeholder-value matrix?
- What are the conflicts in the matrix? And how can we mitigate them?
- Where are bias and unfairness entering the product? And how can we mitigate them?

As you can see, we are relying on you to design our future. Good luck.
