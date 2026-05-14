import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAllProductRows } from "@/lib/products-db";
import { AdminPanel } from "./AdminPanel";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const expected = process.env.ADMIN_PASSWORD ?? "elmorro2024";
  if (cookieStore.get("admin_auth")?.value !== expected) {
    redirect("/admin/login");
  }

  const products = getAllProductRows();
  return <AdminPanel products={products} />;
}
