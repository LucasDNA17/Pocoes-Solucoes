import express from "express";
import { Sequelize, DataTypes } from "sequelize"; // [cite: 22]
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// cria conexão com banco em memória
const sequelize = new Sequelize({ // [cite: 24]
  dialect: "sqlite", // [cite: 25]
  storage: ":memory:", // [cite: 26]
  logging: false, // [cite: 27]
});

// Modelo da Poção (nome, descrição, imagem e preço)
const Potion = sequelize.define("Potion", { // [cite: 6]
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  image: { type: DataTypes.STRING, allowNull: false }, // [cite: 8]
  price: { type: DataTypes.FLOAT, allowNull: false }
});

// Popular banco inicial com os dados fornecidos
async function seedDatabase() {
  await sequelize.sync({ force: true });
  
  await Potion.bulkCreate([
    {
      name: "Poção Blue Sky", // [cite: 30]
      description: "Essa poção provê um surto de inspiração por 24 horas. Foi utilizada por John Lennon quando escreveu Lucy in the Sky with Diamonds.", // [cite: 31, 32]
      image: "https://i.ibb.co/ZzS7xb2/rsz-sky.png",
      price: 300 // [cite: 35]
    },
    {
      name: "Poção do Perfume Misterioso", // [cite: 36]
      description: "Essa poção faz com que você fique cheirando lilás e groselha por 24 dias. Essência muito admirada pelos bruxos.", // [cite: 37, 38]
      image: "https://i.ibb.co/pyhZJXf/rsz-lilas.png",
      price: 200 // [cite: 40]
    },
    {
      name: "Poção de Pinus", // [cite: 41]
      description: "Essa poção faz com que você fique 10 cm mais alto! Observação: efeitos colaterais desconhecidos.", // [cite: 42, 43]
      image: "https://i.ibb.co/DkzdL1q/rsz-pinus.png",
      price: 3000 // [cite: 46]
    },
    {
      name: "Poção da Beleza Eterna", // [cite: 47]
      description: "Veneno que mata rápido.", // [cite: 48]
      image: "https://i.ibb.co/9p872NK/rsz-1beleza.png",
      price: 100 // [cite: 51]
    },
    {
      name: "Poção do Arco íro", // [cite: 52]
      description: "Traz felicidade momentânea. Pode durar de 10 minutos a 2 dias.", // [cite: 53]
      image: "https://i.ibb.co/PrC09MP/rsz-2unicornio.png",
      price: 120 // [cite: 56]
    },
    {
      name: "Caldeirão das Verdades Secretas", // [cite: 57]
      description: "As pessoas lhe dirão apenas verdades por I hora. É necessário beber os 5L.", // [cite: 58]
      image: "https://i.ibb.co/s9Lyvj8/rsz-verdades.png",
      price: 150 // [cite: 60]
    }
  ]);
  console.log("Banco de dados inicializado e populado.");
}

// Rotas para as páginas html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "admin.html"));
});

// Rotas do Web Service (API)
app.get("/api/potions", async (req, res) => {
  const potions = await Potion.findAll();
  res.json(potions);
});

app.post("/api/potions", async (req, res) => {
  const { name, description, image, price } = req.body;
  const newPotion = await Potion.create({ name, description, image, price: Number(price) });
  res.status(201).json(newPotion);
});

app.delete("/api/potions/:id", async (req, res) => {
  try {
    const potion = await Potion.findByPk(req.params.id);
    if (!potion) {
      return res.status(404).json({ error: "Poção não encontrada." });
    }
    await potion.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro ao remover a poção." });
  }
});

const PORT = 3000;
await seedDatabase();
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
// app.listen(PORT, async () => {
//   await seedDatabase();
//   console.log(`Servidor rodando em http://localhost:${PORT}`);
// });