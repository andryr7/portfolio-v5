import { useCallback, useEffect, useState } from "react";

const letters = "abcdefghijklmnopqrstuvwxyz ";
const timeBetweenIterations = 35;

export function useAnimatedText(targetText: string) {
  const [text, setText] = useState(targetText);

  // Text animation handler
  const handleAnimateText = useCallback(() => {
    const targetWord = targetText;
    let iteration = 0;
    const maxIterations = targetWord.length;
    const interval = setInterval(() => {
      if (iteration > maxIterations) {
        clearInterval(interval);
        return;
      }
      const randomizedWord = targetWord
        .split("")
        .map((_, index) => {
          if (index < iteration) {
            return targetWord[index];
          }
          return letters[Math.floor(Math.random() * 27)];
        })
        .join("");
      setText(randomizedWord);
      iteration += 1;
    }, timeBetweenIterations);
  }, [targetText]);

  //Triggering text animation
  useEffect(() => {
    handleAnimateText();
  }, [targetText, handleAnimateText]);

  return [text, handleAnimateText] as const;
}
