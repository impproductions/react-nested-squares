import { useEffect, useRef, useState } from "react";

import { scale, scaleNested } from "./SquaresUtilities";
import styles from "./NestedSquares.module.css";
import Squares from "./Squares";

function NestedSquares({ side, nestAmount = 1, children, ...restProps }) {
    const [angle, setAngle] = useState(0);
    const container = useRef(null);

    const containerId = "container-" + restProps.id;
    const nesting = nestAmount || 1;

    const innerAngle = () => -angle * (nesting) / 4;
    const innerScale = () => scaleNested(side, angle, nesting) * scale(side * scale(side, angle), angle * (nesting));

    useEffect(() => {
        const mouseMove = (e) => {
            const outerBox = container.current.getBoundingClientRect();
            const [cornerX, cornerY] = [outerBox.left, outerBox.top];
            const [centerX, centerY] = [outerBox.left + outerBox.width / 2, outerBox.top + outerBox.height / 2];
            const [pointerX, pointerY] = [Number(e.clientX), Number(e.clientY)];

            const radius = Math.sqrt((centerX-cornerX) ** 2 + (centerY-cornerY) ** 2)

            setAngle(Math.max(180 - (Math.sqrt((centerX - pointerX) ** 2 + (centerY - pointerY) ** 2) / radius) * 180, 0));
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
                            side={scaleNested(side, angle, nesting - i - 1) * side}
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
