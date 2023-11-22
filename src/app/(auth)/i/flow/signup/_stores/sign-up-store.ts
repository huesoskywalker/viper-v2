import { create } from 'zustand'

export type FocusElement = 'email' | 'name' | 'birthDate.month'

type SignUpStore = {
   step: number
   prevStep: () => void
   nextStep: () => void
   redirectStep: (step: number) => void
   focusElem: FocusElement | undefined
   setFocusElem: (elem: FocusElement) => void
}

export const useSignUpStore = create<SignUpStore>((set) => ({
   step: 4,
   nextStep: () => set((state) => ({ step: state.step + 1 })),
   prevStep: () => set((state) => ({ step: state.step - 1 })),
   redirectStep: (newStep: number) => set({ step: newStep }),
   focusElem: undefined,
   setFocusElem: (elem: FocusElement) => set({ focusElem: elem }),
}))
