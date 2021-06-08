import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post';

export default class PostsController {
  public async index({ }: HttpContextContract) {
    const posts = await Post.query().preload('user').preload('forum');
    return posts.toJSON
  }

  public async show({ params }: HttpContextContract) {
    try {
      const post = await Post.find(params.id);
      if (post) {
        await post.preload('user')
        await post.preload('forum');
        return post.toJSON
      }
    } catch (error) {
      console.log(error)
    }

  }

  public async update({ auth, request, params }: HttpContextContract) {
    const post = await Post.find(params.id);
    if (post) {
      post.title = request.input('title');
      post.content = request.input('content');
      if (await post.save()) {
        await post.preload('user')
        await post.preload('forum')
        return post.toJSON
      }
      return; // 422
    }
    return; // 401
  }

  public async store({ auth, request }: HttpContextContract) {
    const user = await auth.authenticate();
    const post = new Post();
    post.title = request.input('title');
    post.content = request.input('content');
    post.forum_id = request.input('forum');
    await user.related('posts').save(post)
    return post.toJSON
  }

  public async destroy({ auth, params }: HttpContextContract) {
    const user = await auth.authenticate();
    const post = await Post.query().where('user_id', user.id).where('id', params.id).delete();
    return post.toJSON
  }
}
