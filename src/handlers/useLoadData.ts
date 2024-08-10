import { useCallback, useEffect, useState } from "react";
import { usePortfolioStore } from "./usePortfolioStore";
import { getSkillsData, getTechsData, getWorksData } from "./sanity";

export function useLoadData() {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const setWorksData = usePortfolioStore((state) => state.setWorksData);
  const setSkillsData = usePortfolioStore((state) => state.setSkillsData);
  const setTechsData = usePortfolioStore((state) => state.setTechsData);

  // const readData = useCallback(
  //   async (
  //     url: string,
  //     setData: typeof setWorksData | typeof setSkillsData | typeof setTechsData
  //   ) => {
  //     const requestHeaders = {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //     };

  //     try {
  //       const response = await fetch(url, {
  //         headers: requestHeaders,
  //       });
  //       const data = await response.json();
  //       setData(data.result);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   },
  //   []
  // );

  const fetchData = useCallback(async () => {
    try {
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
