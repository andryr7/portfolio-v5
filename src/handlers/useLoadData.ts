import { useCallback, useEffect, useState } from "react";
import { usePortfolioStore } from "./usePortfolioStore";
import { getSkillsData, getTechsData, getWorksData } from "./sanity";

export function useLoadData() {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // const setGeneralInfoData = usePortfolioStore(
  //   (state) => state.setGeneralInfoData
  // );
  const setWorksData = usePortfolioStore((state) => state.setWorksData);
  const setSkillsData = usePortfolioStore((state) => state.setSkillsData);
  const setTechsData = usePortfolioStore((state) => state.setTechsData);

  const fetchData = useCallback(async () => {
    try {
      // const generalInfoData = await getGeneralInfoData();
      // setGeneralInfoData(generalInfoData);

      const worksData = await getWorksData();
      setWorksData(worksData);

      const skillsData = await getSkillsData();
      setSkillsData(skillsData);

      const techsData = await getTechsData();
      setTechsData(techsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [setWorksData, setSkillsData, setTechsData]);

  const getData = useCallback(async () => {
    try {
      await fetchData();
    } finally {
      setIsLoading(false);
    }
  }, [fetchData]);

  useEffect(() => {
    getData();
  }, [getData]);

  return isLoading;
}
