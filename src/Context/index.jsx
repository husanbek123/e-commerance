import { create } from "zustand";
import { persist } from 'zustand/middleware'

let Store = (set)=> ({
    currentLang: "Uz",
    setCurrentLang: (lang) => set({
        currentLang: lang
    })
})

let NewStore = (set, get) => ({
    currentLang: "uz",
    Notes: [],
    setCurrentLang: (lang) => set({
        currentLang: lang
    }),
    setNotes: (notes) => set({
        Notes: notes 
    }),
    addNote: (note) => set({
        Notes: [...get().Notes, note]
    })
})

let useMyStore = create(persist(NewStore, {
    name: "Store"
}))
export default useMyStore