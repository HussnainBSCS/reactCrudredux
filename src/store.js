import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { userAPi } from './services/user'

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [userAPi.reducerPath]: userAPi.reducer,
  },

//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(userAPi.middleware),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
// setupListeners(store.dispatch)