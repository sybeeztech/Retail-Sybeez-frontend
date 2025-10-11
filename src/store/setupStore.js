import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useSetupStore = create(
  persist(
    (set, get) => ({
      // Setup progress tracking
      currentStep: 1,
      totalSteps: 5,
      isSetupComplete: false,
      showWelcome: false,
      
      // Setup data for each step
      setupData: {
        step1: { purpose: '', role: '' },
        step2: { businessName: '', businessType: '', industry: '' },
        step3: { 
          businessName: '',
          address: '', 
          city: '', 
          state: '', 
          pincode: '', 
          phone: '',
          email: '',
          logo: null,
          logoPreview: null,
          gstNumber: '' 
        },
        step4: { teamSize: '', departments: [] },
        step5: { preferences: {} },
        step9: { review: true, terms: false }
      },

      // Animation and UI state
      animationsEnabled: true,
      transitionDirection: 'forward', // 'forward' or 'backward'

      // Actions
      setCurrentStep: (step) => set({ currentStep: step }),
      
      setStepData: (stepData) => set((state) => ({
        setupData: {
          ...state.setupData,
          [`step${state.currentStep}`]: {
            ...state.setupData[`step${state.currentStep}`],
            ...stepData
          }
        }
      })),

      // Direct step data update functions
      updateStep3Data: (data) => set((state) => ({
        setupData: {
          ...state.setupData,
          step3: {
            ...state.setupData.step3,
            ...data
          }
        }
      })),

      nextStep: () => set((state) => ({
        currentStep: Math.min(state.currentStep + 1, state.totalSteps),
        transitionDirection: 'forward'
      })),

      prevStep: () => set((state) => ({
        currentStep: Math.max(state.currentStep - 1, 1),
        transitionDirection: 'backward'
      })),

      goToStep: (step) => set((state) => ({ 
        currentStep: step,
        transitionDirection: step > state.currentStep ? 'forward' : 'backward'
      })),

      toggleAnimations: () => set((state) => ({
        animationsEnabled: !state.animationsEnabled
      })),

      completeSetup: () => set({ 
        isSetupComplete: true,
        showWelcome: true,
        currentStep: 1 // Reset for future use
      }),

      resetSetup: () => set({
        currentStep: 1,
        isSetupComplete: false,
        showWelcome: false,
        setupData: {
          step1: { purpose: '', role: '' },
          step2: { businessName: '', businessType: '', industry: '' },
          step3: { address: '', city: '', state: '', pincode: '', gstNumber: '' },
          step4: { teamSize: '', departments: [] },
          step5: { features: [], priorities: [] },
          step9: { review: true, terms: false }
        }
      }),

      // Welcome management
      dismissWelcome: () => set({ showWelcome: false }),

      // Helper functions
      getStepData: (step) => get().setupData[`step${step}`],
      
      isStepComplete: (step) => {
        const stepData = get().setupData[`step${step}`];
        if (!stepData) return false;
        
        // Check if step has required data
        switch (step) {
          case 1:
            return stepData.purpose && stepData.role;
          case 2:
            return stepData.businessName && stepData.businessType;
          case 3:
            return stepData.address && stepData.city;
          case 9:
            return stepData.terms;
          default:
            return Object.values(stepData).some(value => 
              Array.isArray(value) ? value.length > 0 : value
            );
        }
      },

      getProgress: () => {
        const state = get();
        let completedSteps = 0;
        for (let i = 1; i <= state.currentStep - 1; i++) {
          if (state.isStepComplete(i)) {
            completedSteps++;
          }
        }
        return (completedSteps / state.totalSteps) * 100;
      }
    }),
    {
      name: 'retail-setup-storage', // localStorage key
      version: 1,
    }
  )
);