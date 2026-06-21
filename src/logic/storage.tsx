import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Item = {
    id: number;
    name: string;
    conditions: number[];
    fromPoints: number;
    toPoints: number;
};

type StorageState = {
    items: Item[];
    addItem: (name: string, conditions: number[], fromPoints: number, toPoints: number) => void;
    removeItem: (id: number) => void;
};

export const useStorage = create<StorageState>()(
    persist(
        (set) => ({
            items: [],
            addItem: (name, conditions, fromPoints, toPoints) =>
                set((state) => ({
                    items: [
                        ...state.items,
                        { id: Date.now(), name, conditions, fromPoints, toPoints },
                    ],
                })),
            removeItem: (id) =>
                set((state) => ({
                    items: state.items.filter((item) => item.id !== id),
                })),
        }),
        { name: 'anvil_storage_items' }
    )
);
