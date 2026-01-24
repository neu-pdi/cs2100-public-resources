import React, { useState } from 'react';
import styles from './styles.module.css';

interface TimezoneCalendarProps {
  calendarSrc: string;
  defaultTimezone?: string;
}

const timezones = [
  { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
  { value: 'America/Denver', label: 'Mountain Time (MT)' },
  { value: 'America/Chicago', label: 'Central Time (CT)' },
  { value: 'America/New_York', label: 'Eastern Time (ET)' },
  { value: 'America/Anchorage', label: 'Alaska Time (AKT)' },
  { value: 'Pacific/Honolulu', label: 'Hawaii Time (HT)' },
  { value: 'Europe/London', label: 'London (GMT/BST)' },
  { value: 'Europe/Paris', label: 'Central European Time (CET)' },
  { value: 'Asia/Tokyo', label: 'Japan Time (JST)' },
  { value: 'Asia/Shanghai', label: 'China Time (CST)' },
  { value: 'Asia/Kolkata', label: 'India Time (IST)' },
  { value: 'Australia/Sydney', label: 'Australian Eastern Time (AET)' },
];

export default function TimezoneCalendar({ calendarSrc, defaultTimezone = 'America/Los_Angeles' }: TimezoneCalendarProps) {
  const [timezone, setTimezone] = useState(defaultTimezone);

  const handleTimezoneChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTimezone(event.target.value);
  };

  const encodedTimezone = encodeURIComponent(timezone);
  const calendarUrl = `https://calendar.google.com/calendar/embed?src=${calendarSrc}&ctz=${encodedTimezone}`;

  return (
    <div className={styles.timezoneCalendarContainer}>
      <div className={styles.timezoneSelector}>
        <label htmlFor="timezone-select" className={styles.timezoneLabel}>
          Select Timezone:
        </label>
        <select
          id="timezone-select"
          value={timezone}
          onChange={handleTimezoneChange}
          className={styles.timezoneDropdown}
        >
          {timezones.map((tz) => (
            <option key={tz.value} value={tz.value}>
              {tz.label}
            </option>
          ))}
        </select>
      </div>
      <iframe
        src={calendarUrl}
        style={{ border: 0 }}
        width={800}
        height={600}
        frameBorder={0}
        scrolling="no"
      />
    </div>
  );
}
