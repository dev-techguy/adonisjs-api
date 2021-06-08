import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';

export default class AuthController {
  /**
   * Get the authorization token here
   * and set the peiod the token should take
   * before expiring.
   */
   public async login({ request, auth }: HttpContextContract) {
    const email = request.input("email");
    const password = request.input("password");
    const token = await auth.use("api").attempt(email, password, {
      expiresIn: "10 days",
    });
    return token.toJSON();
  }

  /**
   * Create new user
   */
   public async register({ request, auth }: HttpContextContract) {
    const email = request.input("email");
    const password = request.input("password");
    const name = request.input("name");
    const newUser = new User();
    newUser.email = email;
    newUser.password = password;
    newUser.name = name;
    await newUser.save();
    const token = await auth.use("api").login(newUser, {
      expiresIn: "10 days",
    });
    return token.toJSON();
  }
}
