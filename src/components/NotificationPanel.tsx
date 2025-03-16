import { useTranslation } from "@/lib/i18n"

interface Notification {
    id: number
    titleKey: string
    descriptionKey: string
    timeKey: string
    timeParams?: Record<string, string>
    read: boolean
}

export function NotificationPanel() {
    const { t } = useTranslation()
    
    const notifications: Notification[] = [
        {
            id: 1,
            titleKey: "notificationNewToken",
            descriptionKey: "notificationGuaranaDesc",
            timeKey: "justNow",
            read: false
        },
        {
            id: 2,
            titleKey: "notificationMarketUpdate",
            descriptionKey: "notificationMarketDesc",
            timeKey: "hoursAgo",
            timeParams: { hours: "2" },
            read: false
        }
    ]

    return (
        <div className="fixed lg:absolute top-50 lg:top-10 right-4 left-10 lg:left-auto lg:right-0 mt-2 w-[80vw] lg:w-96 bg-white dark:bg-primary dark:border-forestiYellow dark:border-2 rounded-lg shadow-lg">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-primary/50 rounded-t-lg">
                <h2 className="text-lg font-semibold">
                    {t("notifications")} ({notifications.length})
                </h2>
            </div>
            
            <div className="max-h-[400px] overflow-y-auto bg-white dark:bg-primary rounded-b-lg text-sm lg:text-base">
                {notifications.map((notification) => (
                    <div
                        key={notification.id}
                        onClick={() => window.location.reload()}
                        className={`p-4 border-b border-primary/40 dark:border-gray-700 hover:bg-primary dark:hover:bg-gray-700 cursor-pointer hover:text-forestiGreen group
                        ${notification.read ? 'opacity-70' : ''}`}
                    >
                        <div className="flex items-start lg:items-center justify-between lg:flex-row flex-col gap-2">
                            <h3 className="font-medium">
                                {t(notification.titleKey)}
                            </h3>
                            <span className="text-sm text-gray-500 group-hover:text-white">
                                {t(notification.timeKey, notification.timeParams)}
                            </span>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-300 mt-1 group-hover:text-white">
                            {t(notification.descriptionKey)}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
} 