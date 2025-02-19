import { ItemType } from '@/entities/item'
import { ItemForm } from '@/features/item-form/ui'
import { Input } from '@/shared/ui'

export const EditItem = () => {
  return (
    <ItemForm
      item={{ description: 'hi', type: ItemType.AUTO }}
      onSubmit={(data) => console.log(data)}
      onChange={(item, isValid) => console.log(item, isValid)}
    >
      <ItemForm.Controls general />
      <ItemForm.Controls categorial />
      <Input type="submit" />
    </ItemForm>
  )
}
