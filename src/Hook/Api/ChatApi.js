export const createUser = async ({
  username,
  firstname,
  lastname,
  usersecret,
  email,
}) => {
  var myHeaders = new Headers();
  myHeaders.append("PRIVATE-KEY", process.env.REACT_APP_PROJECT_KEY);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    username: username,
    first_name: firstname,
    last_name: lastname,
    secret: usersecret,
    email: email,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  return await fetch(`${process.env.REACT_APP_URL}/users`, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      return JSON.parse(result);
    })
    .catch((error) => console.log("error", error));
};

export const updateUser = async ({ userId, username, firstname, lastname }) => {
  var myHeaders = new Headers();
  myHeaders.append("PRIVATE-KEY", process.env.REACT_APP_PROJECT_KEY);
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify({
    username: username,
    first_name: firstname,
    last_name: lastname,
  });

  var requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  return await fetch(
    `${process.env.REACT_APP_URL}/users/${userId}/`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      return JSON.parse(result);
    })
    .catch((error) => console.log("error", error));
};

export const deleteUser = async ({ userId }) => {
  var myHeaders = new Headers();
  myHeaders.append("PRIVATE-KEY", process.env.REACT_APP_PROJECT_KEY);
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };
  return await fetch(
    `${process.env.REACT_APP_URL}/users/${userId}/`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) =>{
      return {type:true,result:JSON.parse(result)}
    })
    .catch((error) =>{
      return {type:false,result:error}
    });
};

export const updateUserPassword = async ({ id, usersecret }) => {
  var myHeaders = new Headers();
  myHeaders.append("PRIVATE-KEY", process.env.REACT_APP_PROJECT_KEY);
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify({
    secret: usersecret,
  });

  var requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  return await fetch(
    `${process.env.REACT_APP_URL}/users/${id}/`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      return JSON.parse(result);
    })
    .catch((error) => console.log("error", error));
};

export const getUser = async ({ userId }) => {
  var myHeaders = new Headers();
  myHeaders.append("PRIVATE-KEY", process.env.REACT_APP_PROJECT_KEY);
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return await fetch(
    process.env.REACT_APP_URL + `/users/${userId}/`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      return JSON.parse(result);
    })
    .catch((error) => console.log("error", error));
};

export const getUsers = async () => {
  var myHeaders = new Headers();
  myHeaders.append("PRIVATE-KEY", process.env.REACT_APP_PROJECT_KEY);
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return await fetch(process.env.REACT_APP_URL + `/users/`, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      return JSON.parse(result);
    })
    .catch((error) => console.log("error", error));
};

export const createChat = async ({ username, usersecret, title }) => {
  var myHeaders = new Headers();
  myHeaders.append("Project-ID", process.env.REACT_APP_PROJECT_ID);
  myHeaders.append("User-Name", username);
  myHeaders.append("User-Secret", usersecret);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    title: title,
    is_direct_chat: false,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  return await fetch(process.env.REACT_APP_URL + "/chats/", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      return result;
    })
    .catch((error) => console.log("error", error));
};

export const getMyChats = async ({ username, usersecret }) => {
  var myHeaders = new Headers();
  myHeaders.append("Project-ID", process.env.REACT_APP_PROJECT_ID);
  myHeaders.append("User-Name", username);
  myHeaders.append("User-Secret", usersecret);
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return await fetch(process.env.REACT_APP_URL + "/chats/", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      return JSON.parse(result);
    })
    .catch((error) => console.log("error", error));
};

export const getMyChat = async ({ username, usersecret, chatId }) => {
  var myHeaders = new Headers();
  myHeaders.append("Project-ID", process.env.REACT_APP_PROJECT_ID);
  myHeaders.append("User-Name", username);
  myHeaders.append("User-Secret", usersecret);
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return await fetch(
    process.env.REACT_APP_URL + `/chats/${chatId}/`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      return JSON.parse(result);
    })
    .catch((error) => console.log("error", error));
};
export const removeChat = async ({ username, usersecret, chatId }) => {
  var myHeaders = new Headers();
  myHeaders.append("Project-ID", process.env.REACT_APP_PROJECT_ID);
  myHeaders.append("User-Name", username);
  myHeaders.append("User-Secret", usersecret);
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };

  return await fetch(
    process.env.REACT_APP_URL + `/chats/${chatId}/`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      return JSON.parse(result);
    })
    .catch((error) => console.log("error", error));
};
export const getChatDetails = async ({ username, usersecret, chatId }) => {
  if (username && usersecret && chatId) {
    var myHeaders = new Headers();
    myHeaders.append("Project-ID", process.env.REACT_APP_PROJECT_ID);
    myHeaders.append("User-Name", username);
    myHeaders.append("User-Secret", usersecret);
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    return await fetch(
      process.env.REACT_APP_URL + `/chats/${chatId}/messages/`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => JSON.parse(result))
      .catch((error) => console.log("error", error));
  }
};

