import React, { useEffect, useState, useCallback, memo } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNotification } from "../components/NotificationProvider";
import { useI18n } from "../context/I18nContext";
import type { User, UserRole } from "../context/AuthContext";
import type { SelectChangeEvent } from "@mui/material/Select";

interface AdminUserRowProps {
  user: User & { password?: string };
  selected: boolean;
  onSelect: (username: string) => void;
  onDelete: (username: string) => void;
  onRoleChange: (username: string, role: UserRole) => void;
  t: (key: string) => string;
}

const AdminUserRow: React.FC<AdminUserRowProps> = memo(({ user, selected, onSelect, onDelete, onRoleChange, t }) => {
  const handleSelect = useCallback(() => onSelect(user.username), [onSelect, user.username]);
  const handleDelete = useCallback(() => onDelete(user.username), [onDelete, user.username]);
  const handleRoleChange = useCallback((e: SelectChangeEvent<UserRole>) => onRoleChange(user.username, e.target.value as UserRole), [onRoleChange, user.username]);
  return (
    <TableRow key={user.username} data-testid={`admin-user-row-${user.username}`}>
      <TableCell padding="checkbox">
        <Checkbox
          checked={selected}
          onChange={handleSelect}
          data-testid={`admin-user-select-${user.username}`}
        />
      </TableCell>
      <TableCell>{user.username}</TableCell>
      <TableCell>
        <Select
          value={user.role}
          onChange={handleRoleChange}
          data-testid={`admin-user-role-${user.username}`}
          size="small"
        >
          <MenuItem value="user">{t("user")}</MenuItem>
          <MenuItem value="admin">{t("admin")}</MenuItem>
        </Select>
      </TableCell>
      <TableCell align="right">
        <IconButton
          color="error"
          onClick={handleDelete}
          data-testid={`admin-user-delete-${user.username}`}
        >
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
});

const AdminUsersView: React.FC = () => {
  const [users, setUsers] = useState<(User & { password?: string })[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [deleteUser, setDeleteUser] = useState<string | null>(null);
  const [bulkAction, setBulkAction] = useState<"" | UserRole>("");
  const [roleChange, setRoleChange] = useState<{ username: string; role: UserRole } | null>(null);
  const notification = useNotification();
  const t = useI18n();

  useEffect(() => {
    const local = localStorage.getItem("users");
    const loaded: (User & { password?: string; role: string })[] = local ? JSON.parse(local) : [];
    setUsers(loaded.map(u => ({ ...u, role: (u.role === "admin" || u.role === "user") ? u.role as UserRole : "user" as UserRole })));
  }, []);

  const handleSelect = useCallback((username: string) => {
    setSelected((prev) => prev.includes(username) ? prev.filter(u => u !== username) : [...prev, username]);
  }, []);

  const handleSelectAll = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelected(users.map(u => u.username));
    } else {
      setSelected([]);
    }
  }, [users]);

  const handleDelete = useCallback((username: string) => {
    setDeleteUser(username);
  }, []);

  const confirmDelete = () => {
    if (!deleteUser) return;
    const updated = users.filter(u => u.username !== deleteUser);
    setUsers(updated);
    localStorage.setItem("users", JSON.stringify(updated));
    setDeleteUser(null);
    setSelected((prev) => prev.filter(u => u !== deleteUser));
    notification(t("userDeleted"), "success");
  };

  const handleRoleChange = useCallback((username: string, role: UserRole) => {
    setRoleChange({ username, role });
  }, []);

  const confirmRoleChange = () => {
    if (!roleChange) return;
    const updated = users.map(u => u.username === roleChange.username ? { ...u, role: roleChange.role } : u);
    setUsers(updated);
    localStorage.setItem("users", JSON.stringify(updated));
    setRoleChange(null);
    notification(t("roleChanged"), "success");
  };

  const handleBulkDelete = () => {
    const updated = users.filter(u => !selected.includes(u.username));
    setUsers(updated);
    localStorage.setItem("users", JSON.stringify(updated));
    setSelected([]);
    notification(t("selectedUsersDeleted"), "success");
  };

  const handleBulkRole = useCallback((role: UserRole) => {
    const updated = users.map(u => selected.includes(u.username) ? { ...u, role } : u);
    setUsers(updated);
    localStorage.setItem("users", JSON.stringify(updated));
    notification(t("rolesUpdated"), "success");
  }, [users, selected, notification, t]);

  return (
    <Box p={4} minHeight="80vh">
      <Typography variant="h4" fontWeight={700} mb={2} data-testid="admin-users-title">{t("userManagement")}</Typography>
      <Box mb={2} display="flex" gap={2}>
        <Button
          variant="contained"
          color="error"
          disabled={selected.length === 0}
          onClick={handleBulkDelete}
          data-testid="admin-bulk-delete-btn"
        >
          {t("deleteSelected")}
        </Button>
        <Select
          value={bulkAction}
          onChange={(e: SelectChangeEvent<UserRole>) => { setBulkAction(e.target.value); if (e.target.value) { handleBulkRole(e.target.value as UserRole); setBulkAction(""); }}}
          displayEmpty
          data-testid="admin-bulk-role-select"
          disabled={selected.length === 0}
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="" disabled>{t("changeRole")}</MenuItem>
          <MenuItem value="user">{t("user")}</MenuItem>
          <MenuItem value="admin">{t("admin")}</MenuItem>
        </Select>
      </Box>
      <TableContainer component={Paper}>
        <Table size="small" data-testid="admin-users-table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selected.length === users.length && users.length > 0}
                  indeterminate={selected.length > 0 && selected.length < users.length}
                  onChange={handleSelectAll}
                  data-testid="admin-users-select-all"
                />
              </TableCell>
              <TableCell>{t("username")}</TableCell>
              <TableCell>{t("role")}</TableCell>
              <TableCell align="right">{t("actions")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <AdminUserRow
                key={user.username}
                user={user}
                selected={selected.includes(user.username)}
                onSelect={handleSelect}
                onDelete={handleDelete}
                onRoleChange={handleRoleChange}
                t={t}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Delete confirmation dialog */}
      <Dialog open={!!deleteUser} onClose={() => setDeleteUser(null)}>
        <DialogTitle>{t("deleteUserTitle")}</DialogTitle>
        <DialogContent>{t("deleteUserDesc").replace("{user}", deleteUser || "")}</DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteUser(null)} data-testid="admin-delete-cancel">{t("cancel")}</Button>
          <Button onClick={confirmDelete} color="error" data-testid="admin-delete-confirm">{t("confirm")}</Button>
        </DialogActions>
      </Dialog>
      {/* Role change confirmation dialog */}
      <Dialog open={!!roleChange} onClose={() => setRoleChange(null)}>
        <DialogTitle>{t("changeRoleTitle")}</DialogTitle>
        <DialogContent>{t("changeRoleDesc").replace("{user}", roleChange?.username || "").replace("{role}", roleChange?.role || "")}</DialogContent>
        <DialogActions>
          <Button onClick={() => setRoleChange(null)} data-testid="admin-role-cancel">{t("cancel")}</Button>
          <Button onClick={confirmRoleChange} color="primary" data-testid="admin-role-confirm">{t("confirm")}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminUsersView; 