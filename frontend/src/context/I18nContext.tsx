import React, { createContext, useContext, useState } from "react";

const translations: Record<string, Record<string, string>> = {
  en: {
    login: "Login",
    register: "Register",
    logout: "Logout",
    dashboard: "Dashboard",
    profile: "My Profile",
    adminPanel: "Admin Panel",
    userManagement: "User Management",
    forgotPassword: "Forgot password?",
    resetPassword: "Reset Password",
    backToLogin: "Back to login",
    displayName: "Display Name",
    saveProfile: "Save Profile",
    crashTest: "Crash Test",
    username: "Username",
    password: "Password",
    repeatPassword: "Repeat password",
    userUsername: "User username",
    userPassword: "User password",
    repeatUserPassword: "Repeat user password",
    registerInSystem: "Register in the system",
    notFound: "Page not found.",
    deleteSelected: "Delete Selected",
    changeRole: "Change Role",
    user: "User",
    admin: "Admin",
    role: "Role",
    actions: "Actions",
    deleteUserTitle: "Delete User",
    deleteUserDesc: "Are you sure you want to delete user {user}?",
    changeRoleTitle: "Change Role",
    changeRoleDesc: "Change role for {user} to {role}?",
    confirm: "Confirm",
    cancel: "Cancel",
    logoutConfirmTitle: "Are you sure you want to log out?",
    logoutConfirmDesc: "After logging out, you will lose access to protected features of the application.",
    // Notifications & errors
    loginSuccess: "Login successful!",
    invalidCredentials: "Invalid username or password",
    tooManyAttempts: "Too many login attempts. Please try again in 5 minutes.",
    registrationSuccess: "Registration successful! You can now log in.",
    profileUpdated: "Profile updated!",
    passwordResetSuccess: "Password has been reset. You can now log in.",
    userDeleted: "User deleted.",
    roleChanged: "Role changed.",
    selectedUsersDeleted: "Selected users deleted.",
    rolesUpdated: "Roles updated for selected users.",
    sessionExpired: "Session expired. Please log in again.",
    sessionExpiringSoonTitle: "Session expiring soon",
    sessionExpiringSoonDesc: "Your session will expire in 10 seconds due to inactivity. Do you want to stay logged in?",
    stayLoggedIn: "Stay logged in",
    enterUsername: "Enter username.",
    enterPassword: "Enter new password.",
    passwordMinLength: "Password must be at least 6 characters.",
    passwordsDoNotMatch: "Passwords do not match.",
    userDoesNotExist: "User does not exist.",
    somethingWentWrong: "Something went wrong.",
    reloadApp: "Reload App",
    // ...add more as needed
  },
  pl: {
    login: "Zaloguj się",
    register: "Zarejestruj się",
    logout: "Wyloguj się",
    dashboard: "Panel",
    profile: "Mój profil",
    adminPanel: "Panel administratora",
    userManagement: "Zarządzanie użytkownikami",
    forgotPassword: "Nie pamiętasz hasła?",
    resetPassword: "Zresetuj hasło",
    backToLogin: "Powrót do logowania",
    displayName: "Nazwa wyświetlana",
    saveProfile: "Zapisz profil",
    crashTest: "Test awarii",
    username: "Nazwa użytkownika",
    password: "Hasło",
    repeatPassword: "Powtórz hasło",
    userUsername: "Nazwa użytkownika",
    userPassword: "Hasło użytkownika",
    repeatUserPassword: "Powtórz hasło użytkownika",
    registerInSystem: "Zarejestruj się w systemie",
    notFound: "Nie znaleziono strony.",
    deleteSelected: "Usuń zaznaczone",
    changeRole: "Zmień rolę",
    user: "Użytkownik",
    admin: "Administrator",
    role: "Rola",
    actions: "Akcje",
    deleteUserTitle: "Usuń użytkownika",
    deleteUserDesc: "Czy na pewno chcesz usunąć użytkownika {user}?",
    changeRoleTitle: "Zmień rolę",
    changeRoleDesc: "Zmień rolę użytkownika {user} na {role}?",
    confirm: "Potwierdź",
    cancel: "Anuluj",
    logoutConfirmTitle: "Czy na pewno chcesz się wylogować?",
    logoutConfirmDesc: "Po wylogowaniu utracisz dostęp do chronionych funkcji aplikacji.",
    // Notifications & errors
    loginSuccess: "Zalogowano pomyślnie!",
    invalidCredentials: "Nieprawidłowa nazwa użytkownika lub hasło",
    tooManyAttempts: "Zbyt wiele prób logowania. Spróbuj ponownie za 5 minut.",
    registrationSuccess: "Rejestracja zakończona sukcesem! Możesz się zalogować.",
    profileUpdated: "Profil zaktualizowany!",
    passwordResetSuccess: "Hasło zostało zresetowane. Możesz się zalogować.",
    userDeleted: "Użytkownik usunięty.",
    roleChanged: "Rola zmieniona.",
    selectedUsersDeleted: "Zaznaczeni użytkownicy zostali usunięci.",
    rolesUpdated: "Role zaktualizowane dla zaznaczonych użytkowników.",
    sessionExpired: "Sesja wygasła. Zaloguj się ponownie.",
    sessionExpiringSoonTitle: "Sesja wkrótce wygaśnie",
    sessionExpiringSoonDesc: "Twoja sesja wygaśnie za 10 sekund z powodu braku aktywności. Czy chcesz pozostać zalogowany?",
    stayLoggedIn: "Pozostań zalogowany",
    enterUsername: "Podaj nazwę użytkownika.",
    enterPassword: "Podaj nowe hasło.",
    passwordMinLength: "Hasło musi mieć min. 6 znaków.",
    passwordsDoNotMatch: "Hasła nie są zgodne.",
    userDoesNotExist: "Użytkownik nie istnieje.",
    somethingWentWrong: "Coś poszło nie tak.",
    reloadApp: "Przeładuj aplikację",
    // ...add more as needed
  },
};

const I18nContext = createContext({
  lang: "en",
  t: (key: string) => key,
  setLang: (lang: string) => {},
});

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState("en");
  const t = (key: string) => translations[lang][key] || key;
  const contextValue = React.useMemo(() => ({ lang, t, setLang }), [lang, t]);
  return (
    <I18nContext.Provider value={contextValue}>{children}</I18nContext.Provider>
  );
};

export function useI18n() {
  return useContext(I18nContext).t;
}

export function useSetLanguage() {
  const { lang, setLang } = useContext(I18nContext);
  return { lang, setLang };
} 