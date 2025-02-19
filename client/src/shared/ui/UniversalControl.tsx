import { PropsWithChildren, ReactNode } from 'react'
import { ControllerRenderProps, FieldValues, Path, PathValue, useFormContext } from 'react-hook-form'
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  Input as DefaultInput,
  Select as DefaultSelect,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
  FormField,
} from '@/shared/ui'

type PropertyDescription = {
  description: string
  requried?: boolean
}

type RenderProps<T extends FieldValues, P extends Path<T>> = ControllerRenderProps<T, P> & PropertyDescription

export type GenericLayoutProps = PropertyDescription
const DefaultGenericLayout = ({ description, children }: PropsWithChildren<GenericLayoutProps>) => (
  <FormItem>
    <FormLabel>{description}</FormLabel>
    <FormControl>{children}</FormControl>
    <FormMessage />
  </FormItem>
)

export type GenericInputProps<T extends FieldValues, P extends Path<T>> = RenderProps<T, P> &
  Pick<React.InputHTMLAttributes<HTMLInputElement>, 'type'>
const DefaultGenericInput = <T extends FieldValues, P extends Path<T>>({
  value,
  ...field
}: GenericInputProps<T, P>) => <DefaultInput {...field} defaultValue={value} />

export type GenericSelectProps<T extends FieldValues, P extends Path<T>> = RenderProps<T, P> & {
  values?: Record<string, ReactNode>
}
const DefaultGenericSelect = <T extends FieldValues, P extends Path<T>>({
  values,
  value,
  onChange,
}: GenericSelectProps<T, P>) => (
  <DefaultSelect defaultValue={value} onValueChange={onChange}>
    <SelectTrigger>
      <SelectValue />
    </SelectTrigger>
    <SelectContent>
      {values &&
        Object.entries(values).map(([key, value]) => {
          return (
            <SelectItem value={key} key={key}>
              {value}
            </SelectItem>
          )
        })}
    </SelectContent>
  </DefaultSelect>
)

type UniversalControlProps<T extends FieldValues, P extends Path<T>> = {
  name: P
  type: 'text' | 'number' | 'select'
  values?: Record<string, ReactNode>
} & PropertyDescription
export const createGenericControl =
  <T extends FieldValues, P extends Path<T>>(
    GenericLayout: React.FC<PropertyDescription> = DefaultGenericLayout,
    GenericInput: React.FC<GenericInputProps<T, P>> = DefaultGenericInput,
    GenericSelect: React.FC<GenericSelectProps<T, P>> = DefaultGenericSelect,
  ) =>
  (props: UniversalControlProps<T, P>) => {
    const { control } = useFormContext()
    const Input = (innerProps: UniversalControlProps<T, P> & RenderProps<T, P>) => {
      switch (innerProps.type) {
        case 'text':
          return <GenericInput {...innerProps} />
        case 'number':
          return (
            <GenericInput
              {...innerProps}
              onChange={(e) =>
                innerProps.onChange(Number.isNaN(e.target.valueAsNumber) ? undefined : e.target.valueAsNumber)
              }
              value={
                (Number.isNaN(parseInt(innerProps.value)) ? undefined : parseInt(innerProps.value)) as PathValue<T, P>
              }
            />
          )
        case 'select':
          return <GenericSelect {...innerProps} />
      }
    }
    return (
      <FormField
        control={control}
        name={props.name}
        render={({ field }) => {
          return (
            <GenericLayout {...props}>
              <Input {...props} {...field} />
            </GenericLayout>
          )
        }}
      />
    )
  }
