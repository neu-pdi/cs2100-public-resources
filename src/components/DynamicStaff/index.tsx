import { usePluginData } from '@docusaurus/useGlobalData';
import { GlobalPluginData, useDocsPreferredVersion, useActiveDocContext } from '@docusaurus/plugin-content-docs/client';
import { useMemo } from 'react';
import MDXContent from '@theme/MDXContent';

export default function DynamicStaff() {
    const pluginData = usePluginData('docusaurus-plugin-content-docs') as GlobalPluginData;
    
    // Get the preferred version (selected in dropdown) or active version
    const { preferredVersion } = useDocsPreferredVersion('default');
    const activeDocContext = useActiveDocContext('default');
    
    // Use preferred version first, then active version, then fallback to first version
    const currentVersion = preferredVersion || activeDocContext.activeVersion || pluginData.versions[0];
    
    // Determine the path based on the version
    const versionName = currentVersion.name;
    const isCurrentVersion = versionName === 'current';
    
    // Find the alphabetically latest available version folder
    const findLatestVersion = () => {
        // Try to dynamically find available version folders in src/pages
        const knownVersions = ['25fa', '26sp']; // Add known versions here
        // Sort alphabetically and return the last one
        knownVersions.sort();
        return knownVersions[knownVersions.length - 1];
    };
    
    const findAvailableVersion = (targetVersion: string) => {
        // First, try the target version with .mdx
        try {
            require.resolve(`@site/src/pages/${targetVersion}/staff.mdx`);
            return targetVersion;
        } catch (e) {
            // Try .md extension
            try {
                require.resolve(`@site/src/pages/${targetVersion}/staff.md`);
                return targetVersion;
            } catch (e2) {
                // If not found, fall back to the latest available version
                console.warn(`Version directory ${targetVersion} not found, falling back to latest available version`);
                return findLatestVersion();
            }
        }
    };
    
    const staffPath = isCurrentVersion ? findLatestVersion() : findAvailableVersion(versionName);
    
    // Load the staff content for the determined version
    const StaffContent = useMemo(() => {
        try {
            // Try .mdx first, then .md
            try {
                const content = require(`@site/src/pages/${staffPath}/staff.mdx`).default;
                return content;
            } catch (e) {
                const content = require(`@site/src/pages/${staffPath}/staff.md`).default;
                return content;
            }
        } catch (e) {
            console.error(`Could not load staff for version ${staffPath}`, e);
            return () => (
                <div>
                    <h1>Staff</h1>
                    <p>Staff content is not available for this version.</p>
                </div>
            );
        }
    }, [staffPath]);

    return (
        <MDXContent>
            <StaffContent />
        </MDXContent>
    );
}
