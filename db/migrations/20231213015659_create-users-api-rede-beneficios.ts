import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users_rede_beneficios', (table) => {
    table.uuid('id').primary()
    table.text('email').notNullable()
    table.text('password').notNullable()
    table.text('role').notNullable()
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users_rede_beneficios')
}

