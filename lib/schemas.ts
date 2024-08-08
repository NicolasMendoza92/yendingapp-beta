import { z } from 'zod'

export const CreateUserSchema = z.object({
  name: z.string({ invalid_type_error: 'Please enter a valid name' }),
  dob_day: z.string({ invalid_type_error: 'Please enter a valid day' }),
  dob_month: z.string({ invalid_type_error: 'Please enter a valid month' }),
  dob_year: z.string({ invalid_type_error: 'Please enter a valid year' }),
  about: z.string({ invalid_type_error: 'Please enter a valid about' }),
  age: z.number(),
  show_interest: z.string().transform((e) => e === 'on'),
  gender_identity: z.string({ invalid_type_error: 'Please enter a gender identity' }),
  previas_interest: z.string({ invalid_type_error: 'Please enter a valid previas interest' }),
  previas_requests: z.array(z.string()),
  previas_created: z.array(z.string()),
  url_img: z.string().optional(),
  previas: z.array(z.string())
})

export const CreateUserFromSchema = CreateUserSchema.omit({
  age: true,
  previas: true,
  previas_requests: true,
  previas_created: true
})

// Schema for Login form 
export const CreateLoginSchema = z.object({
  email: z.string().email({
    message: "Email is required"
  }),
  password: z.string().min(1, {
    message: "Password is required"
  })
})

// Schema for Register form 
export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required"
  }),
  password: z.string().min(6,{
    message:"Minimun 6 characters required"
  })
})

export const CreatePreviaSchema = z.object({
  creator: z.string(),
  date: z.string().transform((e) => new Date(e)),
  description: z.string({
    invalid_type_error: 'Please enter a valid description'
  }),
  location: z.string({ invalid_type_error: 'Please enter a valid location' }),
  images_previa_url: z.union([z.string(), z.array(z.string())]),
  participants: z.string({
    invalid_type_error: 'Please enter a valid number of participants'
  }),
  passCode: z.string(),
  place_details: z.enum(
    ['In a bar', 'In a house', 'On the beach', `We'll move`],
    { invalid_type_error: 'Please enter a valid place details' }
  ),
  show_location: z.preprocess((value) => value === 'on', z.boolean()),
  startTime: z.string({ invalid_type_error: 'Please enter a valid start time' }),
  previa_id: z.string(),
  v: z.number(),
  createdAt: z.string(),
  id: z.string(),
  updatedAt: z.string(),
  lat: z.string().optional(),
  lng: z.string().optional()
  
})

export const CreatePreviaFromSchema = CreatePreviaSchema.omit({
  previa_id: true,
  updatedAt: true,
  creator: true,
  createdAt: true,
  v: true,
  id: true,
  passCode: true
})

export const CreateRequestJoinSchema = z.object({
  intentions: z.string({ invalid_type_error: 'Please enter a valid intentions' }),
  url_img: z.union([z.string(), z.array(z.string())]).optional(),
  attendants: z.string({ invalid_type_error: 'Please enter a valid number of attendants' })
})

export const UpdatePreviaFromSchema = CreatePreviaSchema.omit({
  previa_id: true,
  updatedAt: true,
  creator: true,
  createdAt: true,
  v: true,
  id: true,
  passCode: true,
  images_previa_url: true
})
