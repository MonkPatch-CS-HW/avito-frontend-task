import { api } from '../../shared/api/api'
import { InputItem, Item } from './model'

export const itemsApi = api.enhanceEndpoints({ addTagTypes: ['Item'] }).injectEndpoints({
  endpoints: (build) => ({
    getItems: build.query({ query: () => 'items', providesTags: ['Item'] }),
    getItemById: build.query({
      query: (id: number) => `items/${id}`,
      providesTags: (_result, _error, arg) => [{ type: 'Item', id: arg }],
    }),
    deleteItemById: build.mutation({
      query: (id: number) => ({ url: `items/${id}`, method: 'DELETE' }),
      invalidatesTags: (_result, _error, arg) => [{ type: 'Item', id: arg }],
    }),
    putItem: build.mutation({
      query: (item: Item) => ({ url: `items/${item.id}`, body: item, method: 'PUT' }),
      invalidatesTags: (_result, _error, arg) => [{ type: 'Item', id: arg.id }],
    }),
    postItem: build.mutation({
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
