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
  hoveredWorkIndex: number | null;
  //Canvas size
  viewportSize: {
    width: number;
    height: number;
  };
  //Scroll animations related values
  worksScrollProgress: number;
  contactScrollProgress: number;
  hoveredContactLink: number | null;
  draggedTechCubeId: string | null;
  selectedTechCubeId: string | null;
};

type Actions = {
  //Theme setter
  setIsDarkTheme: (newState: boolean) => void;
  //App data setters
  setWorksData: (worksData: Work[]) => void;
  setSkillsData: (skillsData: Skill[]) => void;
  setTechsData: (worksData: Tech[]) => void;
  //Works hovering setter
  setHoveredWorkIndex: (newHoveredWorkIndex: number | null) => void;
  //Canvas size setter
  setViewportSize: (newSize: { width: number; height: number }) => void;
  //Scroll animations related setters
  setWorksScrollProgress: (newScrollProgress: number) => void;
  setContactScrollProgress: (newScrollProgress: number) => void;
  //Contact link hovering setter
  setHoveredContactLink: (newHoveredContactLink: number | null) => void;
  //Technologies scene setters
  setDraggedTechCubeId: (newDraggedTechCubeId: string | null) => void;
  setSelectedTechCubeId: (newSelectedTechCubeId: string | null) => void;
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
  hoveredWorkIndex: null,
  setHoveredWorkIndex: (newHoveredWorkIndex: number | null) =>
    set(() => ({ hoveredWorkIndex: newHoveredWorkIndex })),
  viewportSize: { width: 5, height: 5 },
  setViewportSize: (newViewportSize) =>
    set(() => ({ viewportSize: newViewportSize })),
  worksScrollProgress: 0,
  setWorksScrollProgress: (newScrollProgress) =>
    set(() => ({ worksScrollProgress: newScrollProgress })),
  contactScrollProgress: 0,
  setContactScrollProgress: (newScrollProgress) =>
    set(() => ({ contactScrollProgress: newScrollProgress })),
  hoveredContactLink: null,
  setHoveredContactLink: (newHoveredContactLink: number | null) =>
    set(() => ({ hoveredContactLink: newHoveredContactLink })),
  draggedTechCubeId: null,
  setDraggedTechCubeId: (newDraggedTechCubeId: string | null) =>
    set(() => ({ draggedTechCubeId: newDraggedTechCubeId })),
  selectedTechCubeId: null,
  setSelectedTechCubeId: (newSelectedTechCubeId: string | null) =>
    set(() => ({ selectedTechCubeId: newSelectedTechCubeId })),
}));
