import { baseItemSchema, Item, itemMetaSchema } from '@/entities/item'
import { Card, Flex, Image, Space, Typography } from 'antd'

export const ItemCard = ({ item, onClick }: { item: Item; onClick?: (item: Item) => void }) => {
  const descriptions: Record<string, string> = {}
  const shape = { ...baseItemSchema._def.shape(), ...itemMetaSchema[item.type]._def.shape() }
  for (const key in shape) {
    if (['name', 'image'].includes(key)) continue
    const value = shape[key as keyof typeof shape]
    if (!value?.description) continue
    descriptions[key] = value.description
  }
  return (
    <Card title={item.name} hoverable onClick={() => onClick?.(item)}>
      <Space align="start">
        <Image
          height={256}
          {...(item.image ? {} : { width: 0 })}
          src={item.image}
          fallback="https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg?20240301091138"
        />
        <Flex vertical>
          {Object.keys(descriptions).map((key) => (
            <Typography.Paragraph key={key}>
              <b>{descriptions[key]}</b>: {(item as any)[key]}
            </Typography.Paragraph>
          ))}
        </Flex>
      </Space>
    </Card>
  )
}
