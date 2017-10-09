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

/**
 * Function handling socket connections and event listeners
 * @returns {function} dispatch
 */
export const socketConnect = () => (dispatch, getState) => {
  const socket = io(`${window.location.origin}/`);

  socket.on('notification.updateMessage', (response) => {
    const prevState = getState();
    const { isAuthenticated, currentUser } = prevState.authReducer;
    const { Groups } = prevState.groupReducer.groups;
    if (response && isAuthenticated) {
      const foundGroup = Groups.find((group) => {
        return group.id === response.groupId;
      });

      if (foundGroup !== undefined) {
        if (currentUser.id === response.createdMessage.ownerId) {
          notify.show('message sent successfully', 'custom', 3000, myColor);
        } else {
          notify.show(response.message, 'custom', 3000, myColor);
        }
        const { groupMessages } = prevState.messageReducer;

        if (groupMessages.id === response.groupId) {
          const mergedMessages = groupMessages.Messages
            .concat(response.createdMessage);
          const currentMessages = { ...groupMessages,
            Messages: mergedMessages
          };
          const newResponse = {
            ...{ currentMessages },
            ...{ status: !!Object.keys(response) }
          };
          dispatch(setNewGroupMessages(newResponse));
        }
      }
    }
  });

  socket.on('new.group', (response) => {
    const token = window.localStorage.token;
    const prevState = getState();
    const { isAuthenticated } = prevState.authReducer;

    if (response && isAuthenticated) {
      dispatch(getUserGroups(token));
    }
  });

  socket.on('new.member', (response) => {
    const token = window.localStorage.token;
    const prevState = getState();
    const { isAuthenticated } = prevState.authReducer;

    if (response && isAuthenticated) {
      dispatch(getUserGroups(token))
      .then(() => dispatch(getGroupUsers(token, response.groupId)));
    }
  });

  socket.on('archive.success', (response) => {
    const token = window.localStorage.token;
    const prevState = getState();
    const { isAuthenticated } = prevState.authReducer;

    if (response && isAuthenticated) {
      dispatch(getUserGroups(token))
        .then(() => {
          if (response.groupId !== undefined) {
            return dispatch(getGroupMessages(token, response.groupId))
              .then(() => dispatch(getAllUsers(token)));
          }
        });
    }
  });
};
