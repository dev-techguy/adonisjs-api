import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Forum from 'App/Models/Forum';

export default class ForumsController {
  public async index({ response }: HttpContextContract) {
    const forums = await Forum.query().preload('user').preload('posts');
    return response.json(forums);
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const forum = await Forum.find(params.id);
      if (forum) {
        await forum.preload('user')
        await forum.preload('posts');
        return response.json(forum);
      }
    } catch (error) {
      console.log(error)
    }

  }

  public async update({ request, params, response }: HttpContextContract) {
    const forum = await Forum.find(params.id);
    if (forum) {
      forum.title = request.input('title');
      forum.description = request.input('description');
      if (await forum.save()) {
        await forum.preload('user')
        await forum.preload('posts')
        return response.json(forum);
      }
      return; // 422
    }
    return; // 401
  }

  public async store({ auth, request, response }: HttpContextContract) {
    const user = await auth.authenticate();
    const forum = new Forum();
    forum.user_id = user.id;
    forum.title = request.input('title');
    forum.description = request.input('description');
    await user.related('forums').save(forum)
    return response.json(forum);
  }

  public async destroy({ auth, params, response }: HttpContextContract) {
    const user = await auth.authenticate();
    const forum = await Forum.query().where('user_id', user.id).where('id', params.id).first();
    forum.delete();
    return response.json(forum);
  }
}
