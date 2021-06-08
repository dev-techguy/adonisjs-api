import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post';

export default class PostsController {
  public async index({ response }: HttpContextContract) {
    const posts = await Post.query().preload('user').preload('forum');
    return response.json(posts);
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const post = await Post.find(params.id);
      if (post) {
        await post.preload('user')
        await post.preload('forum');
        return response.json(post);
      }
    } catch (error) {
      console.log(error)
    }

  }

  public async update({ request, params, response }: HttpContextContract) {
    const post = await Post.find(params.id);
    if (post) {
      post.title = request.input('title');
      post.content = request.input('content');
      if (await post.save()) {
        await post.preload('user')
        await post.preload('forum')
        return response.json(post);
      }
      return; // 422
    }
    return; // 401
  }

  public async store({ auth, request, response }: HttpContextContract) {
    const user = await auth.authenticate();
    const post = new Post();
    post.user_id = user.id;
    post.title = request.input('title');
    post.content = request.input('content');
    post.forum_id = request.input('forum');
    await user.related('posts').save(post)
    return response.json(post);
  }

  public async destroy({ auth, params, response }: HttpContextContract) {
    const post = await Post.query().where('id', params.id).delete();
    return response.json(post);
  }
}
