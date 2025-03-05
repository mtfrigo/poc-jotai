import { DevTools } from "jotai-devtools";
import "jotai-devtools/styles.css";
import { ConsolePage } from "./pages/console/console.view-model";

function App() {
  return (
    <div className="w-screen h-screen flex">
      <DevTools />
      <ConsolePage />
    </div>
  );
}

export default App;
