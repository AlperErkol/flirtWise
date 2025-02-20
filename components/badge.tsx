import React from "react";
import { Badge } from "@rneui/themed";
import { useTranslation } from "@/hooks/useTranslation";

const BadgeComponent = ({
  value,
  isDark,
}: {
  value: string;
  isDark: boolean;
}) => {
  const { t } = useTranslation();
  return (
    <Badge
      badgeStyle={{
        padding: 6,
        height: "auto",
        borderRadius: 16,
        borderWidth: 0,
        backgroundColor: isDark ? "#FF9375" : "#FF6347",
      }}
      value={t(value)}
      textStyle={{
        fontSize: 14,
        fontFamily: "Inter_500Medium",
        letterSpacing: -0.5,
      }}
    />
  );
};

export default BadgeComponent;
