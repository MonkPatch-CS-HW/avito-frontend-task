import { Input, InputNumber, Select } from 'antd'
import { ViewProps, ZodForm } from '@/shared/ui'
import { ItemMeta, itemMetaSchema, ItemType } from '@/entities/item'
import { ReactNode } from 'react'

const EditItemSpecificAuto = (props: ViewProps<ItemMeta<ItemType.AUTO>>): ReactNode => {
  // can be fetched right here using RTK Query in production, for example
  const autoBrands = [{ value: 'Lada' }, { value: 'Volkswagen' }]
  return (
    <ZodForm schema={itemMetaSchema[ItemType.AUTO]} {...props}>
      <ZodForm.Item name="brand">
        <Select options={autoBrands} popupMatchSelectWidth={false} />
      </ZodForm.Item>
      <ZodForm.Item name="model">
        <Input />
      </ZodForm.Item>
      <ZodForm.Item name="year">
        <InputNumber style={{ display: 'block', width: 'auto' }} />
      </ZodForm.Item>
      <ZodForm.Item name="mileage">
        <InputNumber style={{ display: 'block', width: 'auto' }} />
      </ZodForm.Item>
    </ZodForm>
  )
}

const EditItemSpecificRealEstate = (props: ViewProps<ItemMeta<ItemType.REAL_ESTATE>>): ReactNode => {
  const propertyTypes = [{ value: 'Квартира' }, { value: 'Комната' }]
  return (
    <ZodForm schema={itemMetaSchema[ItemType.REAL_ESTATE]} {...props}>
      <ZodForm.Item name="propertyType">
        <Select options={propertyTypes} popupMatchSelectWidth={false} />
      </ZodForm.Item>
      <ZodForm.Item name="area">
        <InputNumber style={{ display: 'block', width: 'auto' }} />
      </ZodForm.Item>
      <ZodForm.Item name="rooms">
        <InputNumber style={{ display: 'block', width: 'auto' }} />
      </ZodForm.Item>
      <ZodForm.Item name="price">
        <InputNumber style={{ display: 'block', width: 'auto' }} />
      </ZodForm.Item>
    </ZodForm>
  )
}
const EditItemSpecificServices = (props: ViewProps<ItemMeta<ItemType.SERVICES>>): ReactNode => {
  const serviceTypes = [{ value: 'Уборка' }, { value: 'Стройка' }]
  return (
    <ZodForm schema={itemMetaSchema[ItemType.REAL_ESTATE]} {...props}>
      <ZodForm.Item name="serviceType">
        <Select options={serviceTypes} popupMatchSelectWidth={false} />
      </ZodForm.Item>
      <ZodForm.Item name="experience">
        <InputNumber style={{ display: 'block', width: 'auto' }} />
      </ZodForm.Item>
      <ZodForm.Item name="cost">
        <InputNumber style={{ display: 'block', width: 'auto' }} />
      </ZodForm.Item>
      <ZodForm.Item name="workSchedule">
        <Input />
      </ZodForm.Item>
    </ZodForm>
  )
}

// unified interface for those components, use function instead of object to support types
const getComponent = <T extends ItemType>(itemType: T): React.FC<ViewProps<ItemMeta<T>>> =>
  ({
    [ItemType.REAL_ESTATE]: EditItemSpecificRealEstate,
    [ItemType.AUTO]: EditItemSpecificAuto,
    [ItemType.SERVICES]: EditItemSpecificServices,
  })[itemType]

export const EditItemSpecific = <T extends ItemType>({
  itemType,
  ...props
}: { itemType: T } & ViewProps<ItemMeta<T>>) => {
  const Component = getComponent(itemType)
  return <Component {...props} />
}
