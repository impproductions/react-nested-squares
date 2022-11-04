import NestedSquares from './components/Squares';

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
      {/* <div style={{transform: "rotateZ(12deg)"}}> */}
      <NestedSquares side={Math.min(windowSize[0], windowSize[1]) / 2} nestAmount={2} nestIndex={2}>
        <div style={{ display: "flex", height: "100%", width: "100%", border: "1px solid red" }}>
          <div style={{ flex: "1 0 100%", fontSize: "1%", display: "flex", minHeight: "100%", minWidth: "100%", border: "1px solid blue", alignItems: "center", justifyContent: "center", maxHeight: "100%", maxWidth: "100%", flexGrow: 1, fontSize: "8pt", textAlign: "justify", overflow: "hidden", whiteSpace: "normal", textOverflow: "ellipsis" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, aumquam nescimus blatere dispute teresio aestuntus
          </div>
        </div>
      </NestedSquares>
      {/* </div> */}
      {/* <div style={{ width: "300px", height: "300px", backgroundColor: "black", color: "white" }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut lectus dolor. Donec maximus imperdiet nibh, ac fermentum turpis fringilla vitae. Praesent nec enim varius, ullamcorper tellus ut, mollis odio. Pellentesque et purus sem. Fusce fermentum varius tortor quis consequat. Donec vestibulum, orci ut ultrices suscipit, diam nisl imperdiet odio, sit amet tempus enim diam elementum lorem. Aenean euismod odio id ultrices maximus. Morbi posuere ultricies massa, et pretium urna condimentum eget. Vestibulum odio arcu, pellentesque eu dapibus quis, molestie nec ligula.
      </div>
      <div style={{ width: "300px", height: "300px", backgroundColor: "black", color: "white", transform: "scale(0.5)" }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut lectus dolor. Donec maximus imperdiet nibh, ac fermentum turpis fringilla vitae. Praesent nec enim varius, ullamcorper tellus ut, mollis odio. Pellentesque et purus sem. Fusce fermentum varius tortor quis consequat. Donec vestibulum, orci ut ultrices suscipit, diam nisl imperdiet odio, sit amet tempus enim diam elementum lorem. Aenean euismod odio id ultrices maximus. Morbi posuere ultricies massa, et pretium urna condimentum eget. Vestibulum odio arcu, pellentesque eu dapibus quis, molestie nec ligula.
      </div> */}
    </div>
  );
}

export default App;
