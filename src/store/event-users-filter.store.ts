import { create } from 'zustand'
import type { VisibilityState } from '@tanstack/react-table'

interface EventUsersFilterStore {
    searchValue: string
    statusFilter: string
    roleFilter: string
    departmentFilter: string
    columnVisibility: VisibilityState
    setSearchValue: (value: string) => void
    setStatusFilter: (value: string) => void
    setRoleFilter: (value: string) => void
    setDepartmentFilter: (value: string) => void
    setColumnVisibility: (visibility: VisibilityState) => void
    resetFilters: () => void
}

const initialState = {
    searchValue: '',
    statusFilter: 'all',
    roleFilter: 'all',
    departmentFilter: 'all',
    columnVisibility: {} as VisibilityState,
}

export const useEventUsersFilterStore = create<EventUsersFilterStore>((set) => ({
    ...initialState,

    setSearchValue: (value: string) => {
        set({ searchValue: value })
    },

    setStatusFilter: (value: string) => {
        set({ statusFilter: value })
    },

    setRoleFilter: (value: string) => {
        set({ roleFilter: value })
    },

    setDepartmentFilter: (value: string) => {
        set({ departmentFilter: value })
    },

    setColumnVisibility: (visibility: VisibilityState) => {
        set({ columnVisibility: visibility })
    },

    resetFilters: () => {
        set(initialState)
    },
}))
