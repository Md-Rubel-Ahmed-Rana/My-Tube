/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICategorySchema } from "@/schemas/category.schema";
import apiSlice from "../api";

interface GetAllCategoriesParams {
  searchText?: string;
  sortBy?: "createdAt" | "priority" | "name";
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
}

export const categoryApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAllCategories: build.query<any, GetAllCategoriesParams>({
      query: ({
        searchText,
        sortBy = "name",
        sortOrder = "asc",
        page = 1,
        limit = 10,
      }) => ({
        url: `/category`,
        params: { searchText, sortBy, sortOrder, page, limit },
      }),
      providesTags: ["categories"],
    }),
    getUsedCategories: build.query({
      query: () => ({
        url: `/category/with-videos`,
      }),
      providesTags: ["categories"],
    }),
    createCategory: build.mutation({
      query: ({ data }: { data: ICategorySchema }) => ({
        url: `/category`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["categories"],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useGetUsedCategoriesQuery,
  useCreateCategoryMutation,
} = categoryApi;
