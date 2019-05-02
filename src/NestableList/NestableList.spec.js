import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
// import { createDriverFactory } from 'wix-ui-test-utils/driver-factory';
// import { mount } from 'enzyme';

// import { enzymeTestkitFactoryCreator } from 'wix-ui-test-utils/enzyme';

import TestBackend from '../DragDropContextProvider/TestBackend';
import DragDropContextProvider from '../DragDropContextProvider';

import { nestableListTestkitFactory } from '../../testkit';

import NestableList from './NestableList';

describe('NestableList', () => {
  it('nestable should exists', () => {
    const dataHook = 'nestable-list';
    const items = [{ id: '1', text: 'item 1' }, { id: '2', text: 'item 2' }];
    const onUpdate = jest.fn();
    const renderItem = ({ item }) => <div>{item.text}</div>; // eslint-disable-line react/prop-types

    const wrapper = ReactTestUtils.renderIntoDocument(
      <DragDropContextProvider backend={TestBackend}>
        <NestableList
          dataHook={dataHook}
          items={items}
          renderItem={renderItem}
          onUpdate={onUpdate}
        />
      </DragDropContextProvider>,
    );
    const driver = nestableListTestkitFactory({
      wrapper,
      dataHook,
      element: ReactDOM.findDOMNode(wrapper),
    });
    expect(driver).toBeTruthy();
  });

  it('should call onUpdate', () => {
    const dataHook = 'nestable-list';
    const items = [{ id: '1', text: 'item 1' }, { id: '2', text: 'item 2' }];
    const onUpdate = jest.fn();
    const renderItem = ({ item }) => <div>{item.text}</div>; // eslint-disable-line react/prop-types

    const wrapper = ReactTestUtils.renderIntoDocument(
      <DragDropContextProvider backend={TestBackend}>
        <NestableList
          dataHook={dataHook}
          items={items}
          renderItem={renderItem}
          onUpdate={onUpdate}
          maxDepth={1}
        />
      </DragDropContextProvider>,
    );
    const driver = nestableListTestkitFactory({ wrapper, dataHook });

    driver.reorder({ removedId: '1', addedId: '2' });

    expect(onUpdate).toBeCalledWith([items[1], items[0]]);
  });
});
