"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  addProduct,
  updateProduct,
  deleteProduct,
  toggleActive,
  type ProductRow,
} from "@/lib/products-db";

function getExpectedPassword(): string {
  return process.env.ADMIN_PASSWORD ?? "elmorro2024";
}

async function requireAuth(): Promise<void> {
  const cookieStore = await cookies();
  if (cookieStore.get("admin_auth")?.value !== getExpectedPassword()) {
    redirect("/admin/login");
  }
}

export async function loginAction(
  _prev: { error?: string } | null,
  formData: FormData
): Promise<{ error: string }> {
  const password = formData.get("password") as string;
  if (password !== getExpectedPassword()) {
    return { error: "Contraseña incorrecta" };
  }
  const cookieStore = await cookies();
  cookieStore.set("admin_auth", getExpectedPassword(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "lax",
    path: "/",
  });
  redirect("/admin");
}

export async function logoutAction(): Promise<never> {
  const cookieStore = await cookies();
  cookieStore.delete("admin_auth");
  redirect("/admin/login");
}

export async function addProductAction(data: {
  nombre: string;
  descripcion: string;
  precio: number;
  categoria_id: string;
  imagen_url: string;
}): Promise<void> {
  await requireAuth();
  const slug = data.nombre
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  addProduct({ ...data, id: `${slug}-${Date.now()}` });
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function updateProductAction(
  id: string,
  data: Partial<Omit<ProductRow, "id" | "activo" | "orden">>
): Promise<void> {
  await requireAuth();
  updateProduct(id, data);
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function deleteProductAction(id: string): Promise<void> {
  await requireAuth();
  deleteProduct(id);
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function toggleActiveAction(id: string): Promise<void> {
  await requireAuth();
  toggleActive(id);
  revalidatePath("/");
  revalidatePath("/admin");
}
