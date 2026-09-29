import { scroller } from "react-scroll";

export const SECTION = {
  hero: "hero",
  banner: "banner",
  projects: "projects",
  contact: "contact",
} as const;

export type SectionId = (typeof SECTION)[keyof typeof SECTION];

export const NAV_SECTIONS: readonly SectionId[] = [SECTION.projects, SECTION.contact];

export const scrollToSection = (id: SectionId, config: object = {}): void => {
  scroller.scrollTo(id, {
    duration: 800,
    delay: 0,
    smooth: "easeInOutQuart",
    offset: -40,
    ...config,
  });
};
