import { create } from "zustand";


let store = {
    currentLang: "Uz",
    setCurrentLang: () => {}
}

let useMyStore = create((set)=> ({
    currentLang: "Uz",
    setCurrentLang: (lang) => set({
        currentLang: lang
    })
}))

export default useMyStore