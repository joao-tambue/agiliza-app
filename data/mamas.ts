export interface Mama {
  id: number;
  name: string;
  location: string;
  profession: string;
  rating: number;
  services: number;
  image: string;
  phone: string;
  experience: string;
  bio: string;
  hourlyRate: string;
  available: boolean;
}

export const mamas: Mama[] = [
  {
    id: 1,
    name: "Mama Maria",
    location: "Vila de Cacuaco",
    profession: "Lavadeira",
    rating: 5.0,
    services: 10,
    image: "https://images.unsplash.com/photo-1589156191108-c762ff4b96ab?w=600",
    phone: "+244 923 456 789",
    experience: "8 anos",
    bio: "Lavadeira experiente com mais de 8 anos de servico. Especializada em roupas delicadas e tingimento. Entrego sempre no prazo e com qualidade superior. A satisfacao da cliente e a minha prioridade.",
    hourlyRate: "2.500 Kz",
    available: true,
  },
  {
    id: 2,
    name: "Mama Joana",
    location: "Vila de Benfica",
    profession: "Lavadeira",
    rating: 4.9,
    services: 8,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600",
    phone: "+244 912 345 678",
    experience: "5 anos",
    bio: "Trabalho com cuidado e dedicacao. Lavo, passo e entrego roupas impecaveis. Tenho experiencia com vestuarios corporativos e de cerimonia. Referencias disponiveis sob pedido.",
    hourlyRate: "2.000 Kz",
    available: true,
  },
  {
    id: 3,
    name: "Mama Rosa",
    location: "Vila de Viana",
    profession: "Lavadeira",
    rating: 4.7,
    services: 12,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600",
    phone: "+244 934 567 890",
    experience: "10 anos",
    bio: "A mais experiente da equipa! Ja passei por various lavandarias e sei tratar de todo o tipo de tecidos. Confie nas minhas maos — o resultado fala por si.",
    hourlyRate: "3.000 Kz",
    available: false,
  },
  {
    id: 4,
    name: "Mama Odeth",
    location: "Vila de Cacuaco",
    profession: "Lavadeira",
    rating: 4.5,
    services: 6,
    image: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=600",
    phone: "+244 945 678 901",
    experience: "3 anos",
    bio: "Mamae dedicada que concilia servico com familia. Ofereco servicos de lavagem, passagem e organizacao de roupa. Trabalho com amor e carinho.",
    hourlyRate: "1.800 Kz",
    available: true,
  },
  {
    id: 5,
    name: "Mama Priss",
    location: "Vila de Viana",
    profession: "Lavadeira",
    rating: 4.8,
    services: 15,
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=600",
    phone: "+244 956 789 012",
    experience: "7 anos",
    bio: "Servico rapido e de qualidade! Trabalho com empresas e particulares. Tenho maquina propria e recolho/entrego roupas no local. A minha clientela e fiel por um motivo.",
    hourlyRate: "2.200 Kz",
    available: true,
  },
];

export function getMamaById(id: number): Mama | undefined {
  return mamas.find((m) => m.id === id);
}
