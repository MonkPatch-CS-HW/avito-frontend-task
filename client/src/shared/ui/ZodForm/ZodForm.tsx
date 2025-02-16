import { Form } from 'antd'
import { ReactNode, useContext } from 'react'
import { AnyZodObject, ZodOptional } from 'zod'
import { ZodFormContext } from './ZodFormContext'

export type ViewOnChangeEvent<T extends Object> = { data: Partial<T>; isValid: boolean }

export type ViewProps<T extends Object> = {
  data?: Partial<T>
  onChange?: (event: ViewOnChangeEvent<T>) => void
}

export const ZodForm = <T extends Object, S extends AnyZodObject>(
  props: ViewProps<T> & { schema: S; children?: ReactNode },
): ReactNode => {
  const [form] = Form.useForm<Partial<T>>()

  if (props.data) form.setFieldsValue(props.data as any)

  const onValuesChange = () => {
    const values = form.getFieldsValue()
    const errors: { [Key in keyof T]?: string } = {}
    const { success, error } = props.schema.safeParse(values)
    if (error) {
      for (const err of error.errors) {
        const key = err.path.shift()
        if (!key || typeof values[key as keyof T] === 'undefined') continue
        errors[key as keyof T] = err.message
      }
    }
    const fields: Parameters<typeof form.setFields>[0] = []
    for (const key in values) {
      const name = key as keyof T
      const value = values[name]
      fields.push({ name: name as any, value, errors: errors[name] ? [errors[name]] : undefined })
    }
    form.setFields(fields)
    props.onChange?.({ data: values, isValid: success })
  }

  return (
    <ZodFormContext.Provider value={{ schema: props.schema }}>
      <Form form={form} onValuesChange={onValuesChange}>
        {props.children}
      </Form>
    </ZodFormContext.Provider>
  )
}

ZodForm.Item = ({ name, children }: { name: string; children?: ReactNode }) => {
  const { schema } = useContext(ZodFormContext)
  const shape = schema._def.shape()
  let propShape = shape[name]
  let required = true
  let label: ReactNode = null
  if (propShape) {
    if (propShape.description) label = propShape.description
    // unwrap zod optional
    if (propShape instanceof ZodOptional) {
      propShape = propShape._def.innerType
      required = false
    }
  }
  return (
    <Form.Item name={name} label={label} required={required}>
      {children}
    </Form.Item>
  )
}
