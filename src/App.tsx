import styles from "./App.module.css";
import WaterDrop from "./components/WaterDrop/WaterDrop";
import { MainBar } from "./components/MainBar/MainBar";
import TicketList from "./components/TicketList/TicketList";

function App() {
  return (
    <>
      <div className={styles.container}>
        <WaterDrop />
        <MainBar />
        <TicketList />
      </div>
    </>
  );
}

export default App;
