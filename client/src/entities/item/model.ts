import { z } from 'zod'

const baseItemSchema = z.object({
  name: z.string(),
  description: z.string(),
  location: z.string(),
  type: z.string(),
  image: z.string(),
})

const itemRealEstateSchema = baseItemSchema.extend({
  type: z.literal('Недвижимость'),
  propertyType: z.string(),
  area: z.number(),
  rooms: z.number(),
  price: z.number(),
})

const itemAutoSchema = baseItemSchema.extend({
  type: z.literal('Авто'),
  brand: z.string(),
  model: z.string(),
  year: z.string(),
  mileage: z.number(),
})

const itemServiceSchema = baseItemSchema.extend({
  type: z.literal('Услуги'),
  serviceType: z.string(),
  experience: z.number(),
  cost: z.number(),
  workSchedule: z.string(),
})

export const inputItemSchema = z.union([itemRealEstateSchema, itemAutoSchema, itemServiceSchema])
export type InputItem = z.infer<typeof inputItemSchema>

export const itemSchema = inputItemSchema.and(z.object({ id: z.number() }))
export type Item = z.infer<typeof itemSchema>
