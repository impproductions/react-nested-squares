export function scaleUpTo(side, angle, nesting) {
    return scale(side * scale(side, angle), angle) ** (nesting);
}

export function scale(side, angle) {
    return calculateScale(side, convertAngle(angle));
}

export function convertAngle(angle) {
    return -45 + (angle % 360) / 4;
}

export function calculateScale(side, angle) {
    const a = side;
    const c = a * Math.tan(angle * Math.PI / 180);
    const b = Math.sqrt((a ** 2) + (c ** 2));

    return (b / (side * Math.SQRT2));
}

export function randomColor() {
    const randomInt = (n) => Math.ceil(Math.random() * n + 1) - 1;
    const rgb = [0, 0, 0].map(() => randomInt(256));
    return "rgb(" + rgb.join(", ") + ")";
}