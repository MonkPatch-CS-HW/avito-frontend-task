import { ItemForm } from '@/widgets/item-form'

export const FormPage = () => {
  return <ItemForm onChange={(e) => e.isValid && console.log(e.data)} />
}
