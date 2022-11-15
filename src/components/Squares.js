import React, { useEffect, useState } from "react";

import { convertAngle, randomColor, scale } from "./squaresHelpers";

import styles from "./Squares.module.css";
function Squares({ side, angle, children, ...restProps }) {
    const [bgColor, setBgColor] = useState(randomColor());

    useEffect(() => {
        setBgColor(randomColor());
    }, []);

    return (
        <div
            id={"outer-box-" + restProps.id}
            boxtype="outer-box"
            className={styles.outerbox}
            style={{
                width: side + "px",
                height: side + "px",
            }}>
            <div
                id={"mid-box-" + restProps.id}
                boxtype="mid-box"
                className={styles.midbox}
                style={{
                    width: side * scale(side, angle) + "px",
                    height: side * scale(side, angle) + "px",
                    transform: "rotateZ(" + (45 + Number(convertAngle(angle))) + "deg)",
                    backgroundColor: bgColor,
                }}>
                {children}
            </div>
        </div>
    );

}

export default Squares;