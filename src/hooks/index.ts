import { useEffect, useState } from "react";

export const isSSR = !(
  typeof window !== "undefined" &&
  window.document &&
  window.document.documentElement
);

export const useMedia = <T>(queries: string[], values: T[], defaultValue: T) => {
  // Array containing a media query list for each query
  const mediaQueryLists = isSSR ? [] : queries.map((q) => window.matchMedia(q));
  // Function that gets value based on matching media query
  const getValue = () => {
    // Get index of first media query that matches
    const index = mediaQueryLists.findIndex((mql) => mql.matches);
    // Return related value or defaultValue if none

    console.debug("got value", index, values[index], defaultValue);
    return values?.[index] || defaultValue;
  };
  // State and setter for matched value
  const [value, setValue] = useState<T>(getValue);

  useEffect(
    () => {
      // console.debug("RAN USE EFFECT", isClient);
      // Event listener callback
      // Note: By defining getValue outside of useEffect we ensure that it has ...
      // ... current values of hook args (as this hook callback is created once on mount).
      const handler = () => setValue(getValue);
      // Set a listener for each media query with above handler as callback.
      mediaQueryLists.forEach((mql) => mql.addEventListener("change", handler));
      // Remove listeners on cleanup
      return () => mediaQueryLists.forEach((mql) => mql.removeEventListener("change", handler));
    },
    [] // Empty array ensures effect is only run on mount and unmount
  );
  return value;
};

function usePrefersDarkMode() {
  return useMedia(["(prefers-color-scheme: dark)"], [true], false);
}

export const useDarkMode = () => {
  const prefersDarkMode = usePrefersDarkMode();
  const [stored, setStored] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStored(prefersDarkMode), 0);
    return () => {
      clearTimeout(t);
    };
  }, [prefersDarkMode]);

  // Return enabled state and setter
  return [stored] as const;
};
