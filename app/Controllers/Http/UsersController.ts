import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UsersController {
  /**
   * Get all the posts for the autorized user
   */
  public async postsByUser({ auth, response }: HttpContextContract) {
    const user = await (await auth.authenticate()).preload('posts');
    return response.json(user);
  }

  /**
  * Get all the posts for the autorized user
  */
  public async forumsByUser({ auth, response }: HttpContextContract) {
    const user = await (await auth.authenticate()).preload('forums');
    return response.json(user);
  }
}
