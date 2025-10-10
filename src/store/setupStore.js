import { create } from 'zustand';

export const useSetupStore = create((set) => ({
  stepData: {},
  setStepData: (data) => set((state) => ({
    stepData: { ...state.stepData, ...data }
  })),
  clearStepData: () => set({ stepData: {} }),
}));