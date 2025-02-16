import { useGetItemsQuery } from '@/entities/item/api'
import { ItemCard } from '@/features/item-card'
import { Flex, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'

export const ListPage = () => {
  const { data } = useGetItemsQuery()
  const navigate = useNavigate()
  return (
    <Flex vertical align="stretch" justify="start">
      <Typography.Title>Список объявлений</Typography.Title>
      <Flex vertical gap={16}>
        {data?.map((item) => <ItemCard item={item} key={item.id} onClick={(item) => navigate(`/item/${item.id}`)} />)}
      </Flex>
    </Flex>
  )
}
