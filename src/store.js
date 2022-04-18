import { configureStore } from '@reduxjs/toolkit'
import { userAPi } from './services/user'

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [userAPi.reducerPath]: userAPi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userAPi.middleware),
})
