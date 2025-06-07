// src/app/user/account/components/DisplayBooking.tsx
import React, { useState } from "react"; // Impor useState
import { motion } from "framer-motion";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption, // Tidak terpakai di AccordionContent saat ini, bisa dihapus jika tidak ada rencana penggunaan
  TableCell,
  TableFooter, // Tidak terpakai di AccordionContent saat ini
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandList,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command"; // Tambahkan CommandEmpty, dll.
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, Eye, Truck, PackageSearch } from "lucide-react"; // Tambah PackageSearch untuk CommandItem
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
// Definisikan tipe untuk Invoice dan OrderDetail jika belum ada
interface OrderDetail {
  name: string;
  quantity: number;
  price: string; // Sebaiknya number untuk kalkulasi
  total: string; // Sebaiknya number
}

interface Invoice {
  invoice: string;
  paymentStatus:
    | "Paid"
    | "Pending"
    | "Unpaid"
    | "Packing"
    | "OnDelivery"
    | "Finish"
    | "Cancel"; // Perluas tipe status
  totalAmount: string; // Sebaiknya number
  paymentMethod: string;
  date: string; // Sebaiknya format YYYY-MM-DD atau objek Date
  items: number;
  pv?: string; // Opsional
  orderDetails?: OrderDetail[]; // Detail pesanan untuk setiap invoice
}

