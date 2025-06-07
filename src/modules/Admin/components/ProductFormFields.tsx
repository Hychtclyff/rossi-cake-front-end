import { ProductProops } from "@/common/types/product.types";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const ProductFormFields = ({
  mode,
  initialData,
  onSubmit,
  onCancel,
}: {
  mode: "create" | "update";
  initialData?: ProductProops | null;
  onSubmit: (data: ProductProops) => void;
  onCancel: () => void;
}) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const today = new Date().toISOString();
    const formData = new FormData(event.currentTarget);
    const data: ProductProops = {
      // product: formData.get("product") as string,
      name: formData.get("name") as string,
      price: parseFloat(formData.get("price") as string) || 0,
      totalAmount: parseInt(formData.get("totalAmount") as string, 10) || 0,
      imageUrl: (formData.get("imageUrl") as string) || "",
      description: (formData.get("description") as string) || "",
      id: "",
      category: "",
      createdAt: today,
      updatedAt: today,
    };
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle>
          {mode === "update"
            ? `Edit Produk: ${initialData?.name || ""}`
            : "Tambah Produk Baru"}
        </DialogTitle>
        <DialogDescription>
          Lengkapi detail produk di bawah ini.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="product-id" className="text-right">
            ID Produk
          </Label>
          <Input
            id="product-id"
            name="product"
            defaultValue={initialData?.id ?? ""}
            className="col-span-3"
            readOnly={mode === "update"}
            required
            placeholder="Contoh: KUE007"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="product-name" className="text-right">
            Nama Produk
          </Label>
          <Input
            id="product-name"
            name="name"
            defaultValue={initialData?.name ?? ""}
            className="col-span-3"
            required
            placeholder="Contoh: Brownies Cokelat"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="product-price" className="text-right">
            Harga (Rp)
          </Label>
          <Input
            id="product-price"
            name="price"
            type="number"
            min="0"
            defaultValue={initialData?.price ?? ""}
            className="col-span-3"
            required
            placeholder="Contoh: 50000"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="product-stock" className="text-right">
            Stok (pcs)
          </Label>
          <Input
            id="product-stock"
            name="totalAmount"
            type="number"
            min="0"
            defaultValue={initialData?.totalAmount ?? ""}
            className="col-span-3"
            required
            placeholder="Contoh: 20"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="product-imageUrl" className="text-right">
            URL Gambar
          </Label>
          <Input
            id="product-imageUrl"
            name="imageUrl"
            type="url"
            defaultValue={initialData?.imageUrl ?? ""}
            className="col-span-3"
            placeholder="https://..."
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="product-description" className="text-right">
            Deskripsi
          </Label>
          <Textarea
            id="product-description"
            name="description"
            defaultValue={initialData?.description ?? ""}
            className="col-span-3"
            placeholder="Deskripsi singkat produk..."
            rows={3}
          />
        </div>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="outline" onClick={onCancel}>
            Batal
          </Button>
        </DialogClose>
        <Button type="submit">
          {mode === "update" ? "Update Produk" : "Simpan Produk"}
        </Button>
      </DialogFooter>
    </form>
  );
};
