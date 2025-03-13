import { create } from "zustand";

export type Guest = {
  _id: string;
  nome: string;
  celular: number;
  confirmado: 'pendente' | 'confirmado' | 'nao';
};

export type GuestsStore = {
  guests: Guest[];
  setGuests: (guests: Guest[]) => void;
  addGuest: (guest: Guest) => void;
  removeGuestById: (id: string) => void;
  editGuestById: (id: string, updatedGuest: Partial<Guest>) => void;
  findGuestById: (id: string) => void
};

export const useGuestsStore = create<GuestsStore>((set, get) => ({
  guests: [],
  setGuests: (guests: Guest[]) => set({ guests }),
  addGuest: (guest: Guest) => set((state) => ({
    guests: [...state.guests, guest],
  })),
  removeGuestById: (id: string) => set((state) => ({
    guests: state.guests.filter((_, index) => index.toString() !== id),
  })),
  editGuestById: (id: string, updatedGuest: Partial<Guest>) => set((state) => ({
    guests: state.guests.map((guest, index) =>
      index.toString() === id ? { ...guest, ...updatedGuest } : guest,
    ),
  })),
  findGuestById: (id: string) => get().guests.find(item => item._id === id)
}));
