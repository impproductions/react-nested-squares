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
      <NestedSquares side={Math.min(windowSize[0], windowSize[1]) / 2} nestAmount={1}>
        <div style={{ display: "flex", height: "100%", width: "100%", border: "1px solid red" }}>
          <div style={{ flex: "1 0 100%", fontSize: "1%", display: "flex", minHeight: "100%", minWidth: "100%", border: "1px solid blue", alignItems: "center", justifyContent: "center", maxHeight: "100%", maxWidth: "100%", flexGrow: 1, fontSize: "8pt", textAlign: "justify", overflow: "hidden", whiteSpace: "normal", textOverflow: "ellipsis" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, aumquam nescimus blatere dispute teresio aestuntus
          </div>
        </div>
      </NestedSquares>
    </div>
  );
}

export default App;
