import { getDb } from "./db";
import type { Category, Product } from "@/data/products";

export interface ProductRow {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria_id: string;
  imagen_url: string;
  activo: number; // 0 | 1
  orden: number;
}

export function getActiveProducts(): Product[] {
  const rows = getDb()
    .prepare("SELECT * FROM productos WHERE activo = 1 ORDER BY categoria_id, orden, nombre")
    .all() as ProductRow[];
  return rows.map(toModel);
}

export function getAllProductRows(): ProductRow[] {
  return getDb()
    .prepare("SELECT * FROM productos ORDER BY categoria_id, orden, nombre")
    .all() as ProductRow[];
}

export function addProduct(data: Omit<ProductRow, "activo" | "orden">): void {
  const db = getDb();
  const { m } = db
    .prepare("SELECT COALESCE(MAX(orden), -1) as m FROM productos WHERE categoria_id = ?")
    .get(data.categoria_id) as { m: number };
  db.prepare(`
    INSERT INTO productos (id, nombre, descripcion, precio, categoria_id, imagen_url, activo, orden)
    VALUES (@id, @nombre, @descripcion, @precio, @categoria_id, @imagen_url, 1, @orden)
  `).run({ ...data, orden: m + 1 });
}

export function updateProduct(id: string, data: Partial<Omit<ProductRow, "id">>): void {
  const fields = Object.keys(data).filter((k) => k !== "id");
  if (fields.length === 0) return;
  const sets = fields.map((k) => `${k} = @${k}`).join(", ");
  getDb()
    .prepare(`UPDATE productos SET ${sets} WHERE id = @id`)
    .run({ ...data, id });
}

export function deleteProduct(id: string): void {
  getDb().prepare("DELETE FROM productos WHERE id = ?").run(id);
}

export function toggleActive(id: string): void {
  getDb().prepare("UPDATE productos SET activo = 1 - activo WHERE id = ?").run(id);
}

function toModel(row: ProductRow): Product {
  return {
    id: row.id,
    name: row.nombre,
    description: row.descripcion,
    price: row.precio,
    category: row.categoria_id as Category,
    image: row.imagen_url,
  };
}
