/* eslint-disable @typescript-eslint/no-explicit-any */
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
  }),
});

export const { useGetAllCategoriesQuery } = categoryApi;
