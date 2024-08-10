import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: "2024-08-08", // use current date (YYYY-MM-DD) to target the latest API version
});

export async function getWorksData() {
  const worksData = await client.fetch(
    '*[_type == "work"]{..., usedTechs[]->{_id, name, type, url}} | order(order asc)'
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
