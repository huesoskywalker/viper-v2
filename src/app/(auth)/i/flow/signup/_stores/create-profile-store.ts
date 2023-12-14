import { create } from 'zustand'

type ImageStore = {
   profile: File[] | null
   background: File[] | null
   event: File[] | null
}
type UploadImageStore = {
   images: ImageStore
   setImages: (newImages: File | File[], type: 'profile' | 'background' | 'event') => void
   removeImages: (type: 'profile' | 'background' | 'event') => void
}

type SelectInterests = {
   interests: number
   setInterest: () => void
   removeInterest: () => void
   clearInterests: () => void
}

type CreateProfileStore = UploadImageStore & SelectInterests

export const useCreateProfileStore = create<CreateProfileStore>((set) => ({
   images: {
      profile: null,
      background: null,
      event: null,
   },
   setImages: (newImages, type) =>
      set((state) => ({
         images: {
            ...state.images,
            [type]: newImages,
         },
      })),
   removeImages: (type: 'profile' | 'background' | 'event') =>
      set((state) => ({ images: { ...state.images, [type]: null } })),

   interests: 0,
   setInterest: () =>
      set((state) => ({
         interests: state.interests + 1,
      })),
   removeInterest: () =>
      set((state) => ({
         interests: state.interests - 1,
      })),
   clearInterests: () => set({ interests: 0 }),
}))
