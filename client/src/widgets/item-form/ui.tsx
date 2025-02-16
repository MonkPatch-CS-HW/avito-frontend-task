import { BaseItem, InputItem, ItemMeta } from '@/entities/item'
import { EditItemGeneral } from '@/features/edit-item-general'
import { EditItemSpecific } from '@/features/edit-item-specific'
import { ViewOnChangeEvent, ViewProps } from '@/shared/ui'
import { Button, Space } from 'antd'
import { useState } from 'react'

export const ItemForm = <T extends InputItem>(props: ViewProps<T> & { onSubmit: (item: T) => void }) => {
  const [baseItemInfo, setBaseItemInfo] = useState<ViewOnChangeEvent<BaseItem>>({
    isValid: false,
    data: props.data ? { ...props.data } : {},
  })
  const [itemMetaInfo, setItemMetaInfo] = useState<ViewOnChangeEvent<ItemMeta<any>>>({
    isValid: false,
    data: props.data ? { ...props.data } : {},
  })
  const [currentStep, setCurrentStep] = useState<'BASE' | 'META'>('BASE')

  const handleBaseItemChange = (e: ViewOnChangeEvent<BaseItem>) => {
    setBaseItemInfo(e)
    props.onChange?.({
      data: { ...props.data, ...e.data, ...itemMetaInfo.data } as any,
      isValid: baseItemInfo.isValid && itemMetaInfo.isValid,
    })
  }

  const handleItemMetaChange = (e: ViewOnChangeEvent<BaseItem>) => {
    setItemMetaInfo(e)
    props.onChange?.({
      data: { ...props.data, ...baseItemInfo.data, ...e.data } as any,
      isValid: baseItemInfo.isValid && itemMetaInfo.isValid,
    })
  }

  const handleSubmit = () => {
    props.onSubmit?.({
      ...props.data,
      ...baseItemInfo.data,
      ...itemMetaInfo.data,
    } as T)
  }

  const Steps = {
    BASE: (
      <>
        <EditItemGeneral data={baseItemInfo.data} onChange={handleBaseItemChange} />
        <Space>
          <Button
            variant="solid"
            color="primary"
            disabled={!baseItemInfo.isValid}
            onClick={() => setCurrentStep('META')}
          >
            Дальше
          </Button>
        </Space>
      </>
    ),
    META: (
      <>
        <EditItemSpecific<any>
          itemType={baseItemInfo.data.type!}
          data={itemMetaInfo.data}
          onChange={handleItemMetaChange}
        />
        <Space>
          <Button variant="outlined" color="default" onClick={() => setCurrentStep('BASE')}>
            Назад
          </Button>
          <Button variant="solid" color="primary" disabled={!itemMetaInfo.isValid} onClick={handleSubmit}>
            Завершить
          </Button>
        </Space>
      </>
    ),
  }

  return Steps[currentStep]
}
