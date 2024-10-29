import { RecoilRoot } from "recoil";
import DisplayButton from "./components/DisplayButton/DisplayButton";
import KanbanBoard from "./components/KanbanBoard/KanbanBoard";

function App() {

  return (
    <RecoilRoot>
      <div>
        <DisplayButton />
        <KanbanBoard />
      </div>
    </RecoilRoot>
  );
}

export default App
