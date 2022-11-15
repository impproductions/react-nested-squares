import { useEffect, useState } from 'react';

import NestedSquares from './components/NestedSquares';

import style from './App.module.css';

function App() {
  const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight]);

  useEffect(() => {
    const onResize = () => {
      setWindowSize(() => [window.innerWidth, window.innerHeight]);
    }

    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className={style.app}>
      <NestedSquares side={Math.min(windowSize[0], windowSize[1]) / 2} nestAmount={10} id="nested-squares">
        <div className={style.content}>
          <button className={style.shiny} onClick={() => alert("Congratulations!")}>Click me</button>
        </div>
      </NestedSquares>
    </div>
  );
}

export default App;
