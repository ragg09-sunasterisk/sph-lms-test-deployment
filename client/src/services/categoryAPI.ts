import { getUserToken } from '@/src/shared/utils';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const getCategory = createApi({
  reducerPath: 'getCategory',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Token ${getUserToken() ?? ''}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCategory: builder.query({
      query: () => 'category/',
    }),
  }),
});

export const { useGetCategoryQuery } = getCategory;
