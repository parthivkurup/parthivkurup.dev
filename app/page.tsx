import { site } from "@/content/site";
import { ProjectExplorer } from "@/components/ProjectExplorer";
import { getProjects } from "@/lib/projects";

export default function Home() {
  const projects = getProjects();
  return (
    <>
      <section className="pb-10 pt-14 sm:pt-20">
        <p className="font-mono text-xs text-low">
          <span className="text-mid">$</span> ls ./projects
        </p>
        <h1 className="mt-3 max-w-xl text-2xl font-medium tracking-tight text-fg sm:text-[28px] sm:leading-snug">
          {site.intro}
        </h1>
      </section>
      <section aria-label="Projects">
        <ProjectExplorer projects={projects} />
      </section>
    </>
  );
}
