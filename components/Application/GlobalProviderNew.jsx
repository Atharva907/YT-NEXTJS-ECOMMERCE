'use client'

import { persistor, store } from '@/store/store'
import { Provider } from 'react-redux'
import React from 'react'
import { PersistGate } from 'redux-persist/integration/react'
import { AuthProvider } from '@/context/AuthContext'

import Loading from './Loading'
const GlobalProvider = ({ children }) => {
  return (
    <Provider store={store}>
        <PersistGate persistor={persistor} loading={<Loading />}>
            <AuthProvider>
                {children}
            </AuthProvider>
        </PersistGate>
    </Provider>
  )
}

export default GlobalProvider
