import { usePostItemMutation } from '@/entities/item/api'
import { ItemForm } from '@/widgets/item-form'

export const FormPage = () => {
  const [postItem] = usePostItemMutation()
  return <ItemForm onSubmit={postItem} />
}
