export type FilterFn = (key: string) => boolean
export type Filter = string | FilterFn | Filter[]

export const compileFilter = (filter: Filter): FilterFn => {
  if (typeof filter === 'function') return filter
  if (typeof filter === 'string') return (key) => key === filter
  const fns = filter.map(compileFilter)
  if (fns.length === 1) return fns[0]
  return (key) => fns.some((fn) => fn(key))
}

export const invertFilter = (filter: Filter): FilterFn => {
  const fn = compileFilter(filter)
  return (key) => !fn(key)
}

export const emptyFilter = () => true

// for now does not support nesting
export const filterKeys = <T extends Object>(target: T, ...filters: Filter[]): Partial<T> => {
  const filterFn = compileFilter(filters)
  const result: Partial<T> = {}
  for (const key in target) if (filterFn(key)) result[key] = target[key]
  return result
}
