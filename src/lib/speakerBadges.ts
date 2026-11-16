// Recognition badges shown next to a speaker and their talk, e.g. a speaker
// on EMBO's Young Investigator programme. A speaker opts in with
// `badges: ["<id>"]` in their front matter (src/content/speakers/<slug>.md);
// the programme finds the badge through the session's `speakerSlug`, so it
// only needs setting once. To add a kind of badge, add an entry here.
//
// (The EMBO Keynote Lecture is separate: it's marked with `keynote` + `embo`.)

export const SPEAKER_BADGES = {
  'embo-young-investigator': {
    /** Logo under static/, shown at the start of the badge */
    logo: 'sponsors/support/embo.svg',
    /** Alt text for the logo; the logo stands in for this word */
    alt: 'EMBO',
    /** Text after the logo */
    label: 'Young Investigator',
    /** Full wording where only text fits (calendar view, tooltips) */
    text: 'EMBO Young Investigator',
  },
  'embl-alumni-speaker': {
    logo: 'sponsors/support/embl-alumni.svg',
    alt: 'EMBL Alumni',
    label: 'Alumni speaker',
    text: 'EMBL Alumni speaker',
  },
} as const;

export type SpeakerBadgeId = keyof typeof SPEAKER_BADGES;

export const SPEAKER_BADGE_IDS = Object.keys(SPEAKER_BADGES) as [SpeakerBadgeId, ...SpeakerBadgeId[]];
