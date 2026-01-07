import React from 'react';

interface StaffTableProps {
  staffDataPath: string;
}

export default function StaffTable({ staffDataPath }: StaffTableProps) {
  // Dynamically import all images from the staff_data directory
  const staffImages = React.useMemo(() => {
    try {
      // Get all files from the directory
      const context = require.context('@site/src/pages/', true, /\/staff_data\/.*\.(jpg|jpeg|png)$/);
      
      // Filter to only include files from the specified path
      const pathPrefix = `./${staffDataPath}/staff_data/`;
      
      const staffData = context.keys()
        .filter(key => key.startsWith(pathPrefix))
        .map(key => {
          const filename = key.split('/').pop()!;
          const nameWithoutExt = filename.replace(/\.(jpg|jpeg|png)$/, '');
          
          // Convert underscore-separated name to title case
          const displayName = nameWithoutExt
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
          
          return {
            name: displayName,
            image: context(key).default || context(key),
            filename: filename
          };
        })
        .sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically
      
      return staffData;
    } catch (error) {
      console.error('Error loading staff images:', error);
      return [];
    }
  }, [staffDataPath]);

  // Group staff into rows of 4
  const rows: typeof staffImages[] = [];
  for (let i = 0; i < staffImages.length; i += 4) {
    rows.push(staffImages.slice(i, i + 4));
  }

  if (staffImages.length === 0) {
    return <p>No staff data available.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th style={{ textAlign: 'center' }}></th>
          <th style={{ textAlign: 'center' }}></th>
          <th style={{ textAlign: 'center' }}></th>
          <th style={{ textAlign: 'center' }}></th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {[0, 1, 2, 3].map(colIndex => {
              const staff = row[colIndex];
              return (
                <td key={colIndex} style={{ textAlign: 'center' }}>
                  {staff ? (
                    <>
                      <img 
                        width="200" 
                        height="200" 
                        alt={staff.name} 
                        src={staff.image}
                        style={{ objectFit: 'cover' }}
                      />
                      <br />
                      {staff.name}
                    </>
                  ) : null}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
