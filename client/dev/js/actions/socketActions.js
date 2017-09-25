import { notify } from 'react-notify-toast';
import io from 'socket.io-client';
import Types from './actionTypes';
import { getGroupMessages, setNewGroupMessages } from './messageActions';
import { getUserGroups, getGroupUsers } from './groupActions';
import { getAllUsers } from './userActions';


export const setNotification = notifyMessage => ({
  type: Types.NOTIFICATION_SUCCESS,
  notifyMessage
});


const myColor = { background: '#c6ff00', text: '#000' };

export const socketConnect = () => (dispatch, getState) => {
  const socket = io(`${window.location.origin}/`);

  socket.on('notification.updateMessage', (data) => {
    const prevState = getState();
    const { isAuthenticated, currentUser } = prevState.authReducer;
    const { Groups } = prevState.groupReducer.groups;
    if (data && isAuthenticated) {
      const foundGroup = Groups.find((group) => {
        return group.id === data.groupId;
      });

      if (foundGroup !== undefined) {
        if (currentUser.id === data.createdMessage.ownerId) {
          notify.show('message sent successfully', 'custom', 3000, myColor);
        } else {
          notify.show(data.message, 'custom', 3000, myColor);
        }
        const { groupMessages } = prevState.messageReducer;

        if (groupMessages.id === data.groupId) {
          const mergedMessages = groupMessages.Messages
            .concat(data.createdMessage);
          const currentMessages = { ...groupMessages,
            Messages: mergedMessages
          };
          dispatch(setNewGroupMessages(currentMessages));
        }
      }
    }
  });

  socket.on('new.group', (data) => {
    const token = window.localStorage.token;
    const prevState = getState();
    const { isAuthenticated } = prevState.authReducer;

    if (data && isAuthenticated) {
      dispatch(getUserGroups(token));
    }
  });

  socket.on('new.member', (data) => {
    const token = window.localStorage.token;
    const prevState = getState();
    const { isAuthenticated } = prevState.authReducer;

    if (data && isAuthenticated) {
      dispatch(getUserGroups(token))
      .then(() => dispatch(getGroupUsers(token, data.groupId)));
    }
  });

  socket.on('archive.success', (data) => {
    const token = window.localStorage.token;
    const prevState = getState();
    const { isAuthenticated } = prevState.authReducer;

    if (data && isAuthenticated) {
      dispatch(getUserGroups(token))
        .then(() => {
          if (data.groupId !== undefined) {
            return dispatch(getGroupMessages(token, data.groupId))
              .then(() => dispatch(getAllUsers(token)));
          }
        });
    }
  });
};
