# Context

Domain glossary for this site.

- **Contribution Calendar**: the GitHub contribution grid shown in the Activity section, served by `app/api/github` and built by `src/services/contribution-calendar`.
- **Contribution Day**: one cell of the Contribution Calendar, `{ date, grade }`.
- **Grade**: a 0-4 intensity bucket derived from the day's contribution count.
- **Theme**: one of the four cycling colour themes (dark, light, alt, alt2), persisted in localStorage.
- **Section**: a scroll-target region of the single page (hero, banner, projects, contact), defined with its scroll behaviour in `src/services/sections.ts`.
