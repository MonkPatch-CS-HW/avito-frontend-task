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

export const itemSchema = z.union([itemRealEstateSchema, itemAutoSchema, itemServiceSchema])

export type Item = z.infer<typeof itemSchema>
