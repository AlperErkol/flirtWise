import I18n from "@/lib/translations";
import { useCallback, useEffect, useState } from "react";
import { eventEmitter } from "@/lib/eventEmitter";

export const useTranslation = () => {
  const [, forceUpdate] = useState({});

  useEffect(() => {
    const handleLanguageChange = () => {
      forceUpdate({});
    };

    eventEmitter.addListener("languageChange", handleLanguageChange);
    return () => {
      eventEmitter.removeListener("languageChange", handleLanguageChange);
    };
  }, []);

  const t = useCallback((key: string) => {
    return I18n.t(key);
  }, []);

  return { t };
};
