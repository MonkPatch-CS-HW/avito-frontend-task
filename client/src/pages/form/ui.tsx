import { InputItem, itemKeysFilter, ItemType } from '@/entities/item'
import { usePostItemMutation } from '@/entities/item/api'
import { ItemForm } from '@/features/item-form'
import { useState } from 'react'

export const FormPage = () => {
  const [postItem] = usePostItemMutation()
  const [itemType, setItemType] = useState<ItemType | null>(null)
  const handleChange = (item: Partial<InputItem>) => {
    setItemType(item.type ?? null)
  }
  const handleSubmit = (item: InputItem) => {
    postItem(item)
  }
  return (
    <ItemForm onChange={handleChange} onSubmit={handleSubmit}>
      <ItemForm.Controls filter={itemKeysFilter.general} />
      {itemType && <ItemForm.Controls filter={itemKeysFilter.categorial} />}
      <ItemForm.Submit value={'Отправить'} />
    </ItemForm>
  )
}
