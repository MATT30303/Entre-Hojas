import { Outlet } from "react-router-dom";
import Header from "../Components/common/Header";
export default function MainLayout() {
  return (
    <>
      <Header placeholder="Buscar Entre Hojas" />
      <Outlet />
    </>
  );
}