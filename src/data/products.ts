export type Category = "fiambreria" | "carniceria";

export interface Product {
  id: string;
  name: string;
  price: number;      // ARS por kg
  category: Category;
  image: string;
  description: string;
}

export const CATEGORY_LABELS: Record<Category, string> = {
  fiambreria: "Fiambrería",
  carniceria: "Carnicería",
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CÓMO AGREGAR UN PRODUCTO
//   1. Copiá cualquier bloque { ... } de abajo
//   2. Cambiá: id (único, sin espacios), name, price, category, image, description
//   3. Guardá el archivo — el sitio se actualiza solo
//
// CÓMO CAMBIAR PRECIO
//   Buscá el producto por su "id" o "name" y modificá "price"
//
// CATEGORÍAS VÁLIDAS:  "fiambreria"  |  "carniceria"
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const products: Product[] = [

  // ─── FIAMBRERÍA ────────────────────────────────────────────────────────────

  {
    id: "jamon-crudo-el-morro",
    name: "Jamón Crudo El Morro",
    price: 4200,
    category: "fiambreria",
    description: "De elaboración propia",
    image: "https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?w=400&h=300&fit=crop&q=80",
  },
  {
    id: "bondiola-fiambre-el-morro",
    name: "Bondiola Fiambre El Morro",
    price: 3800,
    category: "fiambreria",
    description: "Bondiola curada, corte propio",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop&q=80",
  },
  {
    id: "chorizo-colorado-el-morro",
    name: "Chorizo Colorado El Morro",
    price: 3600,
    category: "fiambreria",
    description: "Chorizo colorado artesanal",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&h=300&fit=crop&q=80",
  },
  {
    id: "salamin-cagnoli",
    name: "Salamín Cagnoli",
    price: 4800,
    category: "fiambreria",
    description: "Salamín italiano curado",
    image: "https://images.unsplash.com/photo-1602524816295-9b1e06d35b3d?w=400&h=300&fit=crop&q=80",
  },
  {
    id: "panceta-salada-calchaqui",
    name: "Panceta Salada Calchaquí",
    price: 2900,
    category: "fiambreria",
    description: "Lista para cortar y cocinar",
    image: "https://images.unsplash.com/photo-1528607929212-2636ec44253e?w=400&h=300&fit=crop&q=80",
  },
  {
    id: "lomo-horneado-bocatti",
    name: "Lomo Horneado Bocatti",
    price: 5200,
    category: "fiambreria",
    description: "Jugoso y tierno, horneado lento",
    image: "https://images.unsplash.com/photo-1544025162-d76538b7f16d?w=400&h=300&fit=crop&q=80",
  },
  {
    id: "queso-port-salut",
    name: "Queso Port Salut Punta del Agua",
    price: 3100,
    category: "fiambreria",
    description: "Cremoso de pasta semiblanda",
    image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&h=300&fit=crop&q=80",
  },
  {
    id: "queso-reggianito-tregar",
    name: "Queso Reggianito Tregar",
    price: 3500,
    category: "fiambreria",
    description: "Queso duro de gusto intenso",
    image: "https://images.unsplash.com/photo-1452195100486-9cc805987862?w=400&h=300&fit=crop&q=80",
  },

  // ─── CARNICERÍA ────────────────────────────────────────────────────────────

  {
    id: "milanesa-de-carne",
    name: "Milanesa de Carne",
    price: 5400,
    category: "carniceria",
    description: "De cuadrada, finitas y tiernas",
    image: "https://images.unsplash.com/photo-1573225342350-16731dd9bf3d?w=400&h=300&fit=crop&q=80",
  },
  {
    id: "bife-de-chorizo",
    name: "Bife de Chorizo",
    price: 8900,
    category: "carniceria",
    description: "Novillo marmolado, corte grueso",
    image: "https://images.unsplash.com/photo-1558030006-450675393462?w=400&h=300&fit=crop&q=80",
  },
  {
    id: "asado-carnicero-novillo",
    name: "Asado Carnicero de Novillo",
    price: 4200,
    category: "carniceria",
    description: "Con costilla, ideal para la parrilla",
    image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&h=300&fit=crop&q=80",
  },
  {
    id: "entrana-de-novillo",
    name: "Entraña de Novillo",
    price: 7600,
    category: "carniceria",
    description: "Fina, jugosa y de sabor intenso",
    image: "https://images.unsplash.com/photo-1536047024074-6da1abbb0e54?w=400&h=300&fit=crop&q=80",
  },
  {
    id: "colita-de-cuadril",
    name: "Colita de Cuadril",
    price: 5800,
    category: "carniceria",
    description: "Magra, perfecta para el horno",
    image: "https://images.unsplash.com/photo-1529694157872-4e0c0f3b238b?w=400&h=300&fit=crop&q=80",
  },
  {
    id: "hamburguesas-el-morro",
    name: "Hamburguesas El Morro",
    price: 3900,
    category: "carniceria",
    description: "Artesanales de elaboración propia",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop&q=80",
  },
  {
    id: "pollo-parrillero",
    name: "Pollo Parrillero",
    price: 2600,
    category: "carniceria",
    description: "Entero y fresco, listo para la parrilla",
    image: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=400&h=300&fit=crop&q=80",
  },
  {
    id: "matambre-de-novillo",
    name: "Matambre de Novillo",
    price: 4800,
    category: "carniceria",
    description: "Para arrollar o a la parrilla",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop&q=80",
  },
];
