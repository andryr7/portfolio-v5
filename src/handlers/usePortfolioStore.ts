import { create } from "zustand";
import { Skill } from "@/types/skill";
import { Tech } from "@/types/tech";
import { Work } from "@/types/work";

type State = {
  //Theme
  isDarkTheme: boolean;
  // App data
  worksData: Work[];
  skillsData: Skill[];
  techsData: Tech[];
  //Works hovering
  hoveredWorkId: string | null;
  //Canvas size
  viewportSize: {
    width: number;
    height: number;
  };
  //Scroll animations related values
  worksSceneIsActive: boolean;
  contactSceneIsActive: boolean;
  worksScrollProgress: number;
  contactScrollProgress: number;
};

type Actions = {
  //Theme setter
  setIsDarkTheme: (newState: boolean) => void;
  //App data setters
  setWorksData: (worksData: Work[]) => void;
  setSkillsData: (skillsData: Skill[]) => void;
  setTechsData: (worksData: Tech[]) => void;
  //Works hovering setter
  setHoveredWorkId: (newHoveredWorkId: string | null) => void;
  //Canvas size setter
  setViewportSize: (newSize: { width: number; height: number }) => void;
  //Scroll animations related setters
  setWorksSceneIsActive: (newActiveStatus: boolean) => void;
  setContactSceneIsActive: (newActiveStatus: boolean) => void;
  setWorksScrollProgress: (newScrollProgress: number) => void;
  setContactScrollProgress: (newScrollProgress: number) => void;
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
  setHoveredWorkId: (newHoveredWorkId: string | null) =>
    set(() => ({ hoveredWorkId: newHoveredWorkId })),
  viewportSize: { width: 5, height: 5 },
  setViewportSize: (newViewportSize) =>
    set(() => ({ viewportSize: newViewportSize })),
  worksSceneIsActive: false,
  contactSceneIsActive: false,
  setWorksSceneIsActive: (newActiveStatus) =>
    set(() => ({ worksSceneIsActive: newActiveStatus })),
  setContactSceneIsActive: (newActiveStatus) =>
    set(() => ({ contactSceneIsActive: newActiveStatus })),
  worksScrollProgress: 0,
  setWorksScrollProgress: (newScrollProgress) =>
    set(() => ({ worksScrollProgress: newScrollProgress })),
  contactScrollProgress: 0,
  setContactScrollProgress: (newScrollProgress) =>
    set(() => ({ contactScrollProgress: newScrollProgress })),
}));
