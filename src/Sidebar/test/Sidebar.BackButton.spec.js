import React from 'react';
import Sidebar from '../Sidebar';
import { mount } from 'enzyme';

describe('Sidebar', () => {
  describe('BackButton', () => {
    it('should go back when clicked', () => {
      const sidebar = mount(
        <Sidebar selectedKey={'item2'}>
          <Sidebar.Item
            itemKey={'item1'}
            innerMenu={[
              <Sidebar.BackButton key={'back'}>
                <div data-hook="sidebar-back-button">BACK</div>
              </Sidebar.BackButton>,
              <Sidebar.Item key={'item2'} itemKey={'item2'}>
                <div data-hook="simple2">456</div>
              </Sidebar.Item>,
            ]}
          >
            <div data-hook="simple1">123</div>
          </Sidebar.Item>
        </Sidebar>,
      );

      let subMenuChildren = sidebar.find(`[data-hook="driven-in-children"]`);
      expect(subMenuChildren.exists()).toBeTruthy();

      const backButtonEl = sidebar.find(`[data-hook="sidebar-back-button"]`);
      backButtonEl.simulate('click');

      subMenuChildren = sidebar.find(`[data-hook="driven-in-children"]`);
      expect(subMenuChildren.exists()).toBeFalsy();
    });
  });
});
