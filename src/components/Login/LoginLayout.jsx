import { Outlet } from "react-router";
import LoginHeader from "./LoginHeader";
function LoginLayout() {
  return (
    <>
      <LoginHeader />
      <Outlet />
    </>
  );
}

export default LoginLayout;
