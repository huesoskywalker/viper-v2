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
export const useUploadImagesStore = create<UploadImageStore>((set) => ({
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
}))
