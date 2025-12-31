import { usePluginData } from '@docusaurus/useGlobalData';
import { GlobalDoc, GlobalPluginData } from '@docusaurus/plugin-content-docs/client';
import Link from '@docusaurus/Link';
import { Box } from '@chakra-ui/react';

export default function ScheduleTable({ version }: { version: string }) {
    const pluginData = usePluginData('docusaurus-plugin-content-docs') as GlobalPluginData;
    const sidebar = pluginData.versions[0];
    const docs = sidebar.docs.filter(doc => !doc.id.startsWith('l0')).map(doc => {
        let docContent;
        try {
            docContent = require(`@site/docs/lecture-notes/${doc.id}.md`);
        } catch (e) {
            // Try .mdx if .md doesn't exist
            docContent = require(`@site/docs/lecture-notes/${doc.id}.mdx`);
        }
        return {
            doc,
            docContent
        };
    });
    docs.sort((a, b) => a.doc.id.localeCompare(b.doc.id, undefined, { numeric: true, sensitivity: 'accent' }));

    // Semester start date
    const startDate = new Date("2026-01-05");

    // Last day of add/drop period
    const addDrop = new Date("2026-01-20");

    // Holidays (no class)
    const holidays = new Set([
        "2026-01-05", // Before semester
        "2026-01-19", // MLK Day
        "2026-02-16", // Presidents Day
        "2026-03-02", // Spring Break
        "2026-03-04", // Spring Break
        "2026-03-05", // Spring Break
    ]);

    // Homework assignments
    const homeworkAssignments: { date: string; title: string; link?: string }[] = [
      { date: "2026-01-21", title: "HW1: Algorithms as Decision Makers", link: "https://github.com/neu-cs2100/sp26-handout-hw1" },
      { date: "2026-02-04", title: "HW2: 311 Service Request Data Loader", link: "https://github.com/neu-cs2100/sp26-handout-hw2" },
      { date: "2026-02-18", title: "HW3: 311 Service Request Sorting and Analysis", link: "https://github.com/neu-cs2100/sp26-handout-hw3" },
      { date: "2026-02-25", title: "HW4: News API", link: "https://github.com/neu-cs2100/sp26-handout-hw4" },
      { date: "2026-03-11", title: "HW5: Fingerprint login", link: "https://github.com/neu-cs2100/sp26-handout-hw5" },
      { date: "2026-03-18", title: "HW6: FeedCurator", link: "https://github.com/neu-cs2100/sp26-handout-hw6" },
      { date: "2026-03-25", title: "HW7: BiasBars", link: "https://github.com/neu-cs2100/sp26-handout-hw7" },
      { date: "2026-04-01", title: "HW8: Wikipedia Parser", link: "https://github.com/neu-cs2100/sp26-handout-hw8" },
      { date: "2026-04-15", title: "HW9: Public Transportation Map", link: "https://github.com/neu-cs2100/sp26-handout-hw9" },
    ];

    const formatDate = (date: Date): string => {
        const month = date.toLocaleDateString("en-US", { month: "short", timeZone: "UTC" });
        const day = date.getUTCDate();
        return `${month} ${day}`;
    };

    const formatLongDate = (date: Date): string => {
        return date.toLocaleDateString("en-US", { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            timeZone: 'UTC'
        });
    };

    const dateToString = (date: Date): string => {
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, "0");
        const day = String(date.getUTCDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    const isHoliday = (date: Date): boolean => {
        return holidays.has(dateToString(date));
    };

    const getHomeworkForDate = (date: Date): typeof homeworkAssignments[0] | null => {
        const dateStr = dateToString(date);
        return homeworkAssignments.find(hw => hw.date === dateStr) || null;
    };

    const shouldShowAddDropBlurb = (date: Date, allDates: Date[]): boolean => {
        // Show blurb on the last class date before add/drop deadline (including holidays)
        const beforeAddDrop = allDates.filter(d => d < addDrop);
        if (beforeAddDrop.length === 0) return false;
        const closestDate = beforeAddDrop[beforeAddDrop.length - 1];
        return dateToString(date) === dateToString(closestDate);
    };

    const extractTopics = (docContent: any): string[] => {
        // Debug: log what's available in docContent
        console.log('docContent keys:', Object.keys(docContent || {}));
        
        // Try to get topics from metadata if available
        if (docContent?.metadata?.headings) {
            return docContent.metadata.headings
                .filter((h: any) => h.level === 2)
                .map((h: any) => h.value);
        }
        // Fallback: try to extract from contentTitle or other fields
        if (docContent?.metadata?.toc) {
            return docContent.metadata.toc
                .filter((item: any) => item.level === 2)
                .map((item: any) => item.value);
        }
        // Try toc at root level
        if (docContent?.toc) {
            return docContent.toc
                .filter((item: any) => item.level === 2)
                .map((item: any) => item.value);
        }
        return [];
    };

    const slugify = (text: string): string => {
        return text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    };

    // Generate all class dates (Mon, Wed, Thu)
    const generateClassDates = () => {
        const dates: Date[] = [];
        const lectureCount = docs.length;
        
        let currentDate = new Date(startDate);
        let addedDates = 0;

        // Generate enough dates to cover all lectures plus holidays
        while (addedDates < lectureCount + holidays.size) {
            const dayOfWeek = currentDate.getUTCDay();
            
            // Check if it's Mon (1), Wed (3), or Thu (4)
            if (dayOfWeek === 1 || dayOfWeek === 3 || dayOfWeek === 4) {
                dates.push(new Date(currentDate));
                addedDates++;
            }
            
            // Move to next day
            currentDate.setUTCDate(currentDate.getUTCDate() + 1);
        }
        
        return dates;
    };

    // Generate schedule by week
    const generateSchedule = () => {
        const classDates = generateClassDates();
        const weeks: { week: number; days: { date: Date; doc: typeof docs[0] | null }[] }[] = [];
        
        let currentWeek = 1;
        let weekDays: { date: Date; doc: typeof docs[0] | null }[] = [];
        let docIndex = 0;

        classDates.forEach((date, index) => {
            const doc = isHoliday(date) ? null : docs[docIndex];
            if (!isHoliday(date)) {
                docIndex++;
            }

            weekDays.push({ date, doc });

            // Check if we need to start a new week (after Thursday)
            const dayOfWeek = date.getUTCDay();
            if (dayOfWeek === 4) {
                weeks.push({ week: currentWeek, days: [...weekDays] });
                weekDays = [];
                currentWeek++;
            }
            
            // Handle last week if it doesn't end on Thursday
            if (index === classDates.length - 1 && weekDays.length > 0) {
                weeks.push({ week: currentWeek, days: [...weekDays] });
            }
            
            // Stop if we've assigned all lectures
            if (docIndex >= docs.length) {
                return;
            }
        });

        return weeks;
    };

    const schedule = generateSchedule();
    const allClassDates = schedule.flatMap(week => week.days.map(day => day.date));

    return (
        <Box style={{ overflow: 'visible' }}>
            <style>{`
                .schedule-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 100px;
                    overflow: visible;
                }
                .schedule-table th,
                .schedule-table td {
                    border: 1px solid #ddd;
                    padding: 8px;
                    text-align: left;
                    vertical-align: top;
                    overflow: visible;
                    position: relative;
                }
                .schedule-table td {
                    height: 200px;
                }
                .schedule-table th {
                    font-weight: bold;
                    height: auto;
                }
                .date-text {
                    font-size: 0.85em;
                    color: #666;
                    display: block;
                }
                .holiday {
                    background-color: #cccccc;
                    font-style: italic;
                }
                [data-theme='dark'] .holiday {
                    background-color: #333333;
                }
                .homework-blurb {
                    margin-top: 12px;
                    padding: 8px 10px;
                    background-color: #d6ebff;
                    border: 1px solid #4682b4;
                    border-radius: 6px;
                    font-size: 0.9em;
                    position: relative;
                    z-index: 1;
                    min-height: 110px;
                }
                [data-theme='dark'] .homework-blurb {
                    background-color: #1a2332;
                    border-color: #5b9bd5;
                }
                .adddrop-blurb {
                    margin-top: 12px;
                    padding: 8px 10px;
                    background-color: #ffc0cb;
                    border: 1px solid #ff69b4;
                    border-radius: 6px;
                    font-size: 0.9em;
                }
                [data-theme='dark'] .adddrop-blurb {
                    background-color: #4d1f2e;
                    border-color: #ff69b4;
                }
                .homework-warning {
                    margin-top: 8px;
                    font-size: 0.7em;
                    color: #666;
                    line-height: 1.3;
                    transition: color 0.2s ease;
                }
                .homework-blurb:hover .homework-warning {
                    color: #d32f2f;
                }
                [data-theme='dark'] .homework-warning {
                    color: #aaa;
                }
                .lecture-wrapper {
                    position: relative;
                    display: inline-block;
                }
                .topics-tooltip {
                    visibility: hidden;
                    position: absolute;
                    z-index: 1000;
                    background-color: #2c3e50;
                    color: #fff;
                    padding: 10px 12px;
                    border-radius: 6px;
                    font-size: 0.85em;
                    line-height: 1.6;
                    white-space: nowrap;
                    bottom: 125%;
                    left: 50%;
                    transform: translateX(-50%);
                    opacity: 0;
                    transition: opacity 0.2s, visibility 0.2s;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                }
                .topics-tooltip::after {
                    content: "";
                    position: absolute;
                    top: 100%;
                    left: 50%;
                    margin-left: -5px;
                    border-width: 5px;
                    border-style: solid;
                    border-color: #2c3e50 transparent transparent transparent;
                }
                .lecture-wrapper:hover .topics-tooltip,
                .topics-tooltip:hover {
                    visibility: visible;
                    opacity: 1;
                }
                .topics-list {
                    text-align: left;
                    margin: 0;
                    padding-left: 0;
                    list-style: none;
                }
                .topics-list li {
                    margin: 4px 0;
                }
                .topics-list li::before {
                    content: "• ";
                    margin-right: 6px;
                }
                .topics-list a {
                    color: #fff;
                    text-decoration: none;
                }
                .topics-list a:hover {
                    text-decoration: underline;
                    color: #66b3ff;
                }
                .quiz-badge {
                    display: inline-block;
                    padding: 4px 10px;
                    background-color: #fff3cd;
                    border: 2px solid #ffc107;
                    border-radius: 8px;
                    font-weight: bold;
                }
                [data-theme='dark'] .quiz-badge {
                    background-color: #3d3200;
                    border-color: #ffc107;
                }
                .schedule-table thead,
                .schedule-table tbody,
                .schedule-table tr {
                    overflow: visible;
                }
            `}</style>
            
            <table className="schedule-table">
                <thead>
                    <tr>
                        <th>Week</th>
                        <th>Monday</th>
                        <th>Wednesday</th>
                        <th>Thursday</th>
                    </tr>
                </thead>
                <tbody>
                    {schedule.map((week) => {
                        return (
                            <tr key={week.week}>
                                <td>{week.week}</td>
                                {week.days.map((day, index) => {
                                    const isHol = isHoliday(day.date);
                                    const homework = getHomeworkForDate(day.date);
                                    const showAddDrop = shouldShowAddDropBlurb(day.date, allClassDates);
                                    return (
                                        <td key={index} className={isHol ? "holiday" : ""}>
                                            <span className="date-text">{formatDate(day.date)}</span>
                                            {isHol ? (
                                                "(No class)"
                                            ) : day.doc ? (
                                                <div className="lecture-wrapper">
                                                    <Link to={day.doc.doc.path}>
                                                        {(() => {
                                                            const title = day.doc.docContent.frontMatter?.title || '';
                                                            const lowerTitle = title.toLowerCase();
                                                            const isQuiz = lowerTitle.includes('quiz') && !lowerTitle.includes('review');
                                                            if (isQuiz) {
                                                                return <span className="quiz-badge">{title}</span>;
                                                            }
                                                            return `Lecture ${day.doc.docContent.frontMatter?.lecture_number}: ${title}`;
                                                        })()}
                                                    </Link>
                                                    {(() => {
                                                        const topics = extractTopics(day.doc.docContent);
                                                        if (topics.length > 0) {
                                                            return (
                                                                <div className="topics-tooltip">
                                                                    <ul className="topics-list">
                                                                        {topics.map((topic, i) => (
                                                                            <li key={i}>
                                                                                <Link to={`${day.doc.doc.path}#${slugify(topic)}`}>
                                                                                    {topic}
                                                                                </Link>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            );
                                                        }
                                                        return null;
                                                    })()}
                                                </div>
                                            ) : (
                                                "TBA"
                                            )}
                                            {homework && (
                                                <div className="homework-blurb">
                                                    <strong>📚 Due: </strong>
                                                    {homework.link ? (
                                                        <Link to={homework.link}>{homework.title}</Link>
                                                    ) : (
                                                        homework.title
                                                    )}
                                                    <div className="homework-warning">
                                                        This repository is for viewing only. Do not work on the assignment using this repository -- the actual course assignments will be provided to you via Pawtograder.
                                                    </div>
                                                </div>
                                            )}
                                            {showAddDrop && (
                                                <div className="adddrop-blurb">
                                                    <strong>Last day of add/drop period: </strong>
                                                    {formatLongDate(addDrop)}
                                                </div>
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                    <tr>
                        <td>16</td>
                        <td colSpan={3}>Final Exam (date/time TBD)</td>
                    </tr>
                </tbody>
            </table>
        </Box>
    );
}