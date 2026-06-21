import { Button, Container, Divider, Paper, Slider, Stack, TextField, Typography } from "@mui/material"
import StepSprite from "../components/StepSprite"
import Conditions from "../components/Conditions"
import DialogStorage from "../components/DialogStorage"
import DialogSaveItem from "../components/DialogSaveItem"
import { useMemo, useState } from "react"
import { getTrace, MathError, steps } from "../logic/math"
import { type Item } from "../logic/storage"


function Anvil() {
    const [conditions, setConditions] = useState<number[]>([]);
    const [fromPoints, setFromPoints] = useState<number>(0);
    const [toPoints, setToPoints] = useState<number>(140);
    const [storageOpen, setStorageOpen] = useState<boolean>(false);
    const [saveOpen, setSaveOpen] = useState<boolean>(false);

    const trace = useMemo(() => {
        try {
            return getTrace(fromPoints, toPoints - conditions.reduce((a, b) => a + b, 0));
        } catch (e) {
            if (e instanceof MathError) {
                return [];
            }
            throw e;
        }
    }, [fromPoints, toPoints, conditions]);

    const addCondition = (value: number) => {
        if (conditions.length < 3) {
            setConditions([...conditions, value]);
        } else {
            setConditions([...conditions.slice(1), value]);
        }
    }

    const closeFromStorage = (item: Item | null) => {
        setStorageOpen(false);
        if (!item) return;
        setFromPoints(item.fromPoints);
        setToPoints(item.toPoints);
        setConditions(item.conditions);
    }

    return (
        <Container
            maxWidth="lg"
            sx={{ marginTop: 4, marginBottom: 4, paddingBottom: 4, paddingTop: 4 }}
        >
            <DialogStorage open={storageOpen} onClose={closeFromStorage} />
            <DialogSaveItem 
                open={saveOpen}
                onClose={() => setSaveOpen(false)}
                fromPoints={fromPoints}
                toPoints={toPoints}
                conditions={conditions}
            />
            <Paper elevation={4} sx={{ padding: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Калькулятор ковки шагов
                </Typography>
                <Stack direction="row" spacing={4} flexShrink={0}>
                    <Stack alignItems={"center"}>
                        <Conditions conditions={conditions} />
                        {[0, 1].map((rowIndex) => (
                            <Stack key={rowIndex} direction="row">
                                {steps.slice(rowIndex * 4, rowIndex * 4 + 4).map((value, index) => (
                                    <Button key={index} variant="text" onClick={() => addCondition(value)} aria-label={`Add condition ${value}`} sx={{ padding: 1 }}>
                                        <StepSprite value={value} />
                                    </Button>
                                ))}
                            </Stack>)
                        )}
                    </Stack>
                    <Stack spacing={2} flexShrink={0}>
                        <Button color="error" variant="outlined" onClick={() => setConditions([])}>Стереть условия</Button>
                        <Slider 
                            aria-label="From Points"
                            min={0}
                            max={140}
                            valueLabelDisplay="auto"
                            value={[fromPoints, toPoints]}
                            onChange={(_, newValue) => {
                                const [from, to] = newValue as number[];
                                setFromPoints(from);
                                setToPoints(to);
                            }}
                        />
                        <TextField label="От" type="number" value={fromPoints} onChange={(e) => setFromPoints(Number(e.target.value))} />
                        <TextField label="До" type="number" value={toPoints} onChange={(e) => setToPoints(Number(e.target.value))} />
                        <Divider/>
                        <Stack gap={2} direction="row">
                            <Button variant="outlined" onClick={() => setSaveOpen(true)}>Сохранить</Button>
                            <Button variant="outlined" onClick={() => setStorageOpen(true)}>Сохранённые расчёты</Button>
                        </Stack>
                    </Stack>
                    <Stack>
                        <Typography variant="h6" component="h2" gutterBottom>
                            Шаги:
                        </Typography>
                        <Stack direction="row" flexWrap={"wrap"} width="100%">
                            {trace.map((value, index) => (
                                <StepSprite key={index} value={value} />
                            ))}
                            {conditions.map((value, index) => (
                                <StepSprite key={index} value={value} />
                            ))}
                        </Stack>
                    </Stack>
                </Stack>
            </Paper>
        </Container>
    )
}

export default Anvil
