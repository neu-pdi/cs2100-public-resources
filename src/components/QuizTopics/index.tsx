import Link from '@docusaurus/Link';
import { Box } from '@chakra-ui/react';
import './styles.css';

interface TopicCoverage {
    topic: string;
    quiz1?: boolean;
    quiz2?: boolean;
    quiz3?: boolean;
    quiz4?: boolean;
    finalExam?: boolean;
}

export default function TopicsTable() {
    const topics: TopicCoverage[] = [
        { topic: "Functions and documentation", quiz1: true, quiz2: true },
        { topic: "Unit testing", quiz1: true, quiz3: true },
        { topic: "Git", quiz1: true, quiz2: true },
        { topic: "Classes: constructors, methods, and attributes", quiz2: true, finalExam: true },
        { topic: "Using objects", quiz2: true, quiz4: true },
        { topic: "Stakeholder-value matrices", quiz2: true, quiz4: true },
        { topic: "Lists, sets, and dictionaries", quiz2: true, finalExam: true },
        { topic: "Correlation", quiz2: true, quiz4: true },
        { topic: "Properties", quiz3: true, finalExam: true },
        { topic: "Abstract methods", quiz3: true, finalExam: true },
        { topic: "Inheritance", quiz3: true, finalExam: true },
        { topic: "UML diagrams", quiz3: true, finalExam: true },
        { topic: "Privacy", quiz3: true, finalExam: true },
        { topic: "Static", quiz3: true, finalExam: true },
        { topic: "Coupling / cohesion / encapsulation", quiz4: true, finalExam: true },
        { topic: "Iterator", quiz4: true, finalExam: true },
        { topic: "Comparable", quiz4: true, finalExam: true },
        { topic: "Decorator / Strategy / Observer / Data Pull", quiz4: true, finalExam: true },
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
                        <th>Final Exam</th>
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
                            <td>{row.finalExam && <span className="checkmark">✓</span>}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Box>
    );
}