import { useCallback, useEffect, useState } from "react";
import { usePortfolioStore } from "./usePortfolioStore";

export function useLoadData() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const setWorksData = usePortfolioStore((state) => state.setWorksData);
  const setSkillsData = usePortfolioStore((state) => state.setSkillsData);
  const setTechsData = usePortfolioStore((state) => state.setTechsData);

  const fetchData = useCallback(
    async (
      url: string,
      setData: typeof setWorksData | typeof setSkillsData | typeof setTechsData
    ) => {
      const requestHeaders = {
        "Content-Type": "application/json",
        Accept: "application/json",
      };

      try {
        const response = await fetch(url, {
          headers: requestHeaders,
        });
        const data = await response.json();
        setData(data.result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    []
  );

  const getData = useCallback(async () => {
    try {
      await Promise.all([
        fetchData("/data/works.json", setWorksData),
        fetchData("/data/skills.json", setSkillsData),
        fetchData("/data/techs.json", setTechsData),
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [fetchData, setSkillsData, setWorksData, setTechsData]);

  useEffect(() => {
    getData();
  }, [getData]);

  return { isLoading: isLoading };
}
