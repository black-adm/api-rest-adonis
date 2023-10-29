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
