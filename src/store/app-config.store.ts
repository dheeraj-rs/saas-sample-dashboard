import { create } from 'zustand';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastState {
    isVisible: boolean;
    message: string;
    type: ToastType;
}

interface AppConfigStore {
    toast: ToastState;
    showToast: (message: string, type?: ToastType) => void;
    hideToast: () => void;
}

export const useAppConfigStore = create<AppConfigStore>((set) => ({
    toast: {
        isVisible: false,
        message: '',
        type: 'info',
    },

    showToast: (message: string, type: ToastType = 'info') => {
        set((state) => ({
            toast: {
                ...state.toast,
                isVisible: true,
                message,
                type,
            },
        }));
    },

    hideToast: () => {
        set((state) => ({
            toast: {
                ...state.toast,
                isVisible: false,
            },
        }));
    },
}));
