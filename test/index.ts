import {executeLogin} from "../src/apis/entry-api";

setTimeout(async () => {
  const response = await executeLogin({username: ""});

  console.log(response);
}, 1);
