import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import { randomUUID } from "crypto";

export default class UsersController {
  public async index({}: HttpContextContract) {
    const users = await User.all();
    return users;
  }

  public async store({ request }: HttpContextContract) {
    const data = request.only(["name", "email", "password"]);

    const user = new User();
    user.id = randomUUID();
    user.fill(data);

    await user.save();
    console.log(user.$isPersisted);
    return user;
  }

  public async show({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({ request }: HttpContextContract) {
    const data = request.param("id");

    const user = await User.findOrFail(data);
    await user.delete();

    return user;
  }
}
