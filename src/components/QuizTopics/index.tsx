import Link from '@docusaurus/Link';
import { Box } from '@chakra-ui/react';
import './styles.css';

interface TopicCoverage {
    topic: string;
    quiz1?: boolean;
    quiz2?: boolean;
    quiz3?: boolean;
    quiz4?: boolean;
    quiz5?: boolean;
}

export default function TopicsTable() {
    const topics: TopicCoverage[] = [
        { topic: "Functions and documentation", quiz1: true, quiz2: true },
        { topic: "Unit testing", quiz1: true, quiz3: true },
        { topic: "Git", quiz1: true, quiz2: true },
        { topic: "Classes: constructors, methods, and attributes", quiz2: true, quiz3: true },
        { topic: "Aliasing and equality", quiz2: true, quiz3: true },
        { topic: "Stakeholder-value matrices", quiz2: true, quiz4: true },
        { topic: "Mean and variance", quiz3: true, quiz4: true },
        { topic: "Lists, sets, and dictionaries", quiz3: true, quiz4: true },
        { topic: "Properties", quiz4: true, quiz5: true },
        { topic: "Inheritance and abstract methods", quiz4: true, quiz5: true },
        { topic: "Iterator and Comparable", quiz4: true, quiz5: true },
    ];

    return (
        <Box>
            <table className="topics-table">
                <thead>
                    <tr>
                        <th>Topic</th>
                        <th>Quiz 1</th>
                        <th>Quiz 2</th>
                        <th>Quiz 3</th>
                        <th>Quiz 4</th>
                        <th>Quiz 5</th>
                      {/*  <th>Final Exam</th> */}
                    </tr>
                </thead>
                <tbody>
                    {topics.map((row, index) => (
                        <tr key={index}>
                            <td>{row.topic}</td>
                            <td>{row.quiz1 && <span className="checkmark">✓</span>}</td>
                            <td>{row.quiz2 && <span className="checkmark">✓</span>}</td>
                            <td>{row.quiz3 && <span className="checkmark">✓</span>}</td>
                            <td>{row.quiz4 && <span className="checkmark">✓</span>}</td>
                            <td>{row.quiz5 && <span className="checkmark">✓</span>}</td>
                          {/*  <td>{row.finalExam && <span className="checkmark">✓</span>}</td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </Box>
    );
}