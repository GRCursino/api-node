import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('beneficiarios_rede_beneficios', (table) => {
    table.uuid('id').primary(),
    table.text('nome').notNullable(),
    table.text('cpf').notNullable(),
    table.text('status').notNullable()
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('beneficiarios_rede_beneficios')
}

