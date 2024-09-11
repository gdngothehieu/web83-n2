const http = require("http");
const users = require("./data.js").users;
console.log(users);
const app = http.createServer((request, response) => {
  const data = { school: "MindX technology school" };
  const endpoint = request.url;
  const username = request.url.split("?")[1].split("username=")[1];
  const email = request.url.split("?")[1].split("email=")[1];
  const address = request.url.split("?")[1].split("addresss=")[1];

  if (username || email || address) {
    users.push({
      username,
      email,
      address,
    });
    response.end(`Successfully added ${username} and ${email} and ${address}`);
  }
  console.log(username, email, address);
  switch (endpoint) {
    case "/":
      response.end(`Hello MindX`);
      break;
    case "/users":
      response.end(JSON.stringify(users));
      break;
    case "/users/old":
      response.end(JSON.stringify(users.filter((user) => user.age >= 50)));
      break;
    case "/users/add-random":
      console.log(request.query);
      users.push({
        id: users.length + 1,
      });

      response.end(JSON.stringify(users));
      break;
    case "/users/add":
      console.log(request);

      response.end(JSON.stringify(users));
      break;
    case "/users/old":
      response.end(JSON.stringify(users));
      break;
    default:
      response.end(`404 Notfound`);
      break;
  }
});

app.listen(8080, () => {
  console.log("Server is running!");
});
