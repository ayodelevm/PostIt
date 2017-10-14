import React from 'react';
import { mount } from 'enzyme';
import 'materialize-css/dist/js/materialize';

import localStorageMock from '../__mocks__/localStorageMock';
import * as data from '../__mocks__/mockData';
import { Archive } from '../../dev/js/containers/Archive.jsx';

window.localStorage = localStorageMock;
jest.mock('react-router-dom');

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

  it('should call handleSubmit when archive button is clicked', () => {
    const enzymeWrapper = mount(<Archive {...{
      ...props,
      archiveData: {
        ...props.archiveData,
        ...{ getSuccess: true } }
    }} />);

    enzymeWrapper.instance().handleSubmit(data.event);
    expect(props.getGroupWithMessages.mock.calls.length).toEqual(1);
  });

  it('should dispatch action and return success when archive button is clicked',
  () => {
    const enzymeWrapper = mount(<Archive {...{
      ...props,
      archiveData: {
        ...props.archiveData,
        ...{ archiveSuccess: true } }
    }} />);

    enzymeWrapper.instance().handleSubmit(data.event);
    expect(props.getGroupWithMessages.mock.calls.length).toEqual(2);
  });
});
