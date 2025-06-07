import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Bell } from "lucide-react"; // Menggunakan Bell dari lucide-react

// Tipe untuk Notifikasi
interface NotificationItem {
  id: string;
  title: string;
  message: string;
  createdAt: string; // Atau Date
  isRead: boolean;
}

const DisplayNotification = () => {
  const dummyNotifications: NotificationItem[] = [
    {
      id: "notif-1",
      title: "Transaksi Berhasil",
      message: "Pembayaran sebesar Rp 100.000 telah berhasil diproses.",
      createdAt: "2025-04-18 09:45",
      isRead: false,
    },
    {
      id: "notif-2",
      title: "Promo Spesial!",
      message: "Dapatkan diskon hingga 50% hanya hari ini.",
      createdAt: "2025-04-17 15:22",
      isRead: true,
    },
    {
      id: "notif-3",
      title: "Pengingat Pembayaran",
      message: "Jatuh tempo pembayaran Anda tinggal 1 hari lagi.",
      createdAt: "2025-04-16 08:10",
      isRead: false,
    },
  ];

  const [notifications, setNotifications] = useState(dummyNotifications);

  const handleMarkAsRead = (notificationId: string) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notif) =>
        notif.id === notificationId ? { ...notif, isRead: true } : notif
      )
    );
  };
  return (
    <>
      <CardHeader>
        <CardTitle>Notifikasi</CardTitle>
        <CardDescription>
          Lihat semua pemberitahuan terbaru terkait akun dan aktivitas Anda.
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[calc(100vh-20rem)] md:h-[calc(100vh-18rem)] overflow-y-auto pr-1">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <Card
              key={notification.id}
              className={`w-full p-4 mb-3 rounded-lg transition-all duration-300 ease-in-out relative cursor-pointer border dark:border-neutral-700 ${notification.isRead ? "bg-muted/30 dark:bg-muted/20" : "bg-background dark:bg-neutral-800"}`}
              onClick={() => handleMarkAsRead(notification.id)} // Contoh aksi
            >
              <div className="flex items-start justify-between w-full">
                <div className="flex gap-3 items-start">
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${notification.isRead ? "bg-neutral-400 dark:bg-neutral-600" : "bg-sky-500"}`}
                  >
                    <Bell className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span
                      className={`text-base font-medium ${notification.isRead ? "text-neutral-600 dark:text-neutral-400" : "text-neutral-900 dark:text-neutral-100"}`}
                    >
                      {notification.title}
                    </span>
                    <span
                      className={`text-sm mt-0.5 ${notification.isRead ? "text-neutral-500 dark:text-neutral-500" : "text-neutral-700 dark:text-neutral-300"}`}
                    >
                      {notification.message}
                    </span>
                  </div>
                </div>
                {!notification.isRead && (
                  <div
                    className="flex-shrink-0 w-2 h-2 rounded-full bg-sky-500 ml-2 mt-1"
                    title="Belum dibaca"
                  ></div>
                )}
              </div>
              <div className="flex justify-end text-xs text-neutral-500 dark:text-neutral-400 mt-2">
                {notification.createdAt}
              </div>
            </Card>
          ))
        ) : (
          <p className="text-center text-neutral-500 dark:text-neutral-400 py-10">
            Tidak ada notifikasi saat ini.
          </p>
        )}
      </CardContent>
    </>
  );
};
export default DisplayNotification;
