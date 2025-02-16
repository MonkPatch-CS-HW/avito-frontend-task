// import { useForm } from 'react-hook-form'
import { ItemMeta, ItemType } from '../model'
import { Fieldset } from '@chakra-ui/react'

type ItemMetaInputProps<T extends ItemType> = {
  meta: Partial<ItemMeta<T>>
  onChange?: (item: Partial<ItemMeta<T>>) => void
  onComplete?: (item: ItemMeta<T>) => void
}

// separate components for each item type
// we could generate them based on Zod schema, but that would be less flexible
const ItemMetaInputAuto = ({}: ItemMetaInputProps<ItemType.AUTO>) => {
  // const { getValues } = useForm()
  return (
    <Fieldset.Root>
      <Fieldset.Content>
        <Field label="Hi" />
      </Fieldset.Content>
    </Fieldset.Root>
  )
}
const ItemMetaInputRealEstate = ({}: ItemMetaInputProps<ItemType.REAL_ESTATE>) => <></>
const ItemMetaInputServices = ({}: ItemMetaInputProps<ItemType.SERVICES>) => <></>

// unified interface for those components, use function instead of object to improve types
const getComponent = <T extends ItemType>(itemType: T): React.FC<ItemMetaInputProps<T>> =>
  ({
    [ItemType.REAL_ESTATE]: ItemMetaInputRealEstate,
    [ItemType.AUTO]: ItemMetaInputAuto,
    [ItemType.SERVICES]: ItemMetaInputServices,
  })[itemType]

export const ItemMetaInput = <T extends ItemType>({ itemType, ...props }: { itemType: T } & ItemMetaInputProps<T>) => {
  const Component = getComponent(itemType)
  return <Component {...props} />
}
