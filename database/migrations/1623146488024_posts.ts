import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Posts extends BaseSchema {
  protected tableName = 'posts'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table
        .integer('user_id')
        .unsigned()
        .references('users.id')
        .notNullable()
        .onDelete('CASCADE') // delete posts when user is deleted
      table
        .integer('forum_id')
        .unsigned()
        .references('forums.id')
        .notNullable()
        .onDelete('CASCADE') // delete posts when forum is deleted
      table.string("title", 255).notNullable()
      table.string("content", 255).notNullable()
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
