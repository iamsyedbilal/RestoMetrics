import { useState } from "react";
import { Pencil } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";

import { Button } from "../../../components/ui/button";

import MenuForm from "./MenuForm";
import { useUpdateMenu } from "../hooks/useMenu";
import type { MenuItem } from "../../../types/menuType";

type Props = {
  menu: MenuItem;
};

export default function EditMenuDialog({ menu }: Props) {
  const [open, setOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { mutate: updateMenu, isPending } = useUpdateMenu();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });

  const handleOpenChange = (value: boolean) => {
    setOpen(value);

    if (value && menu) {
      setForm({
        name: menu.name ?? "",
        description: menu.description ?? "",
        price: String(menu.price ?? ""),
        category: menu.category ?? "",
      });

      setImagePreview(menu.image_url ?? null);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    updateMenu(
      {
        menuId: menu.id,
        menuData: {
          name: form.name,
          description: form.description,
          category: form.category,
          price: Number(form.price),
          is_available: true,
        },
        imageFile: imageFile ?? undefined,
      },
      {
        onSuccess: () => setOpen(false),
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex-1">
          <Pencil className="mr-2 h-4 w-4" />
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Menu Item</DialogTitle>
        </DialogHeader>

        <MenuForm
          form={form}
          imagePreview={imagePreview}
          isPending={isPending}
          onChange={handleChange}
          onImageChange={handleImageChange}
          onSubmit={handleSubmit}
          submitLabel={isPending ? "Updating..." : "Update Item"}
        />
      </DialogContent>
    </Dialog>
  );
}
