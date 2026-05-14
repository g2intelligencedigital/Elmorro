import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "elmorro.db");

// Singleton global en dev para sobrevivir hot-reloads
declare global {
  // eslint-disable-next-line no-var
  var _elmorro_db: Database.Database | undefined;
}

function createDb(): Database.Database {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");
  initSchema(db);
  return db;
}

export function getDb(): Database.Database {
  if (process.env.NODE_ENV !== "production") {
    if (!global._elmorro_db) global._elmorro_db = createDb();
    return global._elmorro_db;
  }
  return createDb();
}

function initSchema(db: Database.Database): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS categorias (
      id     TEXT PRIMARY KEY,
      nombre TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS productos (
      id           TEXT    PRIMARY KEY,
      nombre       TEXT    NOT NULL,
      descripcion  TEXT    NOT NULL DEFAULT '',
      precio       REAL    NOT NULL CHECK(precio > 0),
      categoria_id TEXT    NOT NULL REFERENCES categorias(id),
      imagen_url   TEXT    NOT NULL DEFAULT '',
      activo       INTEGER NOT NULL DEFAULT 1 CHECK(activo IN (0,1)),
      orden        INTEGER NOT NULL DEFAULT 0
    );
  `);

  db.prepare("INSERT OR IGNORE INTO categorias VALUES ('fiambreria', 'Fiambrería')").run();
  db.prepare("INSERT OR IGNORE INTO categorias VALUES ('carniceria', 'Carnicería')").run();

  const { n } = db.prepare("SELECT COUNT(*) as n FROM productos").get() as { n: number };
  if (n === 0) seedProducts(db);
}

function seedProducts(db: Database.Database): void {
  const insert = db.prepare(`
    INSERT INTO productos (id, nombre, descripcion, precio, categoria_id, imagen_url, orden)
    VALUES (@id, @nombre, @descripcion, @precio, @categoria_id, @imagen_url, @orden)
  `);

  const seedAll = db.transaction(() => {
    const fiambreria = [
      { id: "jamon-crudo-el-morro", nombre: "Jamón Crudo El Morro", descripcion: "De elaboración propia", precio: 4200, imagen_url: "https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?w=400&h=300&fit=crop&q=80" },
      { id: "bondiola-fiambre-el-morro", nombre: "Bondiola Fiambre El Morro", descripcion: "Bondiola curada, corte propio", precio: 3800, imagen_url: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop&q=80" },
      { id: "chorizo-colorado-el-morro", nombre: "Chorizo Colorado El Morro", descripcion: "Chorizo colorado artesanal", precio: 3600, imagen_url: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&h=300&fit=crop&q=80" },
      { id: "salamin-cagnoli", nombre: "Salamín Cagnoli", descripcion: "Salamín italiano curado", precio: 4800, imagen_url: "https://images.unsplash.com/photo-1602524816295-9b1e06d35b3d?w=400&h=300&fit=crop&q=80" },
      { id: "panceta-salada-calchaqui", nombre: "Panceta Salada Calchaquí", descripcion: "Lista para cortar y cocinar", precio: 2900, imagen_url: "https://images.unsplash.com/photo-1528607929212-2636ec44253e?w=400&h=300&fit=crop&q=80" },
      { id: "lomo-horneado-bocatti", nombre: "Lomo Horneado Bocatti", descripcion: "Jugoso y tierno, horneado lento", precio: 5200, imagen_url: "https://images.unsplash.com/photo-1544025162-d76538b7f16d?w=400&h=300&fit=crop&q=80" },
      { id: "queso-port-salut", nombre: "Queso Port Salut Punta del Agua", descripcion: "Cremoso de pasta semiblanda", precio: 3100, imagen_url: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&h=300&fit=crop&q=80" },
      { id: "queso-reggianito-tregar", nombre: "Queso Reggianito Tregar", descripcion: "Queso duro de gusto intenso", precio: 3500, imagen_url: "https://images.unsplash.com/photo-1452195100486-9cc805987862?w=400&h=300&fit=crop&q=80" },
    ];
    const carniceria = [
      { id: "milanesa-de-carne", nombre: "Milanesa de Carne", descripcion: "De cuadrada, finitas y tiernas", precio: 5400, imagen_url: "https://images.unsplash.com/photo-1573225342350-16731dd9bf3d?w=400&h=300&fit=crop&q=80" },
      { id: "bife-de-chorizo", nombre: "Bife de Chorizo", descripcion: "Novillo marmolado, corte grueso", precio: 8900, imagen_url: "https://images.unsplash.com/photo-1558030006-450675393462?w=400&h=300&fit=crop&q=80" },
      { id: "asado-carnicero-novillo", nombre: "Asado Carnicero de Novillo", descripcion: "Con costilla, ideal para la parrilla", precio: 4200, imagen_url: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&h=300&fit=crop&q=80" },
      { id: "entrana-de-novillo", nombre: "Entraña de Novillo", descripcion: "Fina, jugosa y de sabor intenso", precio: 7600, imagen_url: "https://images.unsplash.com/photo-1536047024074-6da1abbb0e54?w=400&h=300&fit=crop&q=80" },
      { id: "colita-de-cuadril", nombre: "Colita de Cuadril", descripcion: "Magra, perfecta para el horno", precio: 5800, imagen_url: "https://images.unsplash.com/photo-1529694157872-4e0c0f3b238b?w=400&h=300&fit=crop&q=80" },
      { id: "hamburguesas-el-morro", nombre: "Hamburguesas El Morro", descripcion: "Artesanales de elaboración propia", precio: 3900, imagen_url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop&q=80" },
      { id: "pollo-parrillero", nombre: "Pollo Parrillero", descripcion: "Entero y fresco, listo para la parrilla", precio: 2600, imagen_url: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=400&h=300&fit=crop&q=80" },
      { id: "matambre-de-novillo", nombre: "Matambre de Novillo", descripcion: "Para arrollar o a la parrilla", precio: 4800, imagen_url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop&q=80" },
    ];

    fiambreria.forEach((p, i) => insert.run({ ...p, categoria_id: "fiambreria", orden: i }));
    carniceria.forEach((p, i) => insert.run({ ...p, categoria_id: "carniceria", orden: i }));
  });

  seedAll();
}
