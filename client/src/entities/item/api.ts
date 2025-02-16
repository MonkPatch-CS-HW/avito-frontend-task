import { api } from '@/shared/api'
import { type InputItem, type Item } from './model'

// fix weird bug
type CopiedInputItem = { [Key in keyof InputItem]: InputItem[Key] }
type CopiedItem = { [Key in keyof Item]: Item[Key] }

export const itemsApi = api.enhanceEndpoints({ addTagTypes: ['Item'] }).injectEndpoints({
  endpoints: (build) => ({
    getItems: build.query<CopiedItem[], void>({ query: () => 'items', providesTags: ['Item'] }),
    getItemById: build.query<CopiedItem, number>({
      query: (id: number) => `items/${id}`,
      providesTags: (_result, _error, arg) => [{ type: 'Item', id: arg }],
    }),
    deleteItemById: build.mutation<void, number>({
      query: (id: number) => ({ url: `items/${id}`, method: 'DELETE' }),
      invalidatesTags: (_result, _error, arg) => [{ type: 'Item', id: arg }],
    }),
    putItem: build.mutation<CopiedItem, CopiedItem>({
      query: (item: Item) => ({ url: `items/${item.id}`, body: item, method: 'PUT' }),
      invalidatesTags: (_result, _error, arg) => [{ type: 'Item', id: arg.id }],
    }),
    postItem: build.mutation<CopiedItem, CopiedInputItem>({
      query: (item: InputItem) => ({ url: `items`, body: item, method: 'POST' }),
      invalidatesTags: ['Item'],
    }),
  }),
})

export const {
  useGetItemsQuery,
  useGetItemByIdQuery,
  useDeleteItemByIdMutation,
  usePutItemMutation,
  usePostItemMutation,
} = itemsApi
