import { create } from "zustand";
import { persist } from 'zustand/middleware'

let Store = (set)=> ({
    currentLang: "Uz",
    setCurrentLang: (lang) => set({
        currentLang: lang
    }),
})

let NewStore = (set, get) => ({
    isAdminLoggedIn: false,
    currentLang: "uz",
    Notes: [],
    token: null,
    user: null,
    currentFont: "Manrope",
    setCurrentLang: (lang) => set({
        currentLang: lang
    }),
    setNotes: (notes) => set({
        Notes: notes 
    }),
    addNote: (note) => set({
        Notes: [...get().Notes, note]
    }),
    setIsAdminLoggedIn: (boolean) => set({
        isAdminLoggedIn: boolean
    }),
    setCurrentFont: (font) => set({
        currentFont: font
    }),
    setToken: (token) => set({
        token: token
    }),
    setUser: (user) => set({
        user: user
    })

})
let useMyStore = create(persist(NewStore, {
    name: "Store"
}))
export default useMyStore