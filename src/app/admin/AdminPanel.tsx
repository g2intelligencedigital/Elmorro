"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Pencil, Trash2, Check, X, Plus, LogOut, Eye, EyeOff } from "lucide-react";
import {
  addProductAction,
  updateProductAction,
  deleteProductAction,
  toggleActiveAction,
  logoutAction,
} from "./actions";
import type { ProductRow } from "@/lib/products-db";

type FilterCategory = "todos" | "fiambreria" | "carniceria";

const CATEGORY_LABELS: Record<string, string> = {
  fiambreria: "Fiambrería",
  carniceria: "Carnicería",
};

const EMPTY_NEW = {
  nombre: "",
  descripcion: "",
  precio: "",
  categoria_id: "fiambreria",
  imagen_url: "",
};

function formatPrice(n: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(n);
}

export function AdminPanel({ products }: { products: ProductRow[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [filter, setFilter] = useState<FilterCategory>("todos");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<ProductRow>>({});
  const [adding, setAdding] = useState(false);
  const [newProduct, setNewProduct] = useState(EMPTY_NEW);

  const refresh = () => startTransition(() => router.refresh());

  const filtered =
    filter === "todos" ? products : products.filter((p) => p.categoria_id === filter);

  const activeCount = products.filter((p) => p.activo).length;

  // ── Handlers ────────────────────────────────────────────────────────────────

  function startEdit(product: ProductRow) {
    setEditingId(product.id);
    setEditData({ ...product });
  }

  function cancelEdit() {
    setEditingId(null);
    setEditData({});
  }

  async function saveEdit(id: string) {
    if (!editData.nombre?.trim() || !editData.precio || editData.precio <= 0) return;
    await updateProductAction(id, {
      nombre: editData.nombre,
      descripcion: editData.descripcion ?? "",
      precio: editData.precio,
      categoria_id: editData.categoria_id,
      imagen_url: editData.imagen_url ?? "",
    });
    setEditingId(null);
    refresh();
  }

  async function handleDelete(id: string) {
    if (!confirm("¿Eliminar este producto? Esta acción no se puede deshacer.")) return;
    await deleteProductAction(id);
    refresh();
  }

  async function handleToggle(id: string) {
    await toggleActiveAction(id);
    refresh();
  }

  async function handleAdd() {
    if (!newProduct.nombre.trim() || !newProduct.precio) return;
    await addProductAction({
      nombre: newProduct.nombre,
      descripcion: newProduct.descripcion,
      precio: parseFloat(newProduct.precio),
      categoria_id: newProduct.categoria_id,
      imagen_url: newProduct.imagen_url,
    });
    setAdding(false);
    setNewProduct(EMPTY_NEW);
    refresh();
  }

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#F4F2EE]">
      {/* Header */}
      <header className="bg-[#2E3A2E] text-white px-6 py-4 flex items-center justify-between">
        <h1
          className="text-xl md:text-2xl tracking-wide"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          PANEL DE ADMINISTRACIÓN · EL MORRO
        </h1>
        <form action={logoutAction}>
          <button
            type="submit"
            className="flex items-center gap-1.5 text-sm text-white/70 hover:text-white transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Salir
          </button>
        </form>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="flex gap-3 mb-8">
          <StatCard label="Total productos" value={products.length} color="#F36C21" />
          <StatCard label="Activos en el sitio" value={activeCount} color="#2E3A2E" />
          <StatCard label="Ocultos" value={products.length - activeCount} color="#9ca3af" />
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex gap-2">
            {(["todos", "fiambreria", "carniceria"] as FilterCategory[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                  filter === cat
                    ? "bg-[#F36C21] text-white shadow-sm"
                    : "bg-white text-black/60 border border-gray-200 hover:border-[#F36C21] hover:text-[#F36C21]"
                }`}
              >
                {cat === "todos" ? "Todos" : CATEGORY_LABELS[cat]}
              </button>
            ))}
          </div>
          <button
            onClick={() => {
              setAdding(true);
              setNewProduct(EMPTY_NEW);
            }}
            className="flex items-center gap-1.5 bg-[#2E3A2E] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#3d4d3d] transition-colors"
          >
            <Plus className="w-4 h-4" />
            Nuevo producto
          </button>
        </div>

        {/* Add product form */}
        {adding && (
          <div className="bg-white rounded-xl p-5 mb-4 border border-[#F36C21]/40 shadow-sm">
            <h3 className="font-semibold mb-4 text-[#2E3A2E]">Nuevo producto</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <Field
                label="Nombre *"
                value={newProduct.nombre}
                onChange={(v) => setNewProduct((p) => ({ ...p, nombre: v }))}
              />
              <Field
                label="Descripción"
                value={newProduct.descripcion}
                onChange={(v) => setNewProduct((p) => ({ ...p, descripcion: v }))}
              />
              <Field
                label="Precio ($/kg) *"
                value={newProduct.precio}
                type="number"
                onChange={(v) => setNewProduct((p) => ({ ...p, precio: v }))}
              />
              <div>
                <label className="text-xs font-medium text-black/50 block mb-1">
                  Categoría
                </label>
                <select
                  value={newProduct.categoria_id}
                  onChange={(e) =>
                    setNewProduct((p) => ({ ...p, categoria_id: e.target.value }))
                  }
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#F36C21]"
                >
                  <option value="fiambreria">Fiambrería</option>
                  <option value="carniceria">Carnicería</option>
                </select>
              </div>
              <Field
                label="URL de imagen (Unsplash u otra)"
                value={newProduct.imagen_url}
                onChange={(v) => setNewProduct((p) => ({ ...p, imagen_url: v }))}
              />
              {newProduct.imagen_url && (
                <div className="flex items-end">
                  <Image
                    src={newProduct.imagen_url}
                    alt="preview"
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-lg object-cover border border-gray-200"
                  />
                </div>
              )}
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={handleAdd}
                className="bg-[#F36C21] hover:bg-[#e05e15] text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors"
              >
                Guardar producto
              </button>
              <button
                onClick={() => setAdding(false)}
                className="bg-gray-100 text-gray-600 px-5 py-2 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
          <table className="w-full text-sm min-w-[640px]">
            <thead className="bg-[#F4F2EE]">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-black/50 w-16">
                  Foto
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-black/50">
                  Producto
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-black/50 w-32">
                  Categoría
                </th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-black/50 w-32">
                  Precio / kg
                </th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-black/50 w-24">
                  Visible
                </th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-black/50 w-28">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((product) =>
                editingId === product.id ? (
                  <EditRow
                    key={product.id}
                    editData={editData}
                    setEditData={setEditData}
                    onSave={() => saveEdit(product.id)}
                    onCancel={cancelEdit}
                  />
                ) : (
                  <ViewRow
                    key={product.id}
                    product={product}
                    onEdit={() => startEdit(product)}
                    onDelete={() => handleDelete(product.id)}
                    onToggle={() => handleToggle(product.id)}
                  />
                )
              )}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-black/30 text-sm">
                    No hay productos en esta categoría
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-black/30 mt-4 text-center">
          Los cambios se reflejan en el sitio al instante.
        </p>
      </div>

      {/* Saving indicator */}
      {isPending && (
        <div className="fixed bottom-4 right-4 bg-[#2E3A2E] text-white px-4 py-2 rounded-lg text-sm shadow-xl">
          Guardando...
        </div>
      )}
    </div>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function ViewRow({
  product,
  onEdit,
  onDelete,
  onToggle,
}: {
  product: ProductRow;
  onEdit: () => void;
  onDelete: () => void;
  onToggle: () => void;
}) {
  return (
    <tr
      className={`hover:bg-[#F4F2EE]/60 transition-colors ${!product.activo ? "opacity-45" : ""}`}
    >
      <td className="px-4 py-3">
        {product.imagen_url ? (
          <Image
            src={product.imagen_url}
            alt={product.nombre}
            width={48}
            height={48}
            className="w-12 h-12 rounded-lg object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-lg bg-gray-100" />
        )}
      </td>
      <td className="px-4 py-3">
        <p className="font-medium text-gray-900">{product.nombre}</p>
        <p className="text-xs text-black/40 mt-0.5">{product.descripcion}</p>
      </td>
      <td className="px-4 py-3">
        <span
          className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
            product.categoria_id === "fiambreria"
              ? "bg-amber-100 text-amber-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {CATEGORY_LABELS[product.categoria_id] ?? product.categoria_id}
        </span>
      </td>
      <td className="px-4 py-3 text-right font-bold text-[#F36C21]">
        {formatPrice(product.precio)}
      </td>
      <td className="px-4 py-3 text-center">
        <button
          onClick={onToggle}
          title={product.activo ? "Ocultar del sitio" : "Mostrar en el sitio"}
          className="mx-auto flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors"
        >
          {product.activo ? (
            <Eye className="w-4 h-4 text-[#2E3A2E]" />
          ) : (
            <EyeOff className="w-4 h-4 text-gray-400" />
          )}
        </button>
      </td>
      <td className="px-4 py-3 text-center">
        <div className="flex gap-1 justify-center">
          <button
            onClick={onEdit}
            title="Editar"
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F36C21]/10 text-[#F36C21] transition-colors"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onDelete}
            title="Eliminar"
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-red-400 hover:text-red-600 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </td>
    </tr>
  );
}

function EditRow({
  editData,
  setEditData,
  onSave,
  onCancel,
}: {
  editData: Partial<ProductRow>;
  setEditData: React.Dispatch<React.SetStateAction<Partial<ProductRow>>>;
  onSave: () => void;
  onCancel: () => void;
}) {
  return (
    <tr className="bg-[#FFF8F4]">
      <td className="px-4 py-3">
        {editData.imagen_url ? (
          <Image
            src={editData.imagen_url}
            alt=""
            width={48}
            height={48}
            className="w-12 h-12 rounded-lg object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-lg bg-gray-100" />
        )}
      </td>
      <td className="px-4 py-3 space-y-1.5">
        <input
          value={editData.nombre ?? ""}
          onChange={(e) => setEditData((d) => ({ ...d, nombre: e.target.value }))}
          className="w-full border border-gray-200 rounded-lg px-2.5 py-1.5 text-sm focus:outline-none focus:border-[#F36C21]"
          placeholder="Nombre"
        />
        <input
          value={editData.descripcion ?? ""}
          onChange={(e) => setEditData((d) => ({ ...d, descripcion: e.target.value }))}
          className="w-full border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-black/60 focus:outline-none focus:border-[#F36C21]"
          placeholder="Descripción"
        />
        <input
          value={editData.imagen_url ?? ""}
          onChange={(e) => setEditData((d) => ({ ...d, imagen_url: e.target.value }))}
          className="w-full border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-black/60 focus:outline-none focus:border-[#F36C21]"
          placeholder="URL de imagen"
        />
      </td>
      <td className="px-4 py-3">
        <select
          value={editData.categoria_id ?? "fiambreria"}
          onChange={(e) => setEditData((d) => ({ ...d, categoria_id: e.target.value }))}
          className="border border-gray-200 rounded-lg px-2.5 py-1.5 text-sm focus:outline-none focus:border-[#F36C21]"
        >
          <option value="fiambreria">Fiambrería</option>
          <option value="carniceria">Carnicería</option>
        </select>
      </td>
      <td className="px-4 py-3 text-right">
        <input
          type="number"
          value={editData.precio ?? ""}
          onChange={(e) =>
            setEditData((d) => ({ ...d, precio: parseFloat(e.target.value) }))
          }
          className="w-28 border border-gray-200 rounded-lg px-2.5 py-1.5 text-sm text-right focus:outline-none focus:border-[#F36C21]"
          min="0"
          step="100"
        />
      </td>
      <td className="px-4 py-3" />
      <td className="px-4 py-3 text-center">
        <div className="flex gap-1 justify-center">
          <button
            onClick={onSave}
            title="Guardar"
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#F36C21] text-white hover:bg-[#e05e15] transition-colors"
          >
            <Check className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onCancel}
            title="Cancelar"
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </td>
    </tr>
  );
}

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="bg-white rounded-xl px-5 py-3 shadow-sm">
      <p className="text-xs text-black/40">{label}</p>
      <p className="text-2xl font-bold mt-0.5" style={{ color }}>
        {value}
      </p>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="text-xs font-medium text-black/50 block mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#F36C21] focus:ring-1 focus:ring-[#F36C21]"
      />
    </div>
  );
}
