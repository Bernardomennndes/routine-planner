import { Board } from "./components/board";
import { useRoutineStore } from "./stores/routine";

function App() {
  const routine = useRoutineStore((store) => store.routine);

  return (
    <main className="min-h-screen w-screen flex">
      <Board routine={routine} />
    </main>
  );
}

export default App;
