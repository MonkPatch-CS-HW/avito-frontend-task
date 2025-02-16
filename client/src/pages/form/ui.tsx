import { usePostItemMutation } from '@/entities/item/api'
import { ItemForm } from '@/widgets/item-form'
import { Flex } from 'antd'
import { Typography } from 'antd'

export const FormPage = () => {
  const [postItem] = usePostItemMutation()
  return (
    <Flex vertical align="start" justify="start">
      <Typography.Title>Создание объявления</Typography.Title>
      <ItemForm onSubmit={postItem} />
    </Flex>
  )
}
