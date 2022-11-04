import React, { useEffect, useRef, useState } from "react";

function NestedSquares({ side, nestAmount = 1, children, ...restProps }) {
    const [angle, setAngle] = useState(0);
    const midRef = useRef([]);

    const containerId = "container-" + restProps.id;
    const nesting = nestAmount || 1;

    function innerAngle() {
        return -angle * (nesting) / 4;
    }

    function scaleInner() {
        return scaleUpTo(side, angle, nesting) * scale(side * scale(side, angle), angle * (nesting));
    }

    useEffect(() => {
        const mouseMove = (e) => {
            const outerBox = document.getElementById(containerId);
            const center = [outerBox.getBoundingClientRect().left + outerBox.getBoundingClientRect().width / 2, outerBox.getBoundingClientRect().top + outerBox.getBoundingClientRect().height / 2];
            const pointer = [Number(e.clientX), Number(e.clientY)];

            const newAngle = (Math.round(Math.atan2(pointer[1] - center[1], pointer[0] - center[0]) * 180 / Math.PI + 180)) % 360;

            setAngle(newAngle);
        }

        window.addEventListener("mousemove", mouseMove);

        return () => window.removeEventListener("mousemove", mouseMove);
    }, []);


    return (
        <div id={containerId}>
            {
                Array(nesting).fill(null).reduce((p, c, i) => {
                    return (
                        <SquareInASquare
                            {...restProps}
                            id={restProps.id + "-" + i}
                            side={scaleUpTo(side, angle, nesting - i - 1) * side}
                            angle={angle}
                            children={p}
                        />
                    );
                }, (
                    <div
                        id={restProps.id + "-inner"}
                        style={{
                            display: "flex",
                            alignItems: "stretch",
                            justifyContent: "stretch",
                            minWidth: side + "px",
                            minHeight: side + "px",
                            maxWidth: side + "px",
                            maxHeight: side + "px",
                            transform: "rotateZ(" + innerAngle() + "deg) scale(" + scaleInner(side, angle) + ")",
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

function SquareInASquare({ side, angle, children, ...restProps }) {
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
            style={{
                width: side + "px",
                height: side + "px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: outerBgColor
            }}>
            <div
                id={"mid-box-" + restProps.id}
                boxtype="mid-box"
                style={{
                    width: side * scale(side, angle) + "px",
                    height: side * scale(side, angle) + "px",
                    transform: "rotateZ(" + (45 + Number(convertAngle(angle))) + "deg)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: innerBgColor
                }}>
                {children}
            </div>
        </div>
    );

}

export default NestedSquares;

function scaleUpTo(side, angle, nesting) {
    return scale(side * scale(side, angle), angle) ** (nesting);
}

function scale(side, angle) {
    return calculateScale(side, convertAngle(angle));
}

function convertAngle(angle) {
    return -45 + (angle % 360) / 4;
}

function calculateScale(side, angle) {
    const a = side;
    const c = a * Math.tan(angle * Math.PI / 180);
    const b = Math.sqrt((a ** 2) + (c ** 2));

    return (b / (side * Math.SQRT2));
}

function randomColor() {
    const randomInt = (n) => Math.ceil(Math.random() * n + 1) - 1;
    const rgb = [0, 0, 0].map(() => randomInt(256));
    return "rgb(" + rgb.join(", ") + ")";
}