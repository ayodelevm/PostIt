import React from 'react';
import { mount } from 'enzyme';
import 'materialize-css/dist/js/materialize';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';

import store, { history } from '../../dev/js/store/store';
import localStorageMock from '../__mocks__/localStorageMock';
import * as data from '../__mocks__/mockData';
import {
  MessageFormContainer
} from '../../dev/js/containers/MessageFormContainer.jsx';

window.localStorage = localStorageMock;
jest.mock('react-router-dom');

const setup = () => {
  const props = {
    createNewMessages: jest.fn(() => Promise.resolve()),
    groupId: 2,
  };

  const wrapper = mount(<MessageFormContainer {...props} />);
  return {
    props,
    wrapper
  };
};

describe('Given MessageFormContainer component is mounted', () => {
  const { props, wrapper } = setup();

  it('should indicate that MessageForm component is rendered', () => {
    const enzymeWrapper = mount(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <MessageFormContainer {...props} />
        </ConnectedRouter>
      </Provider>
);
    expect(enzymeWrapper.find('MessageForm').exists()).toEqual(true);
  });

  it('should setState with message priority when priority is selected', () => {
    const value = { value: 'Urgent', label: 'Urgent' };
    wrapper.instance().handleLogChange(value);
    expect(wrapper.state().selected.value).toEqual('Urgent');
    expect(wrapper.state().selected.label).toEqual('Urgent');
  });

  it('should set state on each input into form input field', () => {
    wrapper.instance().handleChange(data.passwordEvent);
    expect(wrapper.state().password).toEqual('adeleke');
  });

  it('should call handleFormSubmit method when message is posted', () => {
    wrapper.setState(data.newState);
    wrapper.instance().handleKeyPress(data.event);
    expect(props.createNewMessages).toBeCalled();
  });
});
