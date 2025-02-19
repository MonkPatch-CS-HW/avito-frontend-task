import { EditItem } from '@/widgets/edit-item'
import { Flex } from 'antd'
import { Typography } from 'antd'

export const FormPage = () => {
  // const [postItem] = usePostItemMutation()
  return (
    <Flex vertical align="start" justify="start">
      <Typography.Title>Создание объявления</Typography.Title>
      <EditItem />
    </Flex>
  )
}
