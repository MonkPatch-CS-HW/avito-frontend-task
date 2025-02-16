import { InputItem } from '@/entities/item'
import { EditItemGeneral } from '@/features/edit-item-general'
import { useState } from 'react'

// generic version to be able to pass Item with { id }
export type ItemFormProps<T extends InputItem> = {
  item?: T
  onSubmit?: (item: T) => void
}

export const ItemForm = <T extends InputItem>(props: ItemFormProps<T>) => {
  const [item, setItem] = useState<Partial<InputItem>>(props.item ?? {})
  const [isValid, setIsValid] = useState<boolean>(false)

  const handleChange = ({ item, isValid }: { item: Partial<InputItem>; isValid: boolean }) => {
    setItem(item)
    setIsValid(isValid)
  }

  return (
    <>
      <EditItemGeneral item={item} onChange={handleChange} />
      {isValid && <button>Submit</button>}
    </>
  )
}
