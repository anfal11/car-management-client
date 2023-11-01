import { Outlet } from "react-router-dom";
import Footer from "../Shared/Footer";
import NavBar from "../Shared/NavBar";
import { Toaster } from "react-hot-toast";

const Root = () => {
  return (
    <div className="bg-base-200">
      <div className="max-w-7xl mx-auto">
        <NavBar />
        <Outlet />
      </div>
      <Footer />
      <Toaster />
    </div>
  );
};

export default Root;
