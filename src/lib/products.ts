export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  sizeRange: string;
  sizes: string[];
  material: string;
  description: string;
  badge?: "novo" | "sale";
  seed: string;
  /** Foto de campanha real — quando presente, substitui o placeholder. */
  image?: string;
  alt: string;
}

const formatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function formatPrice(value: number) {
  return formatter.format(value);
}

export function picsumUrl(seed: string, width: number, height: number) {
  return `https://picsum.photos/seed/${seed}/${width}/${height}`;
}

/** Retorna a foto real do produto quando existir, senão o placeholder. */
export function productImage(product: Product, width: number, height: number) {
  return product.image ?? picsumUrl(product.seed, width, height);
}

// Catálogo restrito às peças com fotografia de campanha real —
// nada de placeholder aqui. Conforme novas fotos chegarem, mais
// produtos entram nessa lista.
export const products: Product[] = [
  {
    id: "moletom-arch",
    name: "Moletom Arch",
    category: "Streetwear",
    price: 459,
    rating: 4.9,
    sizeRange: "P-GG",
    sizes: ["P", "M", "G", "GG"],
    material: "Moletom flanelado 320g",
    description: "Peso certo pra qualquer estação, capuz forrado e bolso canguru.",
    badge: "novo",
    seed: "sl-moletom-arch",
    image: "/images/products/moletom-male-studio.jpeg",
    alt: "Modelo SAINT LEVON vestindo moletom com capuz preto, encostada na parede",
  },
  {
    id: "jaqueta-corte",
    name: "Jaqueta Corte",
    category: "Streetwear",
    price: 689,
    rating: 4.9,
    sizeRange: "P-GG",
    sizes: ["P", "M", "G", "GG"],
    material: "Sarja encorpada com forro",
    description: "Estrutura e caimento pra fechar qualquer produção.",
    seed: "sl-jaqueta-corte",
    image: "/images/products/jaqueta-corte.jpeg",
    alt: "Modelo SAINT LEVON girando na rua vestindo jaqueta jeans preta",
  },
  {
    id: "camiseta-base",
    name: "Camiseta Base",
    category: "Streetwear",
    price: 189,
    rating: 4.7,
    sizeRange: "P-GG",
    sizes: ["P", "M", "G", "GG"],
    material: "Algodão pesado 220g",
    description: "A camiseta base da marca — corte reto, gola reforçada.",
    seed: "sl-camiseta-base",
    image: "/images/products/camiseta-base.jpeg",
    alt: "Modelo SAINT LEVON em frente a muro grafitado, camiseta preta básica",
  },
  {
    id: "bone-aba-curva",
    name: "Boné Aba Curva",
    category: "Streetwear",
    price: 139,
    rating: 4.5,
    sizeRange: "Único",
    sizes: ["Único"],
    material: "Sarja com fecho ajustável",
    description: "Aba curva clássica com o bordado SAINT LEVON em alto relevo.",
    seed: "sl-bone-aba",
    image: "/images/products/bone-aba-curva.jpeg",
    alt: "Boné SAINT LEVON aba curva preto, vista de produto em estúdio",
  },
  {
    id: "mochila-impermeavel",
    name: "Mochila Impermeável",
    category: "Praia",
    price: 379,
    rating: 4.8,
    sizeRange: "Único",
    sizes: ["Único"],
    material: "Nylon ripstop impermeável",
    description: "Leva roupa seca, toalha e o resto do equipamento sem deixar a água entrar.",
    seed: "sl-mochila",
    image: "/images/products/mochila-impermeavel.jpeg",
    alt: "Modelo SAINT LEVON com mochila impermeável preta em trilha de montanha",
  },
  {
    id: "top-esportivo",
    name: "Top Esportivo",
    category: "Treino",
    price: 169,
    rating: 4.7,
    sizeRange: "P-GG",
    sizes: ["P", "M", "G", "GG"],
    material: "Compressão média com tecido respirável",
    description: "Sustentação pro treino sem abrir mão do conforto.",
    seed: "sl-top-esportivo",
    image: "/images/products/top-esportivo.jpeg",
    alt: "Modelo SAINT LEVON treinando em terraço com vista pro Pão de Açúcar",
  },
  {
    id: "bermuda-street",
    name: "Bermuda Street",
    category: "Streetwear",
    price: 249,
    rating: 4.6,
    sizeRange: "38-46",
    sizes: ["38", "40", "42", "44", "46"],
    material: "Sarja leve com cordão de ajuste",
    description: "Caimento reto e bolsos reforçados — base pro dia a dia na cidade.",
    badge: "novo",
    seed: "sl-bermuda-street",
    image: "/images/products/bermuda-street.jpeg",
    alt: "Modelo SAINT LEVON em rua grafitada, vestindo bermuda preta e camiseta branca",
  },
];

export const allProducts: Product[] = products;

export function getProductById(id: string): Product | undefined {
  return allProducts.find((product) => product.id === id);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return allProducts
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, limit);
}

export interface CategoryTile {
  id: string;
  label: string;
  description: string;
  image: string;
  alt: string;
}

export const categoryTiles: CategoryTile[] = [
  {
    id: "streetwear",
    label: "Streetwear",
    description: "Da praia pra rua sem perder o ritmo.",
    image: "/images/categories/streetwear.jpeg",
    alt: "Modelo SAINT LEVON em rua grafitada na cidade",
  },
  {
    id: "treino",
    label: "Treino",
    description: "Suporte e respiro pra todo movimento.",
    image: "/images/categories/treino.jpeg",
    alt: "Modelo SAINT LEVON treinando em academia ao ar livre",
  },
  {
    id: "praia",
    label: "Praia",
    description: "Peças leves pros dias de sol.",
    image: "/images/categories/praia.jpeg",
    alt: "Modelo SAINT LEVON caminhando na praia ao entardecer",
  },
];

export type TechIconId = "quick-dry" | "uv-shield" | "seam-seal" | "flex-move" | "salt-resist" | "eco-fiber";

export interface TechFeature {
  id: TechIconId;
  label: string;
  description: string;
}

export const techFeatures: TechFeature[] = [
  { id: "quick-dry", label: "Quick Dry", description: "Tecido de secagem rápida pós-água." },
  { id: "uv-shield", label: "UV Shield", description: "Proteção solar incorporada ao tecido." },
  { id: "seam-seal", label: "Seam Seal", description: "Costura selada contra atrito e areia." },
  { id: "flex-move", label: "Flex Move", description: "Elasticidade total pra qualquer manobra." },
  { id: "salt-resist", label: "Salt Resist", description: "Resistente à maresia e ao cloro." },
  { id: "eco-fiber", label: "Eco Fiber", description: "Fibras recicladas, menos impacto." },
];
