/*BACK-END: CONEXÃO E POPULAÇÃO DO SERVIDOR*/


import express from "express";
import { Sequelize, DataTypes } from "sequelize";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// cria conexão com banco em memória
const sequelize = new Sequelize({ 
  dialect: "sqlite", 
  storage: ":memory:", 
  logging: false, 
});

// Modelo da Poção (nome, descrição, imagem e preço)
const Potion = sequelize.define("Potion", {
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  image: { type: DataTypes.STRING, allowNull: false }, 
  price: { type: DataTypes.FLOAT, allowNull: false }
});

// Popular banco inicial com os dados fornecidos
async function seedDatabase() {
  await sequelize.sync({ force: true });
  
  await Potion.bulkCreate([
    {
      name: "Poção Blue Sky", 
      description: "Essa poção provê um surto de inspiração por 24 horas. Foi utilizada por John Lennon quando escreveu Lucy in the Sky with Diamonds.", 
      image: "https://i.ibb.co/ZzS7xb2/rsz-sky.png",
      price: 300 
    },
    {
      name: "Poção do Perfume Misterioso", 
      description: "Essa poção faz com que você fique cheirando lilás e groselha por 24 dias. Essência muito admirada pelos bruxos.", 
      image: "https://i.ibb.co/pyhZJXf/rsz-lilas.png",
      price: 200 
    },
    {
      name: "Poção de Pinus", 
      description: "Essa poção faz com que você fique 10 cm mais alto! Observação: efeitos colaterais desconhecidos.", 
      image: "https://i.ibb.co/DkzdL1q/rsz-pinus.png",
      price: 3000 
    },
    {
      name: "Poção da Beleza Eterna", 
      description: "Veneno que mata rápido.", 
      image: "https://i.ibb.co/9p872NK/rsz-1beleza.png",
      price: 100 
    },
    {
      name: "Poção do Arco íro", 
      description: "Traz felicidade momentânea. Pode durar de 10 minutos a 2 dias.", 
      image: "https://i.ibb.co/PrC09MP/rsz-2unicornio.png",
      price: 120 
    },
    {
      name: "Caldeirão das Verdades Secretas", 
      description: "As pessoas lhe dirão apenas verdades por I hora. É necessário beber os 5L.", 
      image: "https://i.ibb.co/s9Lyvj8/rsz-verdades.png",
      price: 150 
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
