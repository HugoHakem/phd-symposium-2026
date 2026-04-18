import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

function formatDT(date: string, time: string): string {
  return `${date.replace(/-/g, '')}T${time.replace(':', '')}00`;
}

function addHour(date: string, time: string): string {
  const d = new Date(`${date}T${time}:00`);
  d.setHours(d.getHours() + 1);
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  return `${date.replace(/-/g, '')}T${hh}${mm}00`;
}

export const GET: APIRoute = async () => {
  const schedule = await getCollection('schedule');
  const sorted = [...schedule].sort((a, b) => a.data.day - b.data.day);

  const dtstamp = new Date().toISOString().replace(/[-:.]/g, '').slice(0, 15) + 'Z';
  const events: string[] = [];

  for (const day of sorted) {
    const sessions = day.data.sessions;
    for (let i = 0; i < sessions.length; i++) {
      const session = sessions[i];
      const next = sessions[i + 1];

      const dtStart = formatDT(day.data.date, session.time);
      const dtEnd = next
        ? formatDT(day.data.date, next.time)
        : addHour(day.data.date, session.time);

      let description = '';
      if (session.speaker) description += `Speaker: ${session.speaker}\\n`;
      if (session.abstract) description += session.abstract.replace(/\n/g, '\\n');

      const lines = [
        'BEGIN:VEVENT',
        `DTSTART;TZID=Europe/Berlin:${dtStart}`,
        `DTEND;TZID=Europe/Berlin:${dtEnd}`,
        `DTSTAMP:${dtstamp}`,
        `UID:${day.data.date}-session-${i}@phd-symposium-2026`,
        `SUMMARY:${session.title}`,
        `LOCATION:${session.location ?? 'EMBL Heidelberg'}`,
      ];
      if (description) lines.push(`DESCRIPTION:${description}`);
      lines.push('END:VEVENT');
      events.push(lines.join('\r\n'));
    }
  }

  const vtimezone = [
    'BEGIN:VTIMEZONE',
    'TZID:Europe/Berlin',
    'BEGIN:STANDARD',
    'DTSTART:19701025T030000',
    'RRULE:FREQ=YEARLY;BYDAY=-1SU;BYMONTH=10',
    'TZNAME:CET',
    'TZOFFSETFROM:+0200',
    'TZOFFSETTO:+0100',
    'END:STANDARD',
    'BEGIN:DAYLIGHT',
    'DTSTART:19700329T020000',
    'RRULE:FREQ=YEARLY;BYDAY=-1SU;BYMONTH=3',
    'TZNAME:CEST',
    'TZOFFSETFROM:+0100',
    'TZOFFSETTO:+0200',
    'END:DAYLIGHT',
    'END:VTIMEZONE',
  ].join('\r\n');

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//28th EMBL PhD Symposium 2026//EN',
    'X-WR-CALNAME:28th EMBL PhD Symposium 2026',
    'X-WR-CALDESC:Shifting Gears: Automation\\, AI\\, and High-Throughput Methodologies — Dec 1–3\\, 2026',
    'X-WR-TIMEZONE:Europe/Berlin',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'REFRESH-INTERVAL;VALUE=DURATION:PT12H',
    'X-PUBLISHED-TTL:PT12H',
    vtimezone,
    ...events,
    'END:VCALENDAR',
  ].join('\r\n');

  return new Response(ics, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'inline; filename="phd-symposium-2026.ics"',
    },
  });
};
