import data from "./data/data.json";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Table from "./components/TreeViewCheckbox/Table/Table";
// import List from "./components/TreeViewCheckbox/List/List";
config.autoAddCss = false;

function App() {
  const config = {
    title: "title",
    headers: {
      title: "Title",
      sessions: "Sessions",
      users: "Users",
      phones: "Phones",
      leads: "Leads",
    },
  };

  return (
    <div>
      <Table items={data} config={config} />
      {/* <List items={data} config={config} /> */}
    </div>
  );
}

export default App;
