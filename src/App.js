import Tree from "./components/TreeViewCheckbox/Tree";
import data from "./data/data.json";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

function App() {
  return <Tree items={data} />;
}

export default App;
