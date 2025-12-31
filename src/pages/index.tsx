import Layout from '@theme/Layout';

import { GlobalPluginData } from '@docusaurus/plugin-content-docs/client';
import { usePluginData } from '@docusaurus/useGlobalData';
import LectureSummary from '../components/LectureSummary';
import ScheduleTable from '../components/ScheduleTable';
import { Alert, Box, Heading, Text } from '@chakra-ui/react';
import { Blockquote } from "@chakra-ui/react"
import { Highlight } from 'prism-react-renderer';
import { LuConstruction } from 'react-icons/lu';

export default function Hello() {
    const pluginData = usePluginData('docusaurus-plugin-content-docs') as GlobalPluginData;
    return (
        <Layout title="Course Overview" description="CS 2100 Course Overview">
            <Box p={4}>
                <Heading size='xl'>CS 2100: Program Design and Implementation I</Heading>
                <Blockquote.Root>
                    <Blockquote.Content>
                        Builds on prior introductory programming experience (from inside or outside Northeastern University) to examine the fundamentals of program design and implementation. Studies design of data- and object-oriented programs including common patterns; use of data structures; and underlying principles such as abstraction, encapsulation, inheritance, and interfaces. Introduces common software engineering practices such as unit tests, version control, development environments, and good programming habits. Students practice using these design principles by writing medium-sized applications and using data science libraries. Covers skills needed to identify and respond to ethical challenges that arise in the program design process.
                    </Blockquote.Content>
                </Blockquote.Root>
                <Alert.Root status='warning'>
                    <Alert.Indicator>
                        <LuConstruction />
                    </Alert.Indicator>
                    <Alert.Title>Draft Content</Alert.Title>
                    <Alert.Content>
                        <Alert.Description>
                            This content is a work in progress.
                        </Alert.Description>
                    </Alert.Content>
                </Alert.Root>
                <Heading size='lg'>Schedule</Heading>
                <ScheduleTable version={pluginData.versions[0].name} />
                <Heading size='lg'>Lectures</Heading>
                <LectureSummary version={pluginData.versions[0].name} />
            </Box>
        </Layout>
    );
}
