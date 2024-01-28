import { create } from "zustand";

type FormState = {
  from: {
    id: string;
    name: string;
  };
  to: { id: string; name: string };
  departureDate: string;
  returnDate?: string;
  updateForm: (newFormState: Partial<FormState>) => void;
};

export const useFormStore = create<FormState>((set) => ({
  from: { id: "", name: "" },
  to: { id: "", name: "" },
  departureDate: "",
  returnDate: "",
  updateForm: (newFormState) => set((state) => ({ ...state, ...newFormState })),
}));
