import MenuList from "../../features/menu/components/MenuList";

import MenuFilter from "../../features/menu/components/MenuFilter";
import CreateMenuDialog from "../../features/menu/components/CreateMenuDialog";

export default function MenuPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Menu Items</h1>
          <p className="text-muted-foreground">Manage your restaurant menu</p>
        </div>

        <CreateMenuDialog />
      </div>
      <MenuFilter />

      <MenuList />
    </div>
  );
}
