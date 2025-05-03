import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import styles from "./APP.module.css";

function App() {
  return (
    <div className={styles.App}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
