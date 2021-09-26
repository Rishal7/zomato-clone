import Temp from "./Components/temp";
import HomeLayoutHOC from "./HOC/Home.HOC";

function App() {
  return (
    <div className="App">
      <HomeLayoutHOC path="/" exact component={Temp} />
    </div>
  );
}

export default App;