const DisplayBooking = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all"); // State untuk tab aktif

  // Data dummy invoices dengan orderDetails yang lebih relevan
  const allInvoices: Invoice[] = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "Rp250.000",
      paymentMethod: "Credit Card",
      date: "2025-03-18",
      items: 2,
      pv: "10.000",
      orderDetails: [
        {
          name: "Kue Nastar Premium",
          quantity: 1,
          price: "Rp150.000",
          total: "Rp150.000",
        },
        {
          name: "Red Velvet Slice",
          quantity: 2,
          price: "Rp35.000",
          total: "Rp70.000",
        },
        // Tambahkan item lain jika totalAmount Rp250.000
      ],
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "Rp150.000",
      paymentMethod: "PayPal",
      date: "2025-03-19",
      items: 1,
      pv: "7.500",
      orderDetails: [
        {
          name: "Paket Donat Ceria",
          quantity: 1,
          price: "Rp65.000",
          total: "Rp65.000",
        },
      ], // Sesuaikan item & total
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "Rp350.000",
      paymentMethod: "Bank Transfer",
      date: "2025-03-20",
      items: 3,
      pv: "12.000",
      orderDetails: [
        {
          name: "Cheesecake Blueberry",
          quantity: 2,
          price: "Rp42.000",
          total: "Rp84.000",
        },
        {
          name: "Kopi Susu Gula Aren",
          quantity: 3,
          price: "Rp22.000",
          total: "Rp66.000",
        },
      ], // Sesuaikan item & total
    },
    {
      invoice: "INV004",
      paymentStatus: "Packing",
      totalAmount: "Rp180.000",
      paymentMethod: "COD",
      date: "2025-03-21",
      items: 2,
      pv: "9.000",
      orderDetails: [
        {
          name: "Roti Sobek Cokelat Keju",
          quantity: 2,
          price: "Rp48.000",
          total: "Rp96.000",
        },
      ],
    },
    {
      invoice: "INV005",
      paymentStatus: "OnDelivery",
      totalAmount: "Rp95.000",
      paymentMethod: "Credit Card",
      date: "2025-03-22",
      items: 1,
      pv: "4.500",
      orderDetails: [
        {
          name: "Kastengel Keju Edam",
          quantity: 1,
          price: "Rp95.000",
          total: "Rp95.000",
        },
      ],
    },
    {
      invoice: "INV006",
      paymentStatus: "Finish",
      totalAmount: "Rp220.000",
      paymentMethod: "E-Wallet",
      date: "2025-03-15",
      items: 4,
      pv: "11.000",
      orderDetails: [
        {
          name: "Brownies Panggang",
          quantity: 2,
          price: "Rp60.000",
          total: "Rp120.000",
        },
      ],
    },
    {
      invoice: "INV007",
      paymentStatus: "Cancel",
      totalAmount: "Rp100.000",
      paymentMethod: "Bank Transfer",
      date: "2025-03-10",
      items: 1,
      pv: "5.000",
      orderDetails: [
        {
          name: "Croissant Mentega",
          quantity: 3,
          price: "Rp18.000",
          total: "Rp54.000",
        },
      ],
    },
  ];

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  // Logika untuk memfilter invoices berdasarkan tab aktif DAN query pencarian
  const filteredInvoices = allInvoices.filter((order) => {
    const matchesTab =
      activeTab === "all" ||
      order.paymentStatus.toLowerCase() === activeTab.toLowerCase() ||
      (activeTab === "notPaid" && order.paymentStatus === "Unpaid") ||
      (activeTab === "packing" && order.paymentStatus === "Packing") ||
      (activeTab === "onDelivery" && order.paymentStatus === "OnDelivery") ||
      (activeTab === "finish" && order.paymentStatus === "Finish") ||
      (activeTab === "cancel" && order.paymentStatus === "Cancel");

    const matchesSearch =
      searchQuery === "" ||
      order.invoice.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.paymentStatus.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (order.orderDetails &&
        order.orderDetails.some((detail) =>
          detail.name.toLowerCase().includes(searchQuery.toLowerCase())
        ));

    return matchesTab && matchesSearch;
  });

  // Handler untuk klik tombol aksi (contoh)
  const handlePay = (invoiceId: string) =>
    alert(`Proses pembayaran untuk: ${invoiceId}`);
  const handleTrackOrder = (invoiceId: string) =>
    alert(`Lacak pesanan: ${invoiceId}`);
  const handleViewDetails = (invoiceId: string) =>
    alert(`Lihat detail pesanan: ${invoiceId}`);

  return (
    <div className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Pesanan Saya</CardTitle>
        <CardDescription>
          Lacak, kelola, dan lihat riwayat pesanan Anda di sini.
        </CardDescription>
        <Command className="rounded-lg border dark:border-neutral-700 shadow-xs mt-2 relative">
          <CommandInput
            placeholder="Cari pesanan (No. Invoice, Status, Nama Produk)..."
            value={searchQuery}
            onValueChange={handleSearchChange} // Menggunakan onValueChange untuk CommandInput
          />
          {/* CommandList bisa ditampilkan jika ada saran atau hasil instan, saat ini filter langsung ke daftar */}
        </Command>
      </CardHeader>
      <CardContent className="p-0 md:p-2 lg:p-4 flex-grow flex flex-col overflow-hidden">
        <Tabs
          defaultValue="all"
          className="w-full flex flex-col flex-grow"
          onValueChange={setActiveTab}
        >
          <div className="categoriesBooking overflow-x-auto whitespace-nowrap pb-2 mb-4 border-b dark:border-neutral-700">
            <TabsList className="w-max justify-start gap-1 bg-transparent px-1">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm px-3 py-1.5 text-sm"
              >
                Semua
              </TabsTrigger>
              <TabsTrigger
                value="notPaid"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm px-3 py-1.5 text-sm"
              >
                Belum Bayar
              </TabsTrigger>
              <TabsTrigger
                value="packing"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm px-3 py-1.5 text-sm"
              >
                Dikemas
              </TabsTrigger>
              <TabsTrigger
                value="onDelivery"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm px-3 py-1.5 text-sm"
              >
                Dikirim
              </TabsTrigger>
              <TabsTrigger
                value="finish"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm px-3 py-1.5 text-sm"
              >
                Selesai
              </TabsTrigger>
              <TabsTrigger
                value="cancel"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm px-3 py-1.5 text-sm"
              >
                Dibatalkan
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Menggunakan ScrollArea untuk konten tab agar bisa discroll jika melebihi tinggi */}
          <ScrollArea className="flex-grow pr-1">
            <TabsContent value={activeTab} className="mt-0">
              {" "}
              {/* Hanya render konten tab yang aktif */}
              {filteredInvoices.length > 0 ? (
                filteredInvoices.map(
                  (
                    order,
                    index // Menggunakan index untuk value AccordionItem sementara
                  ) => (
                    <Accordion
                      key={order.invoice}
                      type="single"
                      collapsible
                      className="mb-2 border dark:border-neutral-700 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                    >
                      <AccordionItem
                        value={`item-${order.invoice}`}
                        className="border-b-0"
                      >
                        <AccordionTrigger className="p-3 hover:bg-muted/50 dark:hover:bg-muted/30 rounded-t-lg text-sm">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full gap-2 md:gap-4 text-left">
                            <div
                              className="font-semibold text-neutral-800 dark:text-neutral-100 md:w-[120px] truncate"
                              title={order.invoice}
                            >
                              #{order.invoice}
                            </div>
                            <div className="md:w-[150px]">
                              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                                Tanggal Pesan
                              </p>
                              <p className="text-neutral-700 dark:text-neutral-300">
                                {order.date}
                              </p>
                            </div>
                            <div className="md:w-[100px]">
                              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                                Status
                              </p>
                              <p
                                className={`font-medium ${
                                  order.paymentStatus === "Paid"
                                    ? "text-green-600 dark:text-green-400"
                                    : order.paymentStatus === "Pending"
                                      ? "text-yellow-600 dark:text-yellow-400"
                                      : order.paymentStatus === "Unpaid"
                                        ? "text-red-600 dark:text-red-400"
                                        : order.paymentStatus === "Packing"
                                          ? "text-blue-600 dark:text-blue-400"
                                          : order.paymentStatus === "OnDelivery"
                                            ? "text-purple-600 dark:text-purple-400"
                                            : order.paymentStatus === "Finish"
                                              ? "text-teal-600 dark:text-teal-400"
                                              : "text-neutral-500 dark:text-neutral-400" // Cancel
                                }`}
                              >
                                {order.paymentStatus}
                              </p>
                            </div>
                            <div className="md:w-[80px] text-left md:text-right">
                              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                                Items
                              </p>
                              <p className="text-neutral-700 dark:text-neutral-300">
                                {order.items}
                              </p>
                            </div>
                            <div className="md:w-[120px] text-left md:text-right">
                              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                                Total
                              </p>
                              <p className="font-semibold text-neutral-800 dark:text-neutral-100">
                                {order.totalAmount}
                              </p>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="p-3 bg-muted/30 dark:bg-muted/10 rounded-b-lg">
                          <p className="text-sm font-semibold mb-2">
                            Detail Item:
                          </p>
                          {order.orderDetails &&
                          order.orderDetails.length > 0 ? (
                            <Table className="bg-background dark:bg-neutral-800/50 text-xs">
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Produk</TableHead>
                                  <TableHead className="text-center">
                                    Jumlah
                                  </TableHead>
                                  <TableHead className="text-right">
                                    Harga Satuan
                                  </TableHead>
                                  <TableHead className="text-right">
                                    Subtotal
                                  </TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {order.orderDetails.map((item, itemIdx) => (
                                  <TableRow
                                    key={`${order.invoice}-item-${itemIdx}`}
                                  >
                                    <TableCell className="font-medium">
                                      {item.name}
                                    </TableCell>
                                    <TableCell className="text-center">
                                      {item.quantity}
                                    </TableCell>
                                    <TableCell className="text-right">
                                      {item.price}
                                    </TableCell>
                                    <TableCell className="text-right">
                                      {item.total}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          ) : (
                            <p className="text-xs text-neutral-500">
                              Tidak ada detail item untuk pesanan ini.
                            </p>
                          )}
                          <div className="flex flex-wrap items-center gap-2 justify-end mt-4 pt-3 border-t dark:border-neutral-700">
                            {order.paymentStatus === "Unpaid" && (
                              <Button
                                size="sm"
                                className="bg-blue-500 hover:bg-blue-600 text-white text-xs"
                                onClick={() => handlePay(order.invoice)}
                              >
                                <CreditCard className="mr-1.5 h-3.5 w-3.5" />{" "}
                                Bayar
                              </Button>
                            )}
                            {order.paymentStatus !== "Finish" &&
                              order.paymentStatus !== "Cancel" && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-xs"
                                  onClick={() =>
                                    handleTrackOrder(order.invoice)
                                  }
                                >
                                  <Truck className="mr-1.5 h-3.5 w-3.5" /> Lacak
                                </Button>
                              )}
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-xs"
                              onClick={() => handleViewDetails(order.invoice)}
                            >
                              <Eye className="mr-1.5 h-3.5 w-3.5" /> Detail
                            </Button>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  )
                )
              ) : (
                <p className="p-10 text-center text-neutral-500 dark:text-neutral-400">
                  {searchQuery
                    ? "Tidak ada pesanan yang cocok dengan pencarian Anda."
                    : `Tidak ada pesanan dengan status "${activeTab}".`}
                </p>
              )}
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </CardContent>
    </div>
  );
};
export default DisplayBooking;
