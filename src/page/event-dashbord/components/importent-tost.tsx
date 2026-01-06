import { X } from "lucide-react";
import { useAppConfigStore } from "../../../store/app-config.store";

export default function ImportantToast() {
    const { toast, hideToast } = useAppConfigStore();

    if (!toast.isVisible) return null;

    const getToastStyles = () => {
        switch (toast.type) {
            case 'success':
                return 'bg-green-50 text-green-700 border-green-200';
            case 'error':
                return 'bg-red-50 text-red-700 border-red-200';
            case 'warning':
                return 'bg-yellow-50 text-yellow-700 border-yellow-200';
            case 'info':
            default:
                return 'bg-blue-50 text-blue-700 border-blue-200';
        }
    };

    return (
        <div
            className={`w-full border-b ${getToastStyles()}`}
        >
            <div className="flex items-center justify-between gap-3 px-4 py-3 lg:px-6">
                <p className="flex-1 text-sm font-medium">{toast.message}</p>
                <button
                    onClick={hideToast}
                    className="flex-shrink-0 rounded-md p-1 hover:bg-black/5 transition-colors"
                    aria-label="Close notification"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}