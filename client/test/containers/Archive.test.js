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
    getGroupWithMessages: jest.fn(() => { return Promise.resolve(); }),
    archiveMessages: jest.fn(() => { return Promise.resolve(); }),
    archiveData: data.archiveData,
    closeModalRoute: '/dashboard',
  };

  const wrapper = mount(<Archive {...props} />);
  return {
    props,
    wrapper
  };
};

describe('archive container', () => {
  const { props, wrapper } = setup();

  it('should render add users modal', () => {
    expect(wrapper.find('ArchiveModal').exists()).toEqual(true);
  });

  it('should call handleSubmit', () => {
    const enzymeWrapper = mount(<Archive {...{ ...props, archiveData: { ...props.archiveData, ...{ getSuccess: true } } }} />);

    enzymeWrapper.instance().handleSubmit(data.event);
    expect(props.getGroupWithMessages.mock.calls.length).toEqual(1);
  });

  it('should call handleSubmit and notify on success', () => {
    const enzymeWrapper = mount(<Archive {...{ ...props, archiveData: { ...props.archiveData, ...{ archiveSuccess: true } } }} />);

    enzymeWrapper.instance().handleSubmit(data.event);
    expect(props.getGroupWithMessages.mock.calls.length).toEqual(2);
  });
});
