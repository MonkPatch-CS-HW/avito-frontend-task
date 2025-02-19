import { createContext, PropsWithChildren, useEffect } from 'react'
import { FormProvider, Path, SubmitHandler, useForm, useFormContext } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { InputItem, inputItemSchema, ItemType } from './model'
import {
  createGenericControl,
  GenericInputProps,
  GenericLayoutProps,
  GenericSelectProps,
} from '@/shared/ui/UniversalControl'

export const ItemContext = createContext<{ item: Partial<InputItem> }>({ item: {} })

export type ItemControlProps = {
  categorial?: boolean
  general?: boolean
  renderLayout?: React.FC<GenericLayoutProps>
  renderInput?: React.FC<GenericInputProps<Partial<InputItem>, Path<InputItem>>>
  renderSelect?: React.FC<GenericSelectProps<Partial<InputItem>, Path<InputItem>>>
}

export const ItemForm = ({
  item,
  onSubmit,
  onChange,
  children,
}: PropsWithChildren<{
  item: Partial<InputItem>
  onSubmit?: SubmitHandler<InputItem>
  onChange?: (item: Partial<InputItem>, isValid: boolean) => void
}>) => {
  const methods = useForm<InputItem>({ defaultValues: item, resolver: zodResolver(inputItemSchema) })
  useEffect(() => {
    if (!onChange) return

    const { unsubscribe } = methods.watch((value) => {
      onChange(value, methods.formState.isValid)
    })
    return unsubscribe
  }, [methods])

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit && methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  )
}

ItemForm.Controls = (props: ItemControlProps) => {
  const { watch } = useFormContext<Partial<InputItem>>()
  const { categorial = !props.general, general = !props.categorial } = props

  const Control = createGenericControl<InputItem, Path<InputItem>>(
    props.renderLayout,
    props.renderInput,
    props.renderSelect,
  )

  const itemTypes = Object.fromEntries(Object.entries(ItemType).map(([, value]) => [value, value]))
  const itemType: ItemType | undefined = watch('type')

  return (
    <>
      {general && (
        <>
          <Control name="name" description="Название" type="text" />
          <Control name="location" description="Расположение" type="text" />
          <Control name="description" description="Описание" type="text" />
          <Control name="type" description="Тип объявления" type="select" values={itemTypes} />
        </>
      )}
      {categorial && [
        itemType === ItemType.REAL_ESTATE && (
          <>
            <Control
              name="propertyType"
              type="select"
              values={{ Квартира: 'Квартира' }}
              description="Тип недвижимости"
            />
            <Control name="area" type="number" description="Площадь" />
            <Control name="rooms" type="number" description="Количество комнат" />
            <Control name="price" type="number" description="Цена" />
          </>
        ),
        itemType === ItemType.AUTO && (
          <>
            <Control name="brand" description="Производитель" type="select" values={{ Lada: 'Lada', Audi: 'Audi' }} />
            <Control name="model" description="Модель" type="text" />
            <Control name="year" description="Год выпуска" type="number" />
            <Control name="mileage" description="Пробег" type="number" />
          </>
        ),
        itemType === ItemType.SERVICES && (
          <>
            <Control
              name="serviceType"
              description="Тип услуги"
              type="select"
              values={{ Уборка: 'Уборка', Стройка: 'Стройка' }}
            />
            <Control name="experience" description="Опыт работы" type="number" />
            <Control name="cost" description="Стоимость услуги" type="number" />
            <Control name="workSchedule" description="График работы" type="text" />
          </>
        ),
      ]}
    </>
  )
}
