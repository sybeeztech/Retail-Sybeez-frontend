import { create } from "zustand";

const usePerformanceStore = create((set) => ({
  goals: [],
  reviews: [],
  feedbacks: [],

  // Actions
  addGoal: (goal) =>
    set((state) => ({
      goals: [...state.goals, goal],
    })),

  updateGoal: (index, updatedGoal) =>
    set((state) => {
      const goals = [...state.goals];
      goals[index] = updatedGoal;
      return { goals };
    }),

  deleteGoal: (index) =>
    set((state) => ({
      goals: state.goals.filter((_, i) => i !== index),
    })),

  addReview: (review) =>
    set((state) => ({
      reviews: [...state.reviews, review],
    })),

  addFeedback: (fb) =>
    set((state) => ({
      feedbacks: [...state.feedbacks, fb],
    })),
}));

export default usePerformanceStore;
