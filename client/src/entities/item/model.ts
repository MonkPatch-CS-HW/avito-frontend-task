import { compileFilter, Filter, invertFilter } from '@/shared/lib/filter'
import { z } from 'zod'

export enum ItemType {
  REAL_ESTATE = 'Недвижимость',
  AUTO = 'Авто',
  SERVICES = 'Услуги',
}

export const baseItemSchema = z.object({
  name: z.string().nonempty('Название не должно быть пустым'),
  description: z.string().nonempty('Описание не должно быть пустым'),
  location: z.string().nonempty('Расположение не должно быть пустым'),
  type: z.string().nonempty('Тип не должен быть пустым'),
  image: z.string().optional(),
})

export type BaseItem = z.infer<typeof baseItemSchema>

export const itemMetaSchema = {
  [ItemType.REAL_ESTATE]: z.object({
    propertyType: z.string(),
    area: z.number({ message: 'Площадь не должна быть пустой' }),
    rooms: z.number({ message: 'Количество комнат не должно быть пустым' }),
    price: z.number({ message: 'Цена не должна быть пустой' }),
  }),
  [ItemType.AUTO]: z.object({
    brand: z.string(),
    model: z.string(),
    year: z.number({ message: 'Год не должен быть пустым' }),
    mileage: z.number().optional(),
  }),
  [ItemType.SERVICES]: z.object({
    serviceType: z.string(),
    experience: z.number({ message: 'Опыт не должен быть пустым' }),
    cost: z.number(),
    workSchedule: z.string().optional(),
  }),
}

export type ItemMeta<T extends ItemType> = z.infer<(typeof itemMetaSchema)[T]>

const inputItemSchemaSpecific = (itemType: ItemType) =>
  baseItemSchema.extend({ type: z.literal(itemType) }).merge(itemMetaSchema[itemType])

export const inputItemSchema = z.discriminatedUnion('type', [
  inputItemSchemaSpecific(ItemType.REAL_ESTATE),
  inputItemSchemaSpecific(ItemType.AUTO),
  inputItemSchemaSpecific(ItemType.SERVICES),
])
export type InputItem = z.infer<typeof inputItemSchema>

export const itemSchema = inputItemSchema.and(z.object({ id: z.number() }))
export type Item = z.infer<typeof itemSchema>

export const itemKeysFilter = {
  general: compileFilter(Object.keys(baseItemSchema.shape)),
  categorial: invertFilter(Object.keys(baseItemSchema.shape)),
}
