import { Dialog, DialogContent, DialogTitle, IconButton, List, ListItem, ListItemButton } from "@mui/material"
import { useEffect, useState } from "react"
import { deleteItem, loadItems, type Item } from "../logic/storage"
import DeleteIcon from '@mui/icons-material/Delete';

type Props = {
    open: boolean;
    onClose: (item: Item | null) => void;
};

function DialogStorage({ open, onClose }: Props) {
    const [items, setItems] = useState(() => loadItems());

    useEffect(() => {
        if (!open) return;
        setItems(loadItems());
    }, [open]);

    const del = (id: number) => {
        deleteItem(id);
        setItems(loadItems());
    };

    return (
        <Dialog open={open} onClose={() => onClose(null)} maxWidth="sm" fullWidth>
            <DialogTitle>Сохранённые расчёты</DialogTitle>
            <DialogContent>
                <List sx={{ pt: 0 }}>
                    {items.map((item) => (
                        <ListItem disablePadding key={item.id} secondaryAction={
                            <IconButton edge="end" aria-label="delete" onClick={() => del(item.id)}>
                                <DeleteIcon />
                            </IconButton>
                        }>
                            <ListItemButton onClick={() => onClose(item)}>
                                {item.name} (Из: {item.fromPoints}, В: {item.toPoints}, условия: {item.conditions.join(', ')})
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </DialogContent>
        </Dialog>
    );
}

export default DialogStorage;
