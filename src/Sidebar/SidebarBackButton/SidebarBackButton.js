import React, { Component } from 'react';
import { SidebarContext } from '../SidebarAPI';

export class SidebarBackButton extends Component {
  displayName = 'SidebarBackButton';

  render() {
    return (
      <SidebarContext.Consumer>
        {context => (
          <div
            onClick={e => {
              const { disable, onClick } = this.props;

              if (!disable) {
                if (onClick) {
                  onClick(e);
                }
                if (!e.defaultPrevented) {
                  context.backClicked();
                }
              }
            }}
          >
            {this.props.children}
          </div>
        )}
      </SidebarContext.Consumer>
    );
  }
}
