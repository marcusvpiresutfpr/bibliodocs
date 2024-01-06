// Function to convert from Prisma types to Client types
export const prismaToClient = {
  article: (prismaArticle: Partial<PrismaArticle>): Partial<ClientArticle> => {
    return {
      id: prismaArticle.id,
      títlulo: prismaArticle.title,
      conteúdo: prismaArticle.content,
      categoria: prismaArticle.categoryName,
      criado: prismaArticle.createdAt,
      atualizado: prismaArticle.updatedAt,
    };
  },
  formula: (prismaFormula: Partial<PrismaFormula>): Partial<ClientFormula> => {
    return {
      id: prismaFormula.id,
      nome: prismaFormula.name,
      conteúdo: JSON.parse(String(prismaFormula.content)),
      criado: prismaFormula.createdAt,
      atualizado: prismaFormula.updatedAt,
    };
  },
  category: (
    prismaCategory: Partial<PrismaCategory>
  ): Partial<ClientCategory> => {
    return {
      id: prismaCategory.id,
      nome: prismaCategory.name,
      criado: prismaCategory.createdAt,
      atualizado: prismaCategory.updatedAt,
    };
  },
};

// Function to convert from Client types to Prisma types
export const clientToPrisma = {
  article: (clientArticle: Partial<ClientArticle>): Partial<PrismaArticle> => {
    return {
      id: clientArticle.id,
      title: clientArticle.títlulo,
      content: clientArticle.conteúdo,
      views: clientArticle.visualizações, // Assuming default value for views
      createdAt: clientArticle.criado,
      updatedAt: clientArticle.atualizado,
      categoryName: clientArticle.categoria,
    };
  },
  formula: (clientFormula: Partial<ClientFormula>): Partial<PrismaFormula> => {
    return {
      id: clientFormula.id,
      name: clientFormula.nome,
      content: clientFormula.conteúdo,
      createdAt: clientFormula.criado,
      updatedAt: clientFormula.atualizado,
      categoryName: clientFormula.categoria, // Replace with actual category ID
    };
  },
  category: (
    clientCategory: Partial<ClientCategory>
  ): Partial<PrismaCategory> => {
    return {
      id: clientCategory.id,
      name: clientCategory.nome,
      createdAt: clientCategory.criado,
      updatedAt: clientCategory.atualizado,
    };
  },
};
