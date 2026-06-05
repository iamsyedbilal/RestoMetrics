import { useGetAllMenu } from "../hooks/useMenu";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Pencil } from "lucide-react";
import SkeletonLoading from "../../../components/shared/SkeletonLoading";
import DeleteMenuDialog from "./AlertDialog";
import type { MenuItem } from "../../../types/menuType";

export default function MenuList() {
  const { data: menus, isPending } = useGetAllMenu();

  if (isPending) return <SkeletonLoading />;

  if (!menus?.length) {
    return (
      <Card className="py-12">
        <CardContent className="flex justify-center">
          <p className="text-muted-foreground">No menu items found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-4">
      {(menus as MenuItem[]).map((item) => (
        <Card
          key={item.id}
          className="overflow-hidden transition-all hover:shadow-lg">
          {/* Image */}
          <div className="h-52 overflow-hidden bg-muted">
            {item.image_url ? (
              <img
                src={item.image_url}
                alt={item.name}
                className="h-full w-full object-cover block"
                loading="lazy"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                No Image
              </div>
            )}
          </div>

          <CardHeader>
            <div className="flex items-start justify-between">
              <CardTitle className="text-lg">{item.name}</CardTitle>

              <Badge variant={item.is_available ? "default" : "secondary"}>
                {item.is_available ? "Available" : "Unavailable"}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-3">
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {item.description || "No description"}
            </p>

            {item.category && <Badge variant="outline">{item.category}</Badge>}

            <div className="text-2xl font-bold text-primary">
              PKR {Number(item.price).toLocaleString()}
            </div>
          </CardContent>

          <CardFooter className="gap-2">
            <Button variant="outline" className="flex-1">
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </Button>

            <DeleteMenuDialog itemId={item.id} itemName={item.name} />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
