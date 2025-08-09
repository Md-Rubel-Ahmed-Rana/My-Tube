import apiSlice from "../api";

const elasticsearchApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getElasticSearchDocuments: builder.query({
      query: () => ({
        url: `/elastic-search/all?limit=1000`,
        method: "GET",
      }),
      providesTags: ["elasticsearch"],
    }),
    AddElasticSearchDocuments: builder.mutation({
      query: () => ({
        url: `/elastic-search/add-full-docs`,
        method: "GET",
      }),
      invalidatesTags: ["elasticsearch"],
    }),
  }),
});

export const {
  useGetElasticSearchDocumentsQuery,
  useAddElasticSearchDocumentsMutation,
} = elasticsearchApi;
