import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import TestBackend from '../DragDropContextProvider/TestBackend';
import DragDropContextProvider from '../DragDropContextProvider';

import { nestableListTestkitFactory } from '../../testkit';

import NestableList from './NestableList';

const getDroppedItemMock = (item, overrides) => ({
  clientRect: {
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
  },
  data: item,
  depth: 1,
  handleOffset: { x: 0, y: 0 },
  id: item.id,
  position: [0],
  index: 0,
  ...overrides,
});

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

  it('should call onUpdate on drag and drop', () => {
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
          maxDepth={2}
        />
      </DragDropContextProvider>,
    );
    const driver = nestableListTestkitFactory({ wrapper, dataHook });
    driver.reorder({ removedId: '1', addedId: '1' });
    expect(onUpdate).toBeCalledWith({
      items,
      item: getDroppedItemMock(items[0], {}),
    });
  });

  it('should be able to drag & drap item vertically', () => {
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
          maxDepth={2}
        />
      </DragDropContextProvider>,
    );
    const driver = nestableListTestkitFactory({ wrapper, dataHook });
    driver.reorder({ removedId: '2', addedId: '1' });
    expect(onUpdate).toBeCalledWith({
      items: [items[1], items[0]],
      item: getDroppedItemMock(items[1], {
        prevIndex: 1,
        prevPosition: [1],
      }),
    });
  });

  it('should call startDrag and endDrag as part of drag process', () => {
    const dataHook = 'nestable-list';
    const items = [{ id: '1', text: 'item 1' }, { id: '2', text: 'item 2' }];
    const onDragStart = jest.fn();
    const onDragEnd = jest.fn();
    const onUpdate = jest.fn();
    const renderItem = ({ item }) => <div>{item.text}</div>; // eslint-disable-line react/prop-types

    const wrapper = ReactTestUtils.renderIntoDocument(
      <DragDropContextProvider backend={TestBackend}>
        <NestableList
          dataHook={dataHook}
          items={items}
          renderItem={renderItem}
          onUpdate={onUpdate}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          maxDepth={2}
        />
      </DragDropContextProvider>,
    );
    const driver = nestableListTestkitFactory({ wrapper, dataHook });

    // can't simulate only start of drag or only end of drag
    driver.drag('1');
    expect(onDragStart).toBeCalled();
    expect(onDragEnd).toBeCalled();
  });

  it('should be adding nesting if user moved item horizontally above threshold', () => {
    const dataHook = 'nestable-list';
    const items = [{ id: '1', text: 'item 1' }, { id: '2', text: 'item 2' }];
    const onUpdate = jest.fn();
    const threshold = 30;
    const renderItem = ({ item }) => <div>{item.text}</div>; // eslint-disable-line react/prop-types

    const wrapper = ReactTestUtils.renderIntoDocument(
      <DragDropContextProvider backend={TestBackend}>
        <NestableList
          dataHook={dataHook}
          items={items}
          renderItem={renderItem}
          onUpdate={onUpdate}
          maxDepth={2}
          threshold={threshold}
        />
      </DragDropContextProvider>,
    );
    const driver = nestableListTestkitFactory({ wrapper, dataHook });
    const offset = { x: threshold + 1, y: 0 };
    driver.reorder({ removedId: '2', addedId: '2' }, offset);

    expect(onUpdate).toBeCalledWith({
      items: [{ ...items[0], children: [items[1]] }],
      item: getDroppedItemMock(items[1], {
        position: [0, 0],
        prevIndex: 1,
        prevPosition: [1],
      }),
    });
  });

  it('should not do nesting if dropped item not horizontally enough', () => {
    const dataHook = 'nestable-list';
    const items = [{ id: '1', text: 'item 1' }, { id: '2', text: 'item 2' }];
    const onUpdate = jest.fn();
    const threshold = 30;
    const renderItem = ({ item }) => <div>{item.text}</div>; // eslint-disable-line react/prop-types

    const wrapper = ReactTestUtils.renderIntoDocument(
      <DragDropContextProvider backend={TestBackend}>
        <NestableList
          dataHook={dataHook}
          items={items}
          renderItem={renderItem}
          onUpdate={onUpdate}
          maxDepth={2}
          threshold={threshold}
        />
      </DragDropContextProvider>,
    );
    const driver = nestableListTestkitFactory({ wrapper, dataHook });
    const offset = { x: threshold - 1, y: 0 };
    driver.reorder({ removedId: '2', addedId: '2' }, offset);

    expect(onUpdate).toBeCalledWith({
      items,
      item: getDroppedItemMock(items[1], { index: 1, position: [1] }),
    });
  });

  it('should remove nesting if dropping the item on unnested area', () => {
    const dataHook = 'nestable-list';
    const items = [
      { id: '1', text: 'item 1' },
      { id: '2', text: 'item 2', children: [{ id: '33', text: 'item 33' }] },
    ];
    const onUpdate = jest.fn();
    const threshold = 30;
    const renderItem = ({ item }) => <div>{item.text}</div>; // eslint-disable-line react/prop-types

    const wrapper = ReactTestUtils.renderIntoDocument(
      <DragDropContextProvider backend={TestBackend}>
        <NestableList
          dataHook={dataHook}
          items={items}
          renderItem={renderItem}
          onUpdate={onUpdate}
          maxDepth={2}
          threshold={threshold}
        />
      </DragDropContextProvider>,
    );
    const driver = nestableListTestkitFactory({ wrapper, dataHook });
    driver.reorder({ removedId: '33', addedId: '1' });

    expect(onUpdate).toBeCalledWith({
      items: [
        { id: '33', text: 'item 33' },
        { id: '1', text: 'item 1' },
        { id: '2', text: 'item 2', children: [] },
      ],
      item: getDroppedItemMock(
        { id: '33', text: 'item 33' },
        {
          prevIndex: 0,
          prevPosition: [1, 0],
        },
      ),
    });
  });
});
