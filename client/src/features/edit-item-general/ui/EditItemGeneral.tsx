import { Form, Input, Select } from 'antd'
import { baseItemSchema, ItemType, type BaseItem } from '@/entities/item'
import { useCallback, useEffect } from 'react'

export type EditItemGeneral<T extends BaseItem> = {
  item?: Partial<T>
  onChange?: (event: { item: Partial<T>; isValid: boolean }) => void
}

// this component contract would sound like "view over a `general properties` slice of the item"
export const EditItemGeneral = <T extends BaseItem>(props: EditItemGeneral<T>) => {
  const [form] = Form.useForm<Partial<BaseItem>>()

  useEffect(() => {
    if (props.item) form.setFieldsValue(props.item)
  }, [props.item])

  const onValuesChange = useCallback(() => {
    const values = form.getFieldsValue()
    const errors: { [Key in keyof BaseItem]?: string } = {}
    const { error } = baseItemSchema.safeParse(values)
    if (error) {
      for (const err of error.errors) {
        const key = err.path.shift()
        if (!key || typeof values[key as keyof BaseItem] === 'undefined') continue
        const name = key as keyof BaseItem
        errors[name] = err.message
      }
    }
    const fields: Parameters<typeof form.setFields>[0] = []
    for (const key in values) {
      const name = key as keyof typeof values
      const value = values[name]
      fields.push({ name, value, errors: errors[name] ? [errors[name]] : [] })
    }
    form.setFields(fields)
  }, [form, props.onChange])

  return (
    <Form form={form} onValuesChange={onValuesChange}>
      <Form.Item name="name" label="Название" required>
        <Input />
      </Form.Item>
      <Form.Item name="description" label="Описание" required>
        <Input />
      </Form.Item>
      <Form.Item name="location" label="Расположение" required>
        <Input />
      </Form.Item>
      <Form.Item name="image" label="Ссылка на картинку">
        <Input />
      </Form.Item>
      <Form.Item name="type" label="Категория" required>
        <Select options={Object.values(ItemType).map((value) => ({ value }))} />
      </Form.Item>
    </Form>
  )
}
