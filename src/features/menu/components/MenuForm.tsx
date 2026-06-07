import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { Button } from "../../../components/ui/button";

type Props = {
  form: {
    name: string;
    description: string;
    price: string;
    category: string;
    is_available: boolean;
  };
  imagePreview: string | null;
  isPending: boolean;

  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;

  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  onSubmit: (e: React.FormEvent) => void;

  submitLabel: string;
};

export default function MenuForm({
  form,
  imagePreview,
  isPending,
  onChange,
  onImageChange,
  onSubmit,
  submitLabel,
}: Props) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Input
        name="name"
        placeholder="Item name"
        value={form.name}
        onChange={onChange}
        required
      />

      <Textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={onChange}
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          name="price"
          type="number"
          placeholder="Price (PKR)"
          value={form.price}
          onChange={onChange}
          required
        />

        <Input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={onChange}
          required
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="is_available"
          checked={form.is_available}
          onChange={onChange}
        />
        <label className="text-sm">Available</label>
      </div>

      {imagePreview && (
        <img
          src={imagePreview}
          alt="preview"
          className="h-32 w-full rounded-lg border object-cover"
        />
      )}

      <Input type="file" accept="image/*" onChange={onImageChange} />

      <Button type="submit" className="w-full" disabled={isPending}>
        {submitLabel}
      </Button>
    </form>
  );
}
