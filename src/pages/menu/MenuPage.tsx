import MenuList from "../../features/menu/components/MenuList";

import MenuFormDialog from "../../features/menu/components/MenuFormDialog";

export default function MenuPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Menu Items</h1>
          <p className="text-muted-foreground">Manage your restaurant menu</p>
        </div>

        <MenuFormDialog />
      </div>

      <MenuList />
    </div>
  );
}
