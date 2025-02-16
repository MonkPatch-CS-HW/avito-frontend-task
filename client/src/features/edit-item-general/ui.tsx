import { Input, Select } from 'antd'
import { baseItemSchema, ItemType, type BaseItem } from '@/entities/item'
import { ViewProps, ZodForm } from '@/shared/ui'

// this component contract would sound like "view over a `general properties` slice of the item"
export const EditItemGeneral = <T extends BaseItem>(props: ViewProps<T>) => {
  return (
    <ZodForm schema={baseItemSchema} {...props}>
      <ZodForm.Item name="name">
        <Input />
      </ZodForm.Item>
      <ZodForm.Item name="description">
        <Input />
      </ZodForm.Item>
      <ZodForm.Item name="location">
        <Input />
      </ZodForm.Item>
      <ZodForm.Item name="image">
        <Input />
      </ZodForm.Item>
      <ZodForm.Item name="type">
        <Select options={Object.values(ItemType).map((value) => ({ value }))} />
      </ZodForm.Item>
    </ZodForm>
  )
}
