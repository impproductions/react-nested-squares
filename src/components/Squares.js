import React, { useEffect, useRef, useState } from "react";

import { convertAngle, randomColor, scale } from "./SquaresUtilities";

import styles from "./Squares.module.css";
function Squares({ side, angle, children, ...restProps }) {
    const [innerBgColor, setInnerBgColor] = useState(randomColor());
    const [outerBgColor, setOuterBgColor] = useState(randomColor());

    useEffect(() => {
        setInnerBgColor(randomColor());
        setOuterBgColor(randomColor());
    }, []);

    return (
        <div
            id={"outer-box-" + restProps.id}
            boxtype="outer-box"
            className={styles.outerbox}
            style={{
                width: side + "px",
                height: side + "px",
                backgroundColor: outerBgColor
            }}>
            <div
                id={"mid-box-" + restProps.id}
                boxtype="mid-box"
                className={styles.midbox}
                style={{
                    width: side * scale(side, angle) + "px",
                    height: side * scale(side, angle) + "px",
                    transform: "rotateZ(" + (45 + Number(convertAngle(angle))) + "deg)",
                    backgroundColor: innerBgColor
                }}>
                {children}
            </div>
        </div>
    );

}

export default Squares;