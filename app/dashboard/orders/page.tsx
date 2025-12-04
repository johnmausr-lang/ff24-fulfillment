import OrdersList from "@/components/OrdersList";

export default function OrdersPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Мои заявки на поставку</h1>
      <OrdersList />
    </div>
  );
}
