import NestedSquares from './components/Squares';

import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [windowSize, setWindowSize] = useState(0);

  useEffect(() => {
    const onResize = () => {
      setWindowSize(() => [window.innerWidth, window.innerHeight]);
    }

    onResize();

    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="App" style={{ display: "flex", height: "100vh", width: "100vw", alignItems: "center", justifyContent: "center" }}>
      <NestedSquares side={Math.min(windowSize[0], windowSize[1]) / 2} nestAmount={4} id="nested-squares">
        <div style={{ display: "flex", flex: "1 1 100%", backgroundColor: "white", padding: "20pt", fontSize: "8pt", textAlign: "justify", overflow: "hidden", whiteSpace: "normal", textOverflow: "ellipsis" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, aumquam nescimus blatere dispute teresio aestuntus
        </div>
      </NestedSquares>
    </div>
  );
}

export default App;
