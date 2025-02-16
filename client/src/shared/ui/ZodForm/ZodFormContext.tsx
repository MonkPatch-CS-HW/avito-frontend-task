import { createContext } from 'react'
import { z, AnyZodObject } from 'zod'

// move context to separate file (here) to avoid bugs with live reload...
export const ZodFormContext = createContext<{ schema: AnyZodObject }>({ schema: z.object({}) })
