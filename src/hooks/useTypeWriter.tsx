import { useEffect, useState } from "react";
const words = ["MEETINGS", "GAMING"];
const useTypeWriter = () => {
  const [index, setIndex] = useState(0);
  const [word, setWord] = useState<string | undefined>(words[index]);

  useEffect(() => {
    const typeWriterTimeout = setTimeout(() => {
      if (index === 0) {
        setIndex(1);
      } else {
        setIndex(0);
      }
      setWord(words[index]);
    }, 5000);
    return () => {
      clearTimeout(typeWriterTimeout);
    };
  }, [index]);
  return word;
};

export default useTypeWriter;
