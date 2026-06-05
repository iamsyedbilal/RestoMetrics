import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";

import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { useState } from "react";
import { useCreateMenu } from "../hooks/useMenu";

export default function MenuFormDialog() {
  const [open, setOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { mutate: createMenu, isPending } = useCreateMenu();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image_url: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
        imageFile: imageFile || undefined,
      },
      {
        onSuccess: () => {
          setOpen(false);
          setForm({
            name: "",
            description: "",
            price: "",
            category: "",
            image_url: "",
          });
          setImageFile(null);
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
          <DialogTitle>Add New Menu Item</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="name"
            placeholder="Menu name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <Textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
          />

          <Input
            name="price"
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            required
          />

          <Input
            name="category"
            placeholder="Category (e.g. Burgers)"
            value={form.category}
            onChange={handleChange}
          />

          <Input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                setImageFile(e.target.files[0]);
              }
            }}
          />

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Adding..." : "Add Menu Item"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