export const SendChatApi = async ({
  username,
  usersecret,
  chatId,
  message,
}) => {
  var myHeaders = new Headers();
  myHeaders.append("Project-ID", process.env.REACT_APP_PROJECT_ID);
  myHeaders.append("User-Name", username);
  myHeaders.append("User-Secret", usersecret);
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify({
    text: message,
  });
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
    body: raw,
  };
  return await fetch(
    process.env.REACT_APP_URL + `/chats/${chatId}/messages/`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      return JSON.parse(result);
    })
    .catch((error) => console.log("error", error));
};

export const getChatMembers = async ({ username, usersecret, chatId }) => {
  var myHeaders = new Headers();
  myHeaders.append("Project-ID", process.env.REACT_APP_PROJECT_ID);
  myHeaders.append("User-Name", username);
  myHeaders.append("User-Secret", usersecret);
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  return await fetch(
    process.env.REACT_APP_URL + `/chats/${chatId}/people/`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      return JSON.parse(result);
    })
    .catch((error) => {
      console.log("error", error);
    });
};

export const removeChatMember = async ({
  username,
  usersecret,
  chatId,
  removeUsername,
}) => {
  var myHeaders = new Headers();
  myHeaders.append("Project-ID", process.env.REACT_APP_PROJECT_ID);
  myHeaders.append("User-Name", username);
  myHeaders.append("User-Secret", usersecret);
  myHeaders.append("Content-Type", "application/json");

  let raw = JSON.stringify({
    username: removeUsername,
  });
  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    redirect: "follow",
    body: raw,
  };

  return await fetch(
    process.env.REACT_APP_URL + `/chats/${chatId}/people/`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      return JSON.parse(result);
    })
    .catch((error) => console.log("error", error));
};
export const addToMyChatMember = async ({
  addUsername,
  chatId,
  username,
  usersecret,
}) => {
  var myHeaders = new Headers();
  myHeaders.append("Project-ID", process.env.REACT_APP_PROJECT_ID);
  myHeaders.append("User-Name", username);
  myHeaders.append("User-Secret", usersecret);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    username: addUsername,
  });
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
    body: raw,
  };
  return await fetch(
    process.env.REACT_APP_URL + `/chats/${chatId}/people/`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      return JSON.parse(result);
    })
    .catch((error) => console.log("error", error));
};

export const getMembers = async () => {
  var myHeaders = new Headers();
  myHeaders.append("PRIVATE-KEY", process.env.REACT_APP_PROJECT_KEY);
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return await fetch(process.env.REACT_APP_URL + `/users/`, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      return JSON.parse(result);
    });
};

export const getMessage = async ({
  chatId,
  username,
  usersecret,
  messageId,
}) => {
  var myHeaders = new Headers();
  myHeaders.append("Project-ID", process.env.REACT_APP_PROJECT_ID);
  myHeaders.append("User-Name", username);
  myHeaders.append("User-Secret", usersecret);
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return await fetch(
    process.env.REACT_APP_URL + `/chats/${chatId}/messages/${messageId}/`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      return JSON.parse(result);
    })
    .catch((err) => {
      return JSON.parse(err);
    });
};

export const updateMessage = async ({
  chatId,
  username,
  usersecret,
  messageId,
  message,
}) => {
  var myHeaders = new Headers();
  myHeaders.append("Project-ID", process.env.REACT_APP_PROJECT_ID);
  myHeaders.append("User-Name", username);
  myHeaders.append("User-Secret", usersecret);
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    text: message,
  });
  var requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    redirect: "follow",
    body: raw,
  };

  return await fetch(
    process.env.REACT_APP_URL + `/chats/${chatId}/messages/${messageId}/`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      return JSON.parse(result);
    })
    .catch((err) => console.log(err));
};

export const deleteMessage = async ({
  chatId,
  username,
  usersecret,
  messageId,
}) => {
  var myHeaders = new Headers();
  myHeaders.append("Project-ID", process.env.REACT_APP_PROJECT_ID);
  myHeaders.append("User-Name", username);
  myHeaders.append("User-Secret", usersecret);
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };

  return await fetch(
    process.env.REACT_APP_URL + `/chats/${chatId}/messages/${messageId}/`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      return JSON.parse(result);
    })
    .catch((err) => console.log(err));
};
