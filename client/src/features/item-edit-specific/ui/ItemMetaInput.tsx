import { DefaultOptionType } from 'antd/es/select'
import { ItemMeta, itemMetaSchema, ItemType } from '../model'
import { Form, Input, InputNumber, Select, type FormProps } from 'antd'
import { useEffect } from 'react'

type ItemMetaInputChangeEvent<T extends ItemType> = {
  data: Partial<ItemMeta<T>>
  isValid: boolean
  isComplete: boolean
}

type ItemMetaInputProps<T extends ItemType> = {
  meta: Partial<ItemMeta<T>>
  onChange?: (event: ItemMetaInputChangeEvent<T>) => void
}

// separate components for each item type
// we could generate them based on Zod schema, but that would be less flexible

const ItemMetaInputAuto = ({ meta, onChange }: ItemMetaInputProps<ItemType.AUTO>) => {
  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue(meta)
  }, [meta])

  const autoBrands = ['', 'Audi', 'Lada'].map((b): DefaultOptionType => ({ value: b }))
  const handleFieldsChange: FormProps['onFieldsChange'] = async (_, allFields) => {
    const isComplete = allFields.every((f) => f.touched)
    const { data = {}, success: isParsed } = itemMetaSchema[ItemType.AUTO].partial().safeParse(form.getFieldsValue())
    const isValid = isParsed && form.getFieldsError().flatMap((f) => f.errors).length === 0
    onChange?.({ isComplete, isValid, data })
  }

  return (
    <Form form={form} onFieldsChange={handleFieldsChange}>
      <Form.Item name="brand" label="Производитель" rules={[{ required: true, message: 'Некорректное значение' }]}>
        <Select options={autoBrands} popupMatchSelectWidth={false} />
      </Form.Item>
      <Form.Item name="model" label="Модель" rules={[{ required: true, message: 'Некорректное значение' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="year" label="Год выпуска" rules={[{ required: true, message: 'Некорректное значение' }]}>
        <InputNumber style={{ display: 'block', width: 'auto' }} />
      </Form.Item>
      <Form.Item name="mileage" label="Пробег" rules={[{ required: true, message: 'Некорректное значение' }]}>
        <InputNumber style={{ display: 'block', width: 'auto' }} />
      </Form.Item>
    </Form>
  )
}

const ItemMetaInputRealEstate = ({}: ItemMetaInputProps<ItemType.REAL_ESTATE>) => <></>
const ItemMetaInputServices = ({}: ItemMetaInputProps<ItemType.SERVICES>) => <></>

// unified interface for those components, use function instead of object to improve types
const getComponent = <T extends ItemType>(itemType: T): React.FC<ItemMetaInputProps<T>> =>
  ({
    [ItemType.REAL_ESTATE]: ItemMetaInputRealEstate,
    [ItemType.AUTO]: ItemMetaInputAuto,
    [ItemType.SERVICES]: ItemMetaInputServices,
  })[itemType]

export const ItemMetaInput = <T extends ItemType>({ itemType, ...props }: { itemType: T } & ItemMetaInputProps<T>) => {
  const Component = getComponent(itemType)
  return <Component {...props} />
}
