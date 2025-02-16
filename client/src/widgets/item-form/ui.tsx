import { BaseItem, InputItem, ItemMeta } from '@/entities/item'
import { EditItemGeneral } from '@/features/edit-item-general'
import { EditItemSpecific } from '@/features/edit-item-specific'
import { ViewOnChangeEvent, ViewProps } from '@/shared/ui'
import { useState } from 'react'

export const ItemForm = <T extends InputItem>(props: ViewProps<T>) => {
  const [baseItemInfo, setBaseItemInfo] = useState<ViewOnChangeEvent<BaseItem>>({
    isValid: false,
    data: props.data ?? {},
  })
  const [itemMetaInfo, setItemMetaInfo] = useState<ViewOnChangeEvent<ItemMeta<any>>>({
    isValid: false,
    data: props.data ?? {},
  })

  return (
    <>
      <EditItemGeneral data={baseItemInfo.data} onChange={setBaseItemInfo} />
      {baseItemInfo.data.type && (
        <EditItemSpecific<any> itemType={baseItemInfo.data.type} data={itemMetaInfo.data} onChange={setItemMetaInfo} />
      )}
    </>
  )
}
