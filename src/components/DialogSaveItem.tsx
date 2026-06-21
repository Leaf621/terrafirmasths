import { Button, Dialog, DialogContent, DialogTitle, Stack, TextField } from "@mui/material"
import { useRef } from "react"
import { createItem, saveItem } from "../logic/storage"

type Props = {
    open: boolean;
    onClose: () => void;
    fromPoints: number;
    toPoints: number;
    conditions: number[];
};

function DialogSaveItem({ open, onClose, fromPoints, toPoints, conditions }: Props) {
    const name = useRef<HTMLInputElement>(null);

    const handleSubmit = (event: React.FormEvent) => {
        if (!name.current) return;
        event.preventDefault();
        const item = createItem(
            name.current.value,
            conditions,
            fromPoints,
            toPoints
        );
        saveItem(item);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Сохранить расчёт</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2} sx={{ marginTop: 1 }}>
                        <TextField required label="Название" fullWidth inputRef={name} />
                        <Button variant="contained" type="submit">Сохранить</Button>
                    </Stack>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default DialogSaveItem;
