import { useEffect, useRef, useState } from "react";

function Squares({ side, nestAmount = 0, nestIndex = 0, children, ...restProps }) {
    const [angle, setAngle] = useState(0);
    const [outerBgColor, setOuterBgColor] = useState(randomColor());
    const [innerBgColor, setInnerBgColor] = useState(randomColor());
    const outerBox = useRef(null);

    function convertAngle(angle) {
        return angle;
    }

    function getParentAngle() {
        return Number(outerBox.current?.parentElement.style.transform.split("rotateZ(")[1].split("deg)")[0] || 0);
    }

    function getVirtualParent() {
        return Number(outerBox.current?.getBoundingClientRect());
    }

    function scale(a) {
        if (a == null) a = angle;
        return calculateScale(side, convertAngle(a));
    }

    useEffect(() => {
        setOuterBgColor(randomColor());
        setInnerBgColor(randomColor());

        const mouseMove = (e) => {
            const outerBox = document.getElementById("outer");
            const center = [outerBox.getBoundingClientRect().left + outerBox.getBoundingClientRect().width / 2, outerBox.getBoundingClientRect().top + outerBox.getBoundingClientRect().height / 2];
            const pointer = [Number(e.clientX), Number(e.clientY)];

            const newAngle = -45 + (Math.round(Math.atan2(pointer[1] - center[1], pointer[0] - center[0]) * 180 / Math.PI + 180) / 4) % 90;

            setAngle(newAngle);
        }

        window.addEventListener("mousemove", mouseMove);

        return () => window.removeEventListener("mousemove", mouseMove);
    }, []);

    function ca() {
        let a = (angle + getParentAngle());
        a = a > 45 ? 90 - a : a;
        return -a;
    }

    return (
        <>
            <div ref={outerBox} boxtype="outer-box" id={"outer"} style={{ width: side + "px", height: side + "px", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: outerBgColor }}>
                <div id="mid" style={{ width: side * scale() + "px", height: side * scale() + "px", transform: "rotateZ(" + (45 + Number(convertAngle(angle))) + "deg)", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: innerBgColor }}>
                    {nestIndex > 0 ?
                        <Squares side={side * scale()} nestAmount={nestAmount} nestIndex={nestIndex - 1}>
                            {children}
                        </Squares>
                        :
                        /* <div id="inner" style={{ backgroundColor: "white", width: (side * scale()) * scale(ca()) + "px", height: (side * scale()) * scale(ca()) + "px", transform: "rotateZ(" + (-45 + Number(-convertAngle(angle)) - getParentAngle()) + "deg)" }}> */
                        <div id="inner" style={{ backgroundColor: "white", width: (side * scale()) * scale(ca()) + "px", height: (side * scale()) * scale(ca()) + "px", transform: "rotateZ(" + (-45 + Number(-convertAngle(angle)) - getParentAngle()) + "deg)" }}>
                            <div id={"content"} style={{ height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                {angle}
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    );

}

export default Squares;


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