import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const userAPi=createApi({
    
    reducerPath:'userApi', //unique key
    baseQuery:fetchBaseQuery({ //handles header like axios
        baseUrl:'http://localhost:3000/',
    }),

    // end points to get data
    endpoints:(user)=>({
        // get all users
        getAlluser:user.query({
            query:()=>({
                url:'employees', //end point
                method:'GET'
            })
        }),

        // delete a user
        deleteUser:user.mutation({
            query:(id)=>({
                    url:`employees/${id}`,
                    method:'DELETE'
            })
        }),

        // create a user
        addUser:user.mutation({
            query:(newUser)=>({
                    url:'employees',
                    method:'POST',
                    body:newUser
            })
        }),

         // update a user
         updateUser:user.mutation({
             query:(updateuser)=>({
                    url:`employees/${updateuser.id}`,
                    method:'PUT',
                    body:updateuser
             })
         })

    }),

})
export const {useGetAlluserQuery,useDeleteUserMutation,useAddUserMutation,useUpdateUserMutation}=userAPi; //hook for getting data