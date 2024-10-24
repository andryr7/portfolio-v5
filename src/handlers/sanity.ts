import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: "2024-10-24", // use current date (YYYY-MM-DD) to target the latest API version
});

//TODO Use
export async function getGeneralInfoData() {
  const worksData = await client.fetch('*[_type == "generalInfo"][0]');
  return worksData;
}

export async function getWorksData() {
  const worksData = await client.fetch(
    '*[_type == "work"]{..., usedTechs[]->{_id, name, enType, frType, url}} | order(order asc)'
  );
  return worksData;
}

export async function getTechsData() {
  const techsData = await client.fetch('*[_type == "tech"]');
  return techsData;
}

export async function getSkillsData() {
  const skillsData = await client.fetch(
    '*[_type == "skill"] | order(order asc)'
  );
  return skillsData;
}
