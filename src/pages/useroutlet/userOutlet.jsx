import { Outlet } from "react-router-dom"
import Header from "../../componets/Header/Header"
import Footer from "../../componets/Footer/Footer"

const UserOutlet = () => {
  return (
   <>
   <Header/>
   <Outlet />
   <Footer/>
   </>
  );
}

export default UserOutlet;
