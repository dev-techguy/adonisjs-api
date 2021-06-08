import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import Post from "App/Models/Post";
import Forum from "App/Models/Forum";
import {
  column,
  beforeSave,
  BaseModel,
  HasMany,
  hasMany
} from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Post, {
    'foreignKey': 'user_id'
  })
  public posts: HasMany<typeof Post>;

  @hasMany(() => Forum, {
    'foreignKey': 'user_id'
  })
  public forums: HasMany<typeof Forum>;

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
