import { useCallback, useEffect, useState } from "react";
import { usePortfolioStore } from "./usePortfolioStore";
import { useShallow } from "zustand/react/shallow";

export function useLoadData() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { setWorksData, setSkillsData, setTechsData } = usePortfolioStore(
    useShallow((state) => ({
      setWorksData: state.setWorksData,
      setSkillsData: state.setSkillsData,
      setTechsData: state.setTechsData,
    }))
  );

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

  return isLoading;
}
