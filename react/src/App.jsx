import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import styles from "./APP.module.css";
import FloatingObject from "@Pages/MainPage/FloatingObject/FloatingObject";
import teeth from "@Assets/crowdingTeeth.png";
import mainLogo from "@Assets/logo-cropped.svg";
import teeth2 from "@Assets/teeth-svgrepo-com.svg";

function App() {
  return (
    <div className={styles.App}>
      <Header />
      <Outlet />
      <Footer />
      
      <FloatingObject src={teeth} initialX={150} initialY={200}/>
      <FloatingObject src={mainLogo} initialX={300} initialY={100}/>
      <FloatingObject src={teeth2} initialX={300} initialY={150}/>
    </div>
  );
}

export default App;
