import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.API_URL as string,
  }),
  endpoints: (build) => ({
    getItems: build.query({ query: () => 'items' }),
    getItemById: build.query({ query: (id: number) => `items/${id}` }),
    putItemById: build.mutation({ query: (id: number, item: ) => ({ url: `item/${id}`, method: 'PUT' }) }),
    deleteItemById: build.mutation({ query: (id: number) => ({ url: `item/${id}`, method: 'DELETE' }) }),
  }),
})
