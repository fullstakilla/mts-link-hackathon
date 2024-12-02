import React from "react";
import { useRoutes } from "react-router-dom";
import { routerConfig } from "./configs/route";

const AppRoutes: React.FC = () => {
  const element = useRoutes(routerConfig);
  return element;
};

export default AppRoutes;
