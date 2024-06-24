import { create } from "zustand";

const useGlobalData = create((set) => ({
    isDrowerOpen: false,
    setIsDrowerOpen: (isDrowerOpen) => {
        set({ isDrowerOpen })
    },

}))


export default useGlobalData;