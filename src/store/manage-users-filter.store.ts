import { create } from 'zustand'
import type { VisibilityState } from '@tanstack/react-table'

interface ManageUsersFilterStore {
    searchValue: string
    statusFilter: string
    columnVisibility: VisibilityState
    setSearchValue: (value: string) => void
    setStatusFilter: (value: string) => void
    setColumnVisibility: (visibility: VisibilityState) => void
    resetFilters: () => void
}

const initialState = {
    searchValue: '',
    statusFilter: 'all',
    columnVisibility: {} as VisibilityState,
}

export const useManageUsersFilterStore = create<ManageUsersFilterStore>((set) => ({
    ...initialState,

    setSearchValue: (value: string) => {
        set({ searchValue: value })
    },

    setStatusFilter: (value: string) => {
        set({ statusFilter: value })
    },

    setColumnVisibility: (visibility: VisibilityState) => {
        set({ columnVisibility: visibility })
    },

    resetFilters: () => {
        set(initialState)
    },
}))
