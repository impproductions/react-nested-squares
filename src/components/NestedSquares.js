import { useEffect, useRef, useState } from "react";

import { scale, scaleUpTo } from "./SquaresUtilities";
import styles from "./NestedSquares.module.css";
import Squares from "./Squares";

function NestedSquares({ side, nestAmount = 1, children, ...restProps }) {
    const [angle, setAngle] = useState(0);
    const container = useRef(null);
    
    const containerId = "container-" + restProps.id;
    const nesting = nestAmount || 1;

    const innerAngle = () => -angle * (nesting) / 4;
    const innerScale = () => scaleUpTo(side, angle, nesting) * scale(side * scale(side, angle), angle * (nesting));

    useEffect(() => {
        const mouseMove = (e) => {
            const outerBox = container.current.getBoundingClientRect();
            const [cx, cy] = [outerBox.left + outerBox.width / 2, outerBox.top + outerBox.height / 2];
            const [px, py] = [Number(e.clientX), Number(e.clientY)];

            setAngle(Math.round(Math.atan2(py - cy, px - cx) * 180 / Math.PI + 180) % 360);
        }

        window.addEventListener("mousemove", mouseMove);

        return () => window.removeEventListener("mousemove", mouseMove);
    }, []);


    return (
        <div id={containerId} ref={container}>
            {
                Array(nesting).fill(null).reduce((p, c, i) => {
                    return (
                        <Squares
                            {...restProps}
                            key={restProps.id + "-" + i}
                            id={restProps.id + "-" + i}
                            side={scaleUpTo(side, angle, nesting - i - 1) * side}
                            angle={angle}
                        >
                            {p}
                        </Squares>
                    );
                }, (
                    <div
                        id={restProps.id + "-inner"}
                        className={styles.innerbox}
                        style={{
                            minWidth: side + "px",
                            minHeight: side + "px",
                            maxWidth: side + "px",
                            maxHeight: side + "px",
                            transform: "rotateZ(" + innerAngle() + "deg) scale(" + innerScale(side, angle) + ")",
                        }}>
                        <div id={"content"} style={{ display: "flex" }}>
                            {children}
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default NestedSquares;
