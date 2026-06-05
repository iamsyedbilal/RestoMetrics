import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";

import MenuForm from "./MenuForm";
import { useCreateMenu } from "../hooks/useMenu";

export default function CreateMenuDialog() {
  const [open, setOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { mutate: createMenu, isPending } = useCreateMenu();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });

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

  const reset = () => {
    setForm({ name: "", description: "", price: "", category: "" });
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createMenu(
      {
        menuData: {
          name: form.name,
          description: form.description,
          category: form.category,
          price: Number(form.price),
          is_available: true,
          image_url: "",
        },
        imageFile: imageFile ?? undefined,
      },
      {
        onSuccess: () => {
          setOpen(false);
          reset();
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>+ Add New Menu</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Menu Item</DialogTitle>
        </DialogHeader>

        <MenuForm
          form={form}
          imagePreview={imagePreview}
          isPending={isPending}
          onChange={handleChange}
          onImageChange={handleImageChange}
          onSubmit={handleSubmit}
          submitLabel={isPending ? "Adding..." : "Add Item"}
        />
      </DialogContent>
    </Dialog>
  );
}
