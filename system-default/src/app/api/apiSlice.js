// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { setReducer, logOut } from "../../features/auth/authSlice";

// const baseQuery = fetchBaseQuery({
//   baseUrl: "http://localhost:3001",
//   prepareHeaders: (headers, { getState }) => {
//     const token = getState().auth.token;
//     if (token) {
//       headers.set("authorization", `Bearer ${token}`);
//     }
//     return headers;
//   },
// });

// // const baseQueryWithReauth = async (args, api, extraOptions) => {
// //   let result = await baseQuery(args, api, extraOptions);
// //   if (result.error) {
// //     const { status } = result.error;
// //     if (status === 401) {
// //       api.dispatch(logOut());
// //     }
// //   }
// //   return result;
// // }

// const baseQueryWithReauth = async (args, api, extraOptions) => {
//   let result = await baseQuery(args, api, extraOptions);

//   if (result?.error?.originalStatus === 403) {
//     console.log("403, refreshing token");
//     const refreshResult = await baseQuery(
//       { url: "/refresh", method: "POST" },
//       api,
//       extraOptions
//     );
//     console.log("refreshResult", refreshResult);
//     if (refreshResult?.data) {
//       const user = api.getState().auth.user;

//   }

//   return result;
// };
