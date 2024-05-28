import { Skill } from "@/types/skill";
import { Tech } from "@/types/tech";
import { Work } from "@/types/work";
import { create } from "zustand";

type State = {
  isDarkTheme: boolean;
  worksData: Work[];
  skillsData: Skill[];
  techsData: Tech[];
  hoveredWorkId: string | null;
};

type Actions = {
  setIsDarkTheme: (newState: boolean) => void;
  setWorksData: (worksData: Work[]) => void;
  setSkillsData: (skillsData: Skill[]) => void;
  setTechsData: (worksData: Tech[]) => void;
};

export const usePortfolioStore = create<State & Actions>()((set) => ({
  isDarkTheme: false,
  setIsDarkTheme: (newState) => set(() => ({ isDarkTheme: newState })),
  worksData: [],
  setWorksData: (worksData) => set(() => ({ worksData: worksData })),
  skillsData: [],
  setSkillsData: (skillsData) => set(() => ({ skillsData: skillsData })),
  techsData: [],
  setTechsData: (techsData) => set(() => ({ techsData: techsData })),
  hoveredWorkId: null,
  setHoveredWorkId: (newHoveredWorkId: string) =>
    set(() => ({ hoveredWorkId: newHoveredWorkId })),
}));
