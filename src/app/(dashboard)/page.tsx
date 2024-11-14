import { protectServer } from "@/features/auth/utils";

import { Banner } from "./banner";
import { ProjectsSection } from "./projects-section";
import { TemplatesSection } from "./templates-section";

export default async function Home() {
  await protectServer();

  return (
    <div className="">
    eccomrece
    </div>
  );
};

