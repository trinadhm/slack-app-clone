import { call, put, takeLatest } from 'redux-saga/effects';
import ChatService from './services';

function* createRoom(action) {
  const room = yield call(ChatService.createRoom, {...action.payload});
  yield action.payload.history.replace(`/room/${room.id}/`);
}

function* getJoinableRooms(action) {
  const rooms = yield call(ChatService.getUserJoinableRooms, {...action.payload})
  yield put({
    type: 'SET_JOINABLE_ROOMS',
    payload: rooms
  })
}

function* getUserRooms(action) {
  const rooms = yield call(ChatService.getUserRooms, {...action.payload})
  yield put({
    type: 'SET_USER_ROOMS',
    payload: rooms
  })
}

function* getChatUser(action) {
  const user = yield call(ChatService.getCurrentUser, {...action.payload});
  yield put({
    type: 'SET_CURRENT_USER',
    payload: {
      user,
      rooms: user.rooms,
      instanceUsers: user.users
    },
  })
}

function* getChatManager(action) {
  const cm = yield call(ChatService.createChatManager, {...action.payload});
  yield put({
    type: 'GET_CHAT_USER',
    payload: cm,
  })
}

function* createUserInChatkit(action) {
  const userData = yield call(ChatService.createUserInChatkit, {...action.payload});
  yield put({
    type: 'SET_CHAT_USER',
    payload: userData,
  })
}

function* initiateChatRoom(action) {
  const user = yield call(ChatService.initiateChatRoom, {...action.payload});
  yield put({
    type: 'SET_CURRENT_USER',
    payload: {
      user,
      rooms: user.rooms,
      instanceUsers: user.users
    },
  })
}
export default function* sagas() {
  yield takeLatest('GET_CHAT_MANAGER', getChatManager);
  yield takeLatest('GET_CHAT_USER', getChatUser);
  yield takeLatest('GET_USER_ROOMS', getUserRooms);
  yield takeLatest('GET_USER_JOINABLE_ROOMS', getJoinableRooms);
  yield takeLatest('PUT_NEW_ROOM', createRoom);
  yield takeLatest('CREATE_CHAT_USER', createUserInChatkit);
  yield takeLatest('INITIATE_CHAT', initiateChatRoom);
}