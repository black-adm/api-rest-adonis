import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";

export default class UsersController {
  public async index({}: HttpContextContract) {
    const users = await User.all();
    return users;
  }

  public async store({ request, response }: HttpContextContract) {
    const data = request.only(["name", "email", "password"]);
    const userExists = await User.findBy("email", data.email);

    if (userExists) {
      return response.status(409).send("Esse email já está cadastrado!");
    }

    const user = new User();
    user.fill(data);
    await user.save();

    return response.status(201).send(user);
  }

  public async show({ request }: HttpContextContract) {
    const userId = request.param("id");
    const user = await User.findOrFail(userId);
    return user;
  }

  public async update({ request }: HttpContextContract) {
    const userId = request.param("id");
    const body = request.only(["name", "email"]);
    const user = await User.findOrFail(userId);

    await User.query().where("id", userId).update(body);
    return user;
  }

  public async destroy({ request }: HttpContextContract) {
    const userId = request.param("id");
    const user = await User.findOrFail(userId);

    await user.delete();
    return user;
  }
}
