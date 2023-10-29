import Route from "@ioc:Adonis/Core/Route";

Route.get("/", async () => {
  return { message: true };
});

Route.post("/login", async ({ auth, request }) => {
  const email = request.input("email");
  const password = request.input("password");

  await auth.use("api").attempt(email, password);
});

Route.resource("/users", "UsersController");
