import { DevTools } from "jotai-devtools";
import "jotai-devtools/styles.css";
import { ConsolePageView } from "./pages/console.page";

function App() {
  return (
    <div className="w-screen h-screen flex">
      <DevTools />
      <ConsolePageView />
    </div>
  );
}

export default App;
