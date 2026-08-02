import { projects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";

export function ProjectGrid() {
  return (
    <section className="pt-8 pb-20 md:pb-32 bg-black" aria-labelledby="work-heading">
      <div className="container">
        {/* Visually hidden — gives the work grid a proper H2 so the heading
            outline doesn't skip from the hero H1 to the card H3s. */}
        <h2 id="work-heading" className="sr-only">
          Selected work
        </h2>
        {/* Grid - 2 columns, uniform card dimensions and spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}