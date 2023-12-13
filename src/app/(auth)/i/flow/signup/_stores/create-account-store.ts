import { create } from 'zustand'

export type FocusElement = 'email' | 'name' | 'birthDate.month'

type CreateAccountStore = {
   step: number
   prevStep: () => void
   nextStep: () => void
   redirectStep: (step: number) => void
   focusElem: FocusElement | undefined
   setFocusElem: (elem: FocusElement) => void
}

export const useCreateAccountStore = create<CreateAccountStore>((set) => ({
   step: 2,
   nextStep: () => set((state) => ({ step: state.step + 1 })),
   prevStep: () => set((state) => ({ step: state.step - 1 })),
   redirectStep: (newStep: number) => set({ step: newStep }),
   focusElem: undefined,
   setFocusElem: (elem: FocusElement) => set({ focusElem: elem }),
}))
