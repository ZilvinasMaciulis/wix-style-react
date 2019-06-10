import React, { PureComponent } from 'react';
import { SidebarContext, SidebarItemContext } from '../SidebarAPI';

export class SidebarItem extends PureComponent {
  displayName = 'SidebarItem';

  render() {
    return (
      <SidebarContext.Consumer>
        {context => (
          <div
            onClick={e => {
              if (!this.props.disable) {
                if (this.props.onClick) {
                  this.props.onClick(this.props.itemKey, e);
                }
                if (!e.defaultPrevented) {
                  context.itemClicked(this.props.itemKey);
                }
              }
            }}
          >
            <SidebarItemContext.Provider
              value={{
                selected: () => context.getSelectedKey() === this.props.itemKey,
              }}
            >
              {this.props.children}
            </SidebarItemContext.Provider>
          </div>
        )}
      </SidebarContext.Consumer>
    );
  }
}
