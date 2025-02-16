import { z } from 'zod'

export enum ItemType {
  REAL_ESTATE = 'Недвижимость',
  AUTO = 'Авто',
  SERVICES = 'Услуги',
}

export const baseItemSchema = z.object({
  name: z.string().describe('Название').nonempty('Название не должно быть пустым'),
  description: z.string().describe('Описание').nonempty('Описание не должно быть пустым'),
  location: z.string().describe('Расположение').nonempty('Расположение не должно быть пустым'),
  type: z.string().describe('Тип').nonempty('Тип не должен быть пустым'),
  image: z.string().describe('Картинка').optional(),
})

export type BaseItem = z.infer<typeof baseItemSchema>

export const itemMetaSchema = {
  [ItemType.REAL_ESTATE]: z.object({
    propertyType: z.string().describe('Тип недвижимости'),
    area: z.number({ message: 'Площадь не должна быть пустой' }).describe('Площадь'),
    rooms: z.number({ message: 'Количество комнат не должно быть пустым' }).describe('Количество комнат'),
    price: z.number({ message: 'Цена не должна быть пустой' }).describe('Цена'),
  }),
  [ItemType.AUTO]: z.object({
    brand: z.string().describe('Производитель'),
    model: z.string().describe('Модель'),
    year: z.number({ message: 'Год не должен быть пустым' }).describe('Год'),
    mileage: z.number({ message: 'Пробег не должен быть пустым' }).describe('Пробег').optional(),
  }),
  [ItemType.SERVICES]: z.object({
    serviceType: z.string().describe('Тип услуги'),
    experience: z.number({ message: 'Опыт не должен быть пустым' }).describe('Опыт работы'),
    cost: z.number().describe('Стоимость'),
    workSchedule: z.string().describe('График').optional(),
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
