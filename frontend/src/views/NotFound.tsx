import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useI18n } from "../context/I18nContext";

const NotFound: React.FC = React.memo(() => {
  const t = useI18n();
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="80vh">
      <Typography variant="h2" fontWeight={700} mb={2}>404</Typography>
      <Typography>{t("notFound")}</Typography>
    </Box>
  );
});

export default NotFound;
