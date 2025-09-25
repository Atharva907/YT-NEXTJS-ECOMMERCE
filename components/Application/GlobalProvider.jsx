'use client' // Ensure this component runs on the client side

// Import Redux store and persistor
import { persistor, store } from '@/store/store'

// Import Redux Provider
import { Provider } from 'react-redux'

// Import React
import React from 'react'

// Import PersistGate to delay rendering until persisted state is restored
import { PersistGate } from 'redux-persist/integration/react'

// Import custom loading component
import Loading from './Loading'

// ---------------------
// Global Redux Provider Component
// ---------------------
const GlobalProvider = ({ children }) => {
  return (
    // Wrap app in Redux Provider to give access to store
    <Provider store={store}>
        {/* PersistGate delays rendering until persisted state is loaded */}
        <PersistGate persistor={persistor} loading={<Loading />}>
            {children} {/* Render app content */}
        </PersistGate>
    </Provider>
  )
}

export default GlobalProvider
