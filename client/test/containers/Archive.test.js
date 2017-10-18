import React from 'react';
import { mount } from 'enzyme';
import 'materialize-css/dist/js/materialize';

import localStorageMock from '../__mocks__/localStorageMock';
import * as data from '../__mocks__/mockData';
import { Archive } from '../../dev/js/containers/Archive.jsx';

window.localStorage = localStorageMock;
jest.mock('react-router-dom');
jest.mock('react-notify-toast');

const setup = () => {
  const props = {
    getGroupWithMessages: jest.fn(() => Promise.resolve()),
    archiveMessages: jest.fn(() => Promise.resolve()),
    archiveData: data.archiveData,
    closeModalRoute: '/dashboard',
  };

  const wrapper = mount(<Archive {...props} />);
  return {
    props,
    wrapper
  };
};

describe('Given Archive component is mounted', () => {
  const { props, wrapper } = setup();

  it('should indicate that ArchiveModal exists', () => {
    expect(wrapper.find('ArchiveModal').exists()).toEqual(true);
  });

  it('should dispatch getGroupWithMessages and setState with messageIds',
  (done) => {
    const enzymeWrapper = mount(<Archive {...{
      ...props,
      archiveData: {
        ...props.archiveData,
        ...{ getSuccess: true } }
    }} />);

    enzymeWrapper.instance().handleSubmit(data.event);
    expect(props.getGroupWithMessages.mock.calls.length).toEqual(1);
    setImmediate(() => {
      expect(enzymeWrapper.state().messageIds).toEqual(['5', '6']);
      done();
    });
  });

  it('should dispatch archiveMessages action when user archives messages',
  () => {
    const enzymeWrapper = mount(<Archive {...{
      ...props,
      archiveData: {
        ...props.archiveData,
        ...{ archiveSuccess: true } }
    }} />);

    enzymeWrapper.instance().handleSubmit(data.event);
    expect(props.archiveMessages.mock.calls.length).toEqual(1);
  });
});
