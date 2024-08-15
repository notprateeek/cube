import { create } from 'zustand'

import { Customer, Image } from '@/types'

type State = {
  customers: Customer[]
  loadingCustomers: boolean
  images: Image[]
  loadingImages: boolean | undefined
  activeCustomer: Customer
}

type Action = {
  updateCustomers: (customers: State['customers']) => void
  updateLoadingCustomers: (loadingCustomers: State['loadingCustomers']) => void
  updateImages: (images: State['images']) => void
  updateLoadingImages: (loadingImages: State['loadingImages']) => void
  updateActiveCustomer: (activeCustomer: State['activeCustomer']) => void
}

export const useStore = create<State & Action>((set) => ({
  customers: [],
  loadingCustomers: true,
  images: [],
  loadingImages: undefined,
  activeCustomer: {
    id: 0,
    name: '',
    title: '',
    address: {
      street: '',
      city: '',
      zipCode: '',
      county: '',
      country: '',
    },
  },

  updateCustomers: (customers) => set(() => ({ customers: customers })),
  updateLoadingCustomers: (loadingCustomers) =>
    set(() => ({ loadingCustomers: loadingCustomers })),
  updateImages: (images) => set(() => ({ images: images })),
  updateLoadingImages: (loadingImages) =>
    set(() => ({ loadingImages: loadingImages })),
  updateActiveCustomer: (activeCustomer) =>
    set(() => ({ activeCustomer: activeCustomer })),
}))
