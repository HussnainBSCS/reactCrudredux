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
            query:(id)=>{
                return{
                    url:`employees/${id}`,
                    method:'DELETE'
                }
            }
        }),

        // create a user
        createUser:user.mutation({
            query:(newUser)=>{
                return{
                    url:'employees',
                    method:'POST',
                    body:newUser
                }
            }
        }),

         // update a user
         updateUser:user.mutation({
             query:(updatedata,id)=>{
                 console.log("updare",updatedata)
                 console.log("updare id",id)

                return{
                    url:`employees/${id}`,
                    method:'PUT',
                    body:updatedata
                }

             }
         })

    }),

})
export const {useGetAlluserQuery,useDeleteUserMutation,useCreateUserMutation,useUpdateUserMutation}=userAPi; //hook for getting data