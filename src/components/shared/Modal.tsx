import Loading from "./Loading";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

import { useOrderModalStore } from "../../store/orderModalStore";
import { useSingleOrder } from "../../features/orders/hooks/userOrder";

type OrderItem = {
  id: string | number;
  quantity: number;
  subtotal: number;
  menu_items?: {
    name?: string;
  };
};

export default function OrderDetailsModal() {
  const { open, close, orderId } = useOrderModalStore();

  const { data: order, isPending } = useSingleOrder(orderId || undefined);

  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Order #{orderId?.slice(0, 6)}</DialogTitle>
        </DialogHeader>

        {isPending ? (
          <Loading />
        ) : (
          <div className="space-y-4">
            <div>
              <p>
                <strong>Customer:</strong> {order?.customers?.name}
              </p>

              <p>
                <strong>Status:</strong> {order?.status}
              </p>

              <p>
                <strong>Total:</strong> PKR {order?.total_amount}
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Items</h3>

              <div className="space-y-2">
                {order?.order_items?.map((item: OrderItem) => (
                  <div
                    key={item.id}
                    className="flex justify-between border-b pb-2">
                    <span>
                      {item.menu_items?.name} × {item.quantity}
                    </span>

                    <span>PKR {item.subtotal}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
