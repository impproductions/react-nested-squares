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
      <NestedSquares side={Math.min(windowSize[0], windowSize[1]) / 2} nestAmount={4} id="nested-squares">
        <div className={style.content}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, aumquam nescimus blatere dispute teresio aestuntus. Lorem ipsum dolor sit amet, consectetur adipiscing elit, aumquam nescimus blatere dispute teresio aestuntus. Lorem ipsum dolor sit amet, consectetur adipiscing elit, aumquam nescimus blatere dispute teresio aestuntus. Lorem ipsum dolor sit amet, consectetur adipiscing elit, aumquam nescimus blatere dispute teresio aestuntus
        </div>
      </NestedSquares>
    </div>
  );
}

export default App;
