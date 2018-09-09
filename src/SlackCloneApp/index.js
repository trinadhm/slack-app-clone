const SlackCloneApp = (currState, action) => {
  switch(action.type) {
    case 'SET_PROFILE':
      return {
        ...currState,
        profile: {
          ...action.payload
        }
      }
    case 'SET_CHAT_USER':
      return {
        ...currState,
        ...action.payload,
      }
    case 'SET_CURRENT_USER':
    // console.log(action.payload);
      return {
        ...currState,
        currentUser: {
          ...action.payload.user,
          rooms: action.payload.rooms,
          users: action.payload.instanceUsers,
        },
      }
    case 'SET_JOINABLE_ROOMS':
      return {
        ...currState,
        userRooms: {
          joinablerooms: [...action.payload]
        }
      }
    default:
      // console.log(action);
      return {...currState}
  }
}

export default SlackCloneApp;