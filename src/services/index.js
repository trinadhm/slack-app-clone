import Chatkit from '@pusher/chatkit-client';

const createChatManager = ({uid, instance, tokenProviderURL}) => {
  return new Chatkit.ChatManager({
    instanceLocator: instance,
    userId: uid,
    tokenProvider: new Chatkit.TokenProvider({
      url: tokenProviderURL,
    }),
  })
}

const getCurrentUser = (chatManager) => {
  return chatManager.connect().then(currentUser => currentUser);
}

const getUserRooms = (currentUser) => {
  return currentUser.rooms;
}

const getUserJoinableRooms = ({currentUser}) => {
  return currentUser.getJoinableRooms().then(
    rooms => rooms
  ).catch(err => {console.log(err)});
}

const createRoom = ({currentUser, name, isPrivate}) => {
  return currentUser.createRoom({
    name,
    private: isPrivate,
  }).then(room => room)
  .catch(err => {
    console.log(`Error creating room ${err}`)
  })
}

const createUserInChatkit = ({url, uname}) => {
  return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: uname }),
    })
      .then(() => {
        return ({
          currentUsername: uname,
          currentScreen: 'ChatScreen',
        })
      })
      .catch(error => console.error('error', error))
}

const initiateChatRoom = ({user, instance, tokenProviderUrl}) => {
  const cuser = getCurrentUser(createChatManager({
    uid: user,
    instance: instance,
    tokenProviderURL: tokenProviderUrl
  }))
  return cuser;
}

const ChatService = {
  createChatManager,
  getCurrentUser,
  getUserRooms,
  getUserJoinableRooms,
  createRoom,
  createUserInChatkit,
  initiateChatRoom
}

export default ChatService;