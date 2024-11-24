import { protectServer } from "@/features/auth/utils";
import { Banner } from "./banner";
import { ProjectsSection } from "./projects-section";
import { TemplatesSection } from "./templates-section";
export default async function Home() {
  await protectServer();
  return (
    <div className="flex flex-col p-5 mx-auto pb-10">
      <Banner />
      <TemplatesSection />
      <ProjectsSection />
    </div>
  );
};