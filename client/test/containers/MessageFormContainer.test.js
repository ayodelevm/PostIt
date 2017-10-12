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

describe('message form container', () => {
  const { props, wrapper } = setup();

  it('should render message form', () => {
    const enzymeWrapper = mount(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <MessageFormContainer {...props} />
      </ConnectedRouter>
    </Provider>
);
    expect(enzymeWrapper.find('MessageForm').exists()).toEqual(true);
  });

  it('should setState on dropdown select', () => {
    const value = { value: 'Urgent', label: 'Urgent' };
    wrapper.instance().handleLogChange(value);
    expect(wrapper.state().selected.value).toEqual('Urgent');
    expect(wrapper.state().selected.label).toEqual('Urgent');
  });

  it('should call set setstate on input change', () => {
    wrapper.instance().handleChange(data.passwordEvent);
    expect(wrapper.state().password).toEqual('adeleke');
  });

  it('should call handleFormSubmit on enter in text area', () => {
    wrapper.setState(data.newState);
    wrapper.instance().handleKeyPress(data.event);
    expect(props.createNewMessages).toBeCalled();
  });

  it('should call create new messages method', () => {
    wrapper.setState(data.newState);
    wrapper.instance().handleFormSubmit(data.event);
    expect(props.createNewMessages.mock.calls.length).toEqual(2);
  });
});
