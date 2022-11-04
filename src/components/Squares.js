import { useEffect, useRef, useState } from "react";

function NestedSquares({ side, nestAmount = 1, children, ...restProps }) {
    return (
        <>
            <Squares side={side} nestAmount={nestAmount} nestIndex={nestAmount} restProps>
                {children}
            </Squares>
        </>
    );
}

function Squares({ side, nestAmount = 1, nestIndex = 0, children, ...restProps }) {
    const [angle, setAngle] = useState(0);
    const [outerBgColor, setOuterBgColor] = useState(randomColor());
    const [innerBgColor, setInnerBgColor] = useState(randomColor());
    const outerBox = useRef(null);

    function convertAngle(angle) {
        return -45 + (angle % 360) / 4;
    }

    // function getParentAngle() {
    //     return Number(outerBox.current?.parentElement.style.transform.split("rotateZ(")[1].split("deg)")[0] || 0);
    // }

    function scale(a) {
        return calculateScale(side, convertAngle(a));
    }

    useEffect(() => {
        setOuterBgColor(randomColor());
        setInnerBgColor(randomColor());

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

    // function ca() {
    //     let a = (angle + getParentAngle());
    //     a = a > 45 ? 90 - a : a;
    //     return -a;
    // }

    function innerAngle() {
        return -angle * (nestAmount + 1) / 4;
    }

    return (
        <>
            <div ref={outerBox} boxtype="outer-box" id={"outer"} style={{ width: side + "px", height: side + "px", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: outerBgColor }}>
                <div id="mid" style={{ width: side * scale(angle) + "px", height: side * scale(angle) + "px", transform: "rotateZ(" + (45 + Number(convertAngle(angle))) + "deg)", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: innerBgColor }}>
                {/* <div id="mid" style={{ width: side * scale(angle) + "px", height: side * scale(angle) + "px", transform: "rotateZ(" + (45 + Number(convertAngle(angle))) + "deg)", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: innerBgColor }}> */}
                    {nestIndex > 0 ?
                        <Squares side={side * scale(angle)} nestAmount={nestAmount} nestIndex={nestIndex - 1}>
                            {children}
                        </Squares>
                        :
                        <div id="inner" style={{ border: "1px solid black", opacity: "0.2", backgroundColor: "white", minWidth: side + "px", minHeight: side + "px", maxWidth: side + "px", maxHeight: side + "px", transform: "rotateZ(" + innerAngle() + "deg) scale(" + scale(angle) * scale(angle * (nestAmount + 1)) + ")", display: "flex", alignItems: "stretch", justifyContent: "stretch" }}>
                        {/* <div id="inner" style={{ border: "1px solid black", backgroundColor: "white", width: (side * scale(angle)) * scale(angle * (nestAmount + 1)) + "px", height: ((side * scale(angle)) * scale(angle * (nestAmount + 1))) + "px", transform: "rotateZ(" + innerAngle() + "deg)", display: "flex", alignItems: "center", justifyContent: "center" }}> */}
                            <div id={"content"} style={{ border: "1px solid green", flex: "1 0 100%" }}>
                                {children}
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    );

}

export default NestedSquares;


function calculateScale(side, angle) {
    const a = side;
    const c = a * Math.tan(angle * Math.PI / 180);
    const b = Math.sqrt((a ** 2) + (c ** 2));


    return (b / (side * Math.SQRT2));
    // return (b / (side * Math.SQRT2)) * side;
}

function randomColor() {
    const rgb = [Math.ceil(Math.random() * 256), Math.ceil(Math.random() * 256), Math.ceil(Math.random() * 256)]
    return "rgb(" + rgb.join(", ") + ")";
}