import { Stack } from '@mui/material';
import image from '../assets/conditions.png';
import StepSprite from './StepSprite';
import { useMemo } from 'react';

const sprite_width = 352;
const sprite_height = 120;

type Props = {
    conditions: number[];
};

function Conditions({ conditions }: Props) {
    const reversed = useMemo(() => [...conditions].reverse(), [conditions]);
    return <Stack
        direction="row"
        spacing="36px"
        sx={{
            backgroundImage: `url(${image})`,
            width: sprite_width,
            height: sprite_height,
            imageRendering: 'pixelated',
            paddingX: '32px',
            paddingTop: '36px',
        }}
    >
        {reversed.map((value, index) => (
            <StepSprite key={index} value={value} />
        ))}
    </Stack>;
}

export default Conditions;
