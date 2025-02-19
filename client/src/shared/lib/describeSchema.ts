import { AnyZodObject, z, ZodObject, ZodOptional } from 'zod'

export type PropertyDescription = {
  description: string
  required: boolean
}

export type SchemaDescription<S extends AnyZodObject> = {
  [Key in keyof z.infer<S>]: S[Key] extends AnyZodObject ? SchemaDescription<S[Key]> : PropertyDescription
}

export function describeSchema<S extends AnyZodObject>(schema: S, optional: boolean = false){
  const result = {} as any
  for (const key in schema.shape) {
    if (schema.shape[key] instanceof ZodObject) {
      result[key] = describeSchema(schema.shape[key], optional)
      continue
    }
    if (schema.shape[key] instanceof ZodOptional) {
      result[key] = describeSchema(schema.shape[key]._def.innerType, true)
      continue
    }
    result[key] = {
      description: schema.shape[key].description,
      required: !optional,
    } as PropertyDescription
  }
  return result
}

