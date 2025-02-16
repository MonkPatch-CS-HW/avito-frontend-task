import { z } from 'zod'

export enum ItemType {
  REAL_ESTATE = 'Недвижимость',
  AUTO = 'Авто',
  SERVICES = 'Услуги',
}

const baseItemSchema = z.object({
  name: z.string(),
  description: z.string(),
  location: z.string(),
  type: z.string(),
  image: z.string(),
})

const itemMetaSchema = {
  [ItemType.REAL_ESTATE]: z.object({
    propertyType: z.string(),
    area: z.number(),
    rooms: z.number(),
    price: z.number(),
  }),
  [ItemType.AUTO]: z.object({
    brand: z.string(),
    model: z.string(),
    year: z.string(),
    mileage: z.number(),
  }),
  [ItemType.SERVICES]: z.object({
    serviceType: z.string(),
    experience: z.number(),
    cost: z.number(),
    workSchedule: z.string(),
  }),
}

export type ItemMeta<T extends ItemType> = z.infer<(typeof itemMetaSchema)[T]>

export const inputItemSchema = z.discriminatedUnion('type', [
  baseItemSchema.extend({ type: z.literal(ItemType.REAL_ESTATE) }).merge(itemMetaSchema[ItemType.REAL_ESTATE]),
  baseItemSchema.extend({ type: z.literal(ItemType.AUTO) }).merge(itemMetaSchema[ItemType.AUTO]),
  baseItemSchema.extend({ type: z.literal(ItemType.SERVICES) }).merge(itemMetaSchema[ItemType.SERVICES]),
])
export type InputItem = z.infer<typeof inputItemSchema>

export type PartialInputItem = Partial<InputItem>

export const itemSchema = inputItemSchema.and(z.object({ id: z.number() }))
export type Item = z.infer<typeof itemSchema>
