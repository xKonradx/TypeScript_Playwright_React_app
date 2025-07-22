import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { useI18n } from "../context/I18nContext";

interface LogoutModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = React.memo(({ onConfirm, onCancel }) => {
  const t = useI18n();
  return (
    <Dialog 
      open 
      onClose={onCancel}
      aria-labelledby="logout-dialog-title"
      aria-describedby="logout-dialog-description"
    >
      <DialogTitle id="logout-dialog-title">{t("logoutConfirmTitle")}</DialogTitle>
      <DialogContent id="logout-dialog-description">
        {t("logoutConfirmDesc")}
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={onConfirm} 
          color="error" 
          variant="contained"
          aria-label="Confirm logout"
        >
          {t("confirm")}
        </Button>
        <Button 
          onClick={onCancel} 
          variant="outlined"
          aria-label="Cancel logout"
        >
          {t("cancel")}
        </Button>
      </DialogActions>
    </Dialog>
  );
});

export default LogoutModal;
