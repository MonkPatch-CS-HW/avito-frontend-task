import React, { createContext, PropsWithChildren, useContext, useEffect } from 'react'
import { FormProvider, Path, SubmitHandler, useForm, useFormContext } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { InputItem, inputItemSchema, ItemType } from '@/entities/item'
import {
  createGenericControl,
  GenericInputProps,
  GenericLayoutProps,
  GenericSelectProps,
  UniversalControlProps,
} from '@/shared/ui/UniversalControl'
import { compileFilter, emptyFilter, Filter } from '@/shared/lib/filter'
import { useTranslation } from 'react-i18next'

export const GenericControlContext =
  createContext<React.FC<UniversalControlProps<InputItem, Path<InputItem>>>>(createGenericControl())

export type ItemControlProps = {
  filter?: Filter
}

export const ItemForm = ({
  item,
  onSubmit,
  onChange,
  children,
  renderLayout,
  renderInput,
  renderSelect,
}: PropsWithChildren<{
  item: Partial<InputItem>
  onSubmit?: SubmitHandler<InputItem>
  onChange?: (item: Partial<InputItem>, isValid: boolean) => void
  renderLayout?: React.FC<GenericLayoutProps>
  renderInput?: React.FC<GenericInputProps<Partial<InputItem>, Path<InputItem>>>
  renderSelect?: React.FC<GenericSelectProps<Partial<InputItem>, Path<InputItem>>>
}>) => {
  const methods = useForm<InputItem>({ defaultValues: item, resolver: zodResolver(inputItemSchema) })
  useEffect(() => {
    if (!onChange) return

    const { unsubscribe } = methods.watch((value) => {
      onChange(value, methods.formState.isValid)
    })
    return unsubscribe
  }, [methods])

  const GenericControl = createGenericControl<InputItem, Path<InputItem>>(renderLayout, renderInput, renderSelect)

  return (
    <GenericControlContext.Provider value={GenericControl}>
      <FormProvider {...methods}>
        <form onSubmit={onSubmit && methods.handleSubmit(onSubmit)}>{children}</form>
      </FormProvider>
    </GenericControlContext.Provider>
  )
}

ItemForm.Controls = ({ filter = emptyFilter }: ItemControlProps) => {
  filter = compileFilter(filter)

  const GenericControl = useContext(GenericControlContext)
  const { watch } = useFormContext<Partial<InputItem>>()
  const { t } = useTranslation()

  const Control: typeof GenericControl = (props) => {
    return filter(props.name) && <GenericControl description={t(`model.item.${props.name}.description`)} {...props} />
  }

  const itemTypes = Object.fromEntries(Object.entries(ItemType).map(([, value]) => [value, value]))
  const itemType: ItemType | undefined = watch('type')

  return (
    <>
      <Control name="name" type="text" />
      <Control name="location" type="text" />
      <Control name="description" type="text" />
      <Control name="type" type="select" values={itemTypes} />
      {[
        itemType === ItemType.REAL_ESTATE && (
          <React.Fragment key={ItemType.REAL_ESTATE}>
            <Control name="propertyType" type="select" values={{ Квартира: 'Квартира' }} />
            <Control name="area" type="number" />
            <Control name="rooms" type="number" />
            <Control name="price" type="number" />
          </React.Fragment>
        ),
        itemType === ItemType.AUTO && (
          <React.Fragment key={ItemType.AUTO}>
            <Control name="brand" type="select" values={{ Lada: 'Lada', Audi: 'Audi' }} />
            <Control name="model" type="text" />
            <Control name="year" type="number" />
            <Control name="mileage" type="number" />
          </React.Fragment>
        ),
        itemType === ItemType.SERVICES && (
          <React.Fragment key={ItemType.SERVICES}>
            <Control name="serviceType" type="select" values={{ Уборка: 'Уборка', Стройка: 'Стройка' }} />
            <Control name="experience" type="number" />
            <Control name="cost" type="number" />
            <Control name="workSchedule" type="text" />
          </React.Fragment>
        ),
      ]}
    </>
  )
}
