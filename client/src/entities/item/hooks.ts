import { Path, useForm } from 'react-hook-form'
import { InputItem, ItemType } from '@/entities/item'
import { UniversalControlProps } from '@/shared/ui'
import { useState } from 'react'

type MetaType = Partial<Record<Path<InputItem>, UniversalControlProps<InputItem, Path<InputItem>>>>

export const useItemForm = (
  props: Parameters<typeof useForm>[0],
  filter: { general?: boolean; categorial?: boolean },
  fetchValues: boolean = false,
): ReturnType<typeof useForm> & { meta: MetaType } => {
  // preserve value of fetchValues
  // this is the property that prompts, for example, to download
  const [_fetchValues] = useState(fetchValues)
  const { general = !filter.categorial, categorial = !filter.general } = filter
  const methods = useForm(props)
  const itemType: ItemType | undefined = methods.watch('type')
  const meta: MetaType = {}
  const itemTypes = Object.fromEntries(Object.entries(ItemType).map(([, value]) => [value, value]))
  if (general) {
    meta.name = { name: 'name', description: 'Название', type: 'text' }
    meta.location = { name: 'location', description: 'Расположение', type: 'text' }
    meta.description = { name: 'description', description: 'Описание', type: 'text' }
    meta.type = { name: 'type', description: 'Тип объявления', type: 'select', values: itemTypes }
  }
  if (categorial) {
    if (itemType === ItemType.REAL_ESTATE) {
      meta.propertyType = {
        name: 'propertyType',
        type: 'select',
        values: { Квартира: 'Квартира' },
        description: 'Тип недвижимости',
      }
      meta.area = { name: 'area', type: 'number', description: 'Площадь' }
      meta.rooms = { name: 'rooms', type: 'number', description: 'Количество комнат' }
      meta.price = { name: 'price', type: 'number', description: 'Цена' }
    }
    if (itemType === ItemType.AUTO) {
      meta.brand = {
        name: 'brand',
        description: 'Производитель',
        type: 'select',
        values: { Lada: 'Lada', Audi: 'Audi' },
      }
      meta.model = { name: 'model', description: 'Модель', type: 'text' }
      meta.year = { name: 'year', description: 'Год выпуска', type: 'number' }
      meta.mileage = { name: 'mileage', description: 'Пробег', type: 'number' }
    }
    if (itemType === ItemType.SERVICES) {
      meta.serviceType = {
        name: 'serviceType',
        description: 'Тип услуги',
        type: 'select',
        values: { Уборка: 'Уборка', Стройка: 'Стройка' },
      }
      meta.experience = { name: 'experience', description: 'Опыт работы', type: 'number' }
      meta.cost = { name: 'cost', description: 'Стоимость услуги', type: 'number' }
      meta.workSchedule = { name: 'workSchedule', description: 'График работы', type: 'text' }
    }
  }
  return { ...methods, meta }
}
