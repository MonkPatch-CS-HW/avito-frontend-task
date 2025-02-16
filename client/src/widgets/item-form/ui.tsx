import { InputItem } from '@/entities/item'
import { EditItemGeneral } from '@/features/edit-item-general'
import { useState } from 'react'

export type ItemFormProps<T extends InputItem> = {
  item?: T
  onSubmit?: (item: T) => void
}

export const ItemForm = <T extends InputItem>(props: ItemFormProps<T>) => {
  const [item, setItem] = useState<Partial<InputItem>>(props.item ?? {})
  const [isValid, setIsValid] = useState<boolean>(false)

  const handleChange = ({ data, isValid }: { data: Partial<InputItem>; isValid: boolean }) => {
    setItem(data)
    setIsValid(isValid)
  }

  return (
    <>
      <EditItemGeneral data={item} onChange={handleChange} />
      {isValid && <button>Submit</button>}
    </>
  )
}
