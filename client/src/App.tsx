import { useEffect } from "react";
import AppRoutes from "./AppRoutes";
import useUserStore from "./store/user-store";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  const { checkAuth, isAuth } = useUserStore();

  useEffect(() => {
    if (localStorage.getItem("auth_token") === null || isAuth === undefined) {
      checkAuth();
    }
  }, [checkAuth, isAuth]);

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
