import { ItemMeta, ItemType } from '../model'

type ItemMetaInputProps<T extends ItemType> = {
  itemType: T
  meta: Partial<ItemMeta<T>>
  onChange?: (item: Partial<ItemMeta<T>>) => void
  onComplete?: (item: ItemMeta<T>) => void
}

const ItemMetaInputAuto = ({}: ItemMetaInputProps<ItemType.AUTO>) => <></>
const ItemMetaInputRealEstate = ({}: ItemMetaInputProps<ItemType.AUTO>) => <></>
const ItemMetaInputServices = ({}: ItemMetaInputProps<ItemType.AUTO>) => <></>

const components: Record<ItemType, React.FC<ItemMetaInputProps<any>>> = {
  [ItemType.REAL_ESTATE]: ItemMetaInputRealEstate,
  [ItemType.AUTO]: ItemMetaInputAuto,
  [ItemType.SERVICES]: ItemMetaInputServices,
}

export const ItemMetaInput<T> = ({ itemType, meta, onChange }: ItemMetaInputProps) => {
  const Component = components[itemType]
  return <Component item={item} onChange={onChange} />
}
