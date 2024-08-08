export interface FormState {
  name: string
  dob_day: string
  dob_month: string
  dob_year: string
  about: string
  age: number
  show_interest: boolean
  gender_identity: string
  previas_interest: string
  previas_requests?: string[]
  previas_created?: string[]
  url_img?: string
  previas?: string[]
}

export interface ValidatedErrors {
  errors: Record<string, any>
  message: string
}

export type UserFormState = FormState & { user_id: string }
