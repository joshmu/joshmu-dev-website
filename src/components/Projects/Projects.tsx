/**
 * @path /src/components/Projects/Projects.tsx
 *
 * @project joshmu-dev-website
 * @file Projects.tsx
 *
 * @author Josh Mu <hello@joshmu.dev>
 * @created Friday, 13th November 2020
 * @modified Saturday, 26th December 2020 2:49:48 pm
 * @copyright © 2020 - 2020 MU
 */

import { SECTION } from "@/services/sections";
import { RevealInView } from "@/shared/ux/RevealInView";

import { Project } from "./Project/Project";
import { PROJECTS } from "./catalogue";

type ProjectsProps = { props?: { [key: string]: any } };

export const Projects = ({ ...props }: ProjectsProps) => {
  return (
    <div id={SECTION.projects} className="container py-12 mx-auto" {...props}>
      <div className="flex flex-wrap items-center justify-center">
        {PROJECTS.map((project, idx) => (
          <RevealInView key={idx} custom={idx}>
            <Project data={project} />
          </RevealInView>
        ))}
      </div>
    </div>
  );
};
