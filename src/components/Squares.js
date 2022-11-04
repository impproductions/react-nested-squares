import { useEffect, useRef, useState } from "react";

function NestedSquares({ side, nestAmount = 1, children, ...restProps }) {
    const [angle, setAngle] = useState(0);

    function innerAngle() {
        return -angle * (nestAmount + 1) / 4;
    }

    function scaleInner() {
        return scaleUpTo(side, angle, nestAmount) * scale(side * scale(side, angle), angle * (nestAmount + 1));
    }

    useEffect(() => {
        const mouseMove = (e) => {
            const outerBox = document.getElementById("outer");
            const center = [outerBox.getBoundingClientRect().left + outerBox.getBoundingClientRect().width / 2, outerBox.getBoundingClientRect().top + outerBox.getBoundingClientRect().height / 2];
            const pointer = [Number(e.clientX), Number(e.clientY)];

            const newAngle = (Math.round(Math.atan2(pointer[1] - center[1], pointer[0] - center[0]) * 180 / Math.PI + 180)) % 360;

            setAngle(newAngle);
        }

        window.addEventListener("mousemove", mouseMove);

        return () => window.removeEventListener("mousemove", mouseMove);
    }, []);


    return (
        <>
            <SquareInASquare side={side} angle={angle} nestAmount={nestAmount} nestIndex={nestAmount} restProps>
                <div id="inner" style={{ border: "1px solid black", opacity: "0.2", backgroundColor: "white", minWidth: side + "px", minHeight: side + "px", maxWidth: side + "px", maxHeight: side + "px", transform: "rotateZ(" + innerAngle() + "deg) scale(" + scaleInner(side, angle) + ")", display: "flex", alignItems: "stretch", justifyContent: "stretch" }}>
                    <div id={"content"} style={{ fontSize: "25pt", border: "1px solid green", flex: "1 0 100%" }}>
                        {children}
                    </div>
                </div>
            </SquareInASquare>
        </>
    );
}

function SquareInASquare({ side, angle, nestAmount = 0, nestIndex = 0, children, ...restProps }) {
    const [outerBgColor, setOuterBgColor] = useState(randomColor());
    const [innerBgColor, setInnerBgColor] = useState(randomColor());
    const outerBox = useRef(null);

    useEffect(() => {
        setOuterBgColor(randomColor());
        setInnerBgColor(randomColor());
    }, []);

    return (
        <>
            <div ref={outerBox} boxtype="outer-box" id={"outer"} style={{ width: side + "px", height: side + "px", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: outerBgColor }}>
                <div id="mid" style={{ width: side * scale(side, angle) + "px", height: side * scale(side, angle) + "px", transform: "rotateZ(" + (45 + Number(convertAngle(angle))) + "deg)", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: innerBgColor }}>
                    {nestIndex > 0 ?
                        <SquareInASquare side={side * scale(side, angle)} angle={angle} nestAmount={nestAmount} nestIndex={nestIndex - 1}>
                            {children}
                        </SquareInASquare>
                        :
                        children
                    } <br />
                </div>
            </div>
        </>
    );

}

export default NestedSquares;

function scaleUpTo(side, angle, nestAmount) {
    return scale(side * scale(side, angle), angle) ** (nestAmount + 1);
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
    const rgb = [Math.ceil(Math.random() * 256), Math.ceil(Math.random() * 256), Math.ceil(Math.random() * 256)]
    return "rgb(" + rgb.join(", ") + ")";
}