import image from '../assets/step.png';

const sprite_width = 72;
const sprite_height = 72;

const row = 2;
const col = 4;

type Props = {
    value: number;
};

const spriteMap = new Map<number, { x: number; y: number }>([
    [-3,  { x: 0, y: 0 }],
    [-6,  { x: 1, y: 0 }],
    [2,   { x: 2, y: 0 }],
    [7,   { x: 3, y: 0 }],
    [-9,  { x: 0, y: 1 }],
    [-15, { x: 1, y: 1 }],
    [13,  { x: 2, y: 1 }],
    [16,  { x: 3, y: 1 }],
]);

const coordinates = (value: number) => spriteMap.get(value) ?? { x: 0, y: 0 };

function StepSprite({ value }: Props) {
    const coordinate = coordinates(value);
    return <div style={{
        backgroundImage: `url(${image})`,
        backgroundSize: `${sprite_width * col}px ${sprite_height * row}px`,
        backgroundPosition: `${-coordinate.x * sprite_width}px ${-coordinate.y * sprite_height}px`,
        imageRendering: 'pixelated',
        width: sprite_width,
        height: sprite_height
    }}/>;
}

export default StepSprite;
