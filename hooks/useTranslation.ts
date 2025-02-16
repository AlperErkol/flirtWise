import I18n from "@/utils/i18n";
import { useCallback } from "react";

export const useTranslation = () => {
  const t = useCallback((key: string) => {
    return I18n.t(key);
  }, []);

  return { t };
};
