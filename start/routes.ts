import Route from "@ioc:Adonis/Core/Route";

Route.get("/", async () => {
  return { message: true };
});

Route.get("/dashboard", async ({ auth }) => {
  await auth.use("api").authenticate();
  return { Status: { authenticated: true } };
});

Route.post("/login", async ({ auth, request }) => {
  const email = request.input("email");
  const password = request.input("password");
  const token = await auth.use("api").attempt(email, password);
  return token;
});

Route.resource("/users", "UsersController");
