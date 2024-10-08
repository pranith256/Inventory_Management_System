import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const ItemsApi = createApi({
    reducerPath: 'ItemsApi',
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_URL }),
    tagTypes: ['getAllItems','getItem','getAllArchivedItems'],
    endpoints: (builder) => ({
        // Create Item
        CreateItem: builder.mutation<any, any>({
            query: (obj) => ({
                url: '/items/register',
                method: 'POST',
                body: obj,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            }),
            invalidatesTags: ['getAllItems']
        }),

        // Get All Items
        getAllItems: builder.query<any, any>({
            query: (obj) => ({
                url: `/items/get-all?query=${obj.query}&page=${obj.page}`,
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            }),
            providesTags: ['getAllItems']
        }),
       // Get All Archived Items
       getAllArchiveItems: builder.query<any, any>({
        query: (obj) => ({
            url: `/items/get-all-archieveitems?query=${obj.query}&page=${obj.page}`,
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        }),
        providesTags: ['getAllArchivedItems']  
    }),

        // Delete Item
        DeleteItem: builder.mutation<any, any>({
            query: (id) => ({
                url: `/items/delete/${id}`,
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            }),
            invalidatesTags: ['getAllItems']
        }),

        getItemById: builder.query<any, any>({
            query: (id) => ({
                url: `/items/get/${id}`,
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }),
            providesTags: ['getItem']
        }),

        // Update Item
        UpdateItem: builder.mutation<any, any>({
            query: ({ data,_id }) => ({
                url: `/items/update/${_id}`,
                method: 'PATCH',
                body: data,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            }),
            invalidatesTags: ['getAllItems','getItem']
        }),
        // Archive Item
        ArchiveItem: builder.mutation<any, any>({
            query: ({ data, _id }) => ({
                url: `/items/archive/${_id}`,
                method: 'PATCH',
                body: data,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            }),
            invalidatesTags: ['getAllItems', 'getAllArchivedItems', 'getItem']  
        }),
    }),
})

export const {
    useCreateItemMutation,
    useGetAllItemsQuery,
    useDeleteItemMutation,
    useGetItemByIdQuery,
    useUpdateItemMutation,
    useArchiveItemMutation,
    useGetAllArchiveItemsQuery
} = ItemsApi;
