// types/form.ts
export interface FormState {
  name: string;
  gender: string;
  address: string;
  is_student: boolean;
  university: string;
  phone: string;
  email: string;
  with_child: boolean;
  num_of_children: number;
}

export type Errors = Partial<Record<keyof FormState, string>>;

export type ToastState = { 
  type: "success" | "error" | "info"; 
  message: string 
} | null;

export type SuccessTicket = { 
  ticket_number: string; 
  data: any 
} | null;

// Konstanta
export const MALE_CONTACT = "6289647011970";
export const FEMALE_CONTACT = "6281210736312";
export const MALE_GROUP_LINK = "https://chat.whatsapp.com/JLte0VN7DJfLGnJvR1IVbL";
export const FEMALE_GROUP_LINK = "https://chat.whatsapp.com/HJ4gFRLlAKjGRNNxOPPcLj";
export const BANK_INFO = {
  bank: "Bank Jago",
  accountName: "Adi Dwi Saputra",
  accountNumber: "506693547160"
};