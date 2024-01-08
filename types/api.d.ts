declare module "api-models" {
  export namespace AM {
    export interface RequestData<T = {}> {
      data?: Prisma.InputValue;
      args?: T;
    }

    export interface ResponseData<T = {}> {
      message?: string;
      details?: {
        [key: string]: unknown;
        request?: {
          url?: string;
          method?: string;
          headers?: Headers;
          body?: unknown;
        };
      };
      error?: Error | unknown;
      data?: T | Object;
    }

    export interface Article extends Prisma.Article {
      category?: Category;
    }

    export interface Formula extends Prisma.Formula {
      category?: Category;
    }

    export interface Category extends Prisma.Category {
      articles?: Article[];
      formulas?: Formula[];
    }

    export interface BatchPayload extends Prisma.BatchPayload {}
  }
}
