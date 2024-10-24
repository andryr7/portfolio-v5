import { Skill } from "./skillTypes";
import { Tech } from "./techTypes";
import { Work } from "./workTypes";

export type Colors = {
  main: string;
  accent: string;
  backgroundOne: string;
  backgroundTwo: string;
};

export type State = {
  //Localization
  language: string;
  //Loading state
  isLoaded: boolean;
  //Theme and colors
  isDarkTheme: boolean;
  colors: Colors;
  // App data
  // generalInfoData: GeneralInfo;
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
  aboutScrollProgress: number;
  skillsScrollProgress: number;
  contactScrollProgress: number;
  hoveredContactLink: number | null;
  draggedTechCubeId: string | null;
  selectedTechCubeId: string | null;
};

export type Actions = {
  //Localization
  setLanguage: (newLanguage: string) => void;
  //Loading status
  setIsLoaded: (newLoadingStatus: boolean) => void;
  //Theme and colors setter
  setIsDarkTheme: (newState: boolean) => void;
  setColors: (newColors: Colors) => void;
  //App data setters
  // setGeneralInfoData: (generalInfoData: GeneralInfo) => void;
  setWorksData: (worksData: Work[]) => void;
  setSkillsData: (skillsData: Skill[]) => void;
  setTechsData: (worksData: Tech[]) => void;
  //Works hovering setter
  setHoveredWorkIndex: (newHoveredWorkIndex: number | null) => void;
  //Canvas size setter
  setViewportSize: (newSize: { width: number; height: number }) => void;
  //Scroll animations related setters
  setWorksScrollProgress: (newScrollProgress: number) => void;
  setAboutScrollProgress: (newScrollProgress: number) => void;
  setSkillsScrollProgress: (newScrollProgress: number) => void;
  setContactScrollProgress: (newScrollProgress: number) => void;
  //Contact link hovering setter
  setHoveredContactLink: (newHoveredContactLink: number | null) => void;
  //Technologies scene setters
  setDraggedTechCubeId: (newDraggedTechCubeId: string | null) => void;
  setSelectedTechCubeId: (newSelectedTechCubeId: string | null) => void;
};
