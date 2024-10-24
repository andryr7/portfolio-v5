import { create } from "zustand";
import { lightColors } from "./useTheme";
import { Actions, Colors, State } from "@/types/state";

export const usePortfolioStore = create<State & Actions>()((set) => ({
  //General settings
  isLoaded: false,
  setIsLoaded: (newLoadingStatus) =>
    set(() => ({ isLoaded: newLoadingStatus })),
  language: "en",
  setLanguage: (newLanguage) => set(() => ({ language: newLanguage })),
  isDarkTheme: true,
  setIsDarkTheme: (newState) => set(() => ({ isDarkTheme: newState })),
  colors: lightColors,
  setColors: (newColors: Colors) => set(() => ({ colors: newColors })),

  //Content data
  worksData: [],
  setWorksData: (worksData) => set(() => ({ worksData: worksData })),
  skillsData: [],
  setSkillsData: (skillsData) => set(() => ({ skillsData: skillsData })),
  techsData: [],
  setTechsData: (techsData) => set(() => ({ techsData: techsData })),

  //Interaction
  hoveredWorkIndex: null,
  setHoveredWorkIndex: (newHoveredWorkIndex: number | null) =>
    set(() => ({ hoveredWorkIndex: newHoveredWorkIndex })),
  setHoveredContactLink: (newHoveredContactLink: number | null) =>
    set(() => ({ hoveredContactLink: newHoveredContactLink })),
  draggedTechCubeId: null,
  setDraggedTechCubeId: (newDraggedTechCubeId: string | null) =>
    set(() => ({ draggedTechCubeId: newDraggedTechCubeId })),
  selectedTechCubeId: null,
  setSelectedTechCubeId: (newSelectedTechCubeId: string | null) =>
    set(() => ({ selectedTechCubeId: newSelectedTechCubeId })),
  viewportSize: { width: 5, height: 5 },
  setViewportSize: (newViewportSize) =>
    set(() => ({ viewportSize: newViewportSize })),

  //Scroll progress values
  worksScrollProgress: 0,
  setWorksScrollProgress: (newScrollProgress) =>
    set(() => ({ worksScrollProgress: newScrollProgress })),
  aboutScrollProgress: 0,
  setAboutScrollProgress: (newScrollProgress) =>
    set(() => ({ aboutScrollProgress: newScrollProgress })),
  skillsScrollProgress: 0,
  setSkillsScrollProgress: (newScrollProgress) =>
    set(() => ({ skillsScrollProgress: newScrollProgress })),
  contactScrollProgress: 0,
  setContactScrollProgress: (newScrollProgress) =>
    set(() => ({ contactScrollProgress: newScrollProgress })),
  hoveredContactLink: null,
}));
