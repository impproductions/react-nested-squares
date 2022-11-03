import Squares from './components/Squares';

import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [innerSide, setInnerSide] = useState(0);
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
      <div style={{transform: "rotateZ(12deg)"}}>
        <Squares side={Math.min(windowSize[0], windowSize[1]) / 2} nestIndex={0}/*onResize={(scale) => setInnerSide(scale) }*/>
          <div style={{ display: "flex", height: "100%", width: "100%" }}>
            <div style={{ display: "flex", height: "100vh", width: "100vw", alignItems: "center", justifyContent: "center", maxHeight: "100%", maxWidth: "100%", flexGrow: 1, fontSize: "8pt", textAlign: "justify", overflow: "hidden", whiteSpace: "normal", textOverflow: "ellipsis" }}>
              Content
            </div>
          </div>
        </Squares>
      </div>
    </div>
  );
}

export default App;
