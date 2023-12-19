import { Knex } from "knex";

declare module "knex/types/tables" {
  export interface Tables {
    transactions: {
      id: string;
      type: string;
      title: string;
      amount: number;
      created_at: string;
      session_id?: string;
    },

    users_rede_beneficios: {
      id: string;
      email: string;
      password: string;
      role: string;
    },

    beneficiarios_rede_beneficios: {
      id: string;
      nome: string;
      cpf: string;
      status: string;
    }
  }
}