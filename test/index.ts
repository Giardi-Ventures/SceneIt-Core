import {login, register} from "../src/apis/entry-api";

setTimeout(async () => {
  // const response = await register({
  //   firstName: "Avery",
  //   lastName: "Durrant",
  //   email: "avery@dripos.com",
  //   username: "avery",
  //   password: "dogs"
  // });

  const response = await login({
    username: "avery",
    password: "dogs",
  })

  console.log(response);
}, 1);
