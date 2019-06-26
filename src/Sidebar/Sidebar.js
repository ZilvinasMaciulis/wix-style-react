import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import defaultCss from './main.scss';
import { SidebarItem } from './SidebarItem';
import { SidebarPersistentHeader } from './SidebarPersistentHeader';
import { SidebarPersistentFooter } from './SidebarPersistentFooter';
import { SidebarBackButton } from './SidebarBackButton';
import { SidebarContext } from './SidebarAPI';
import { DataHooks } from './dataHooks';

/** A sidebar navigation component  */
class Sidebar extends Component {
  static displayName = 'Sidebar';

  static Item = SidebarItem;
  static PersistentHeader = SidebarPersistentHeader;
  static PersistentFooter = SidebarPersistentFooter;
  static BackButton = SidebarBackButton;

  static propTypes = {
    /** classNames overrides  */
    classNames: PropTypes.shape({
      sideBar: PropTypes.string,
      content: PropTypes.string,
      slider: PropTypes.string,
      sliderOutToLeft: PropTypes.string,
      sliderInFromLeft: PropTypes.string,
      sliderInFromRight: PropTypes.string,
    }),

    /** The dataHook of the Sidebar */
    dataHook: PropTypes.string,

    /**  Sidebar menu children */
    children: PropTypes.node,

    /**  Sidebar indicator for animating out or in */
    isHidden: PropTypes.bool,
  };

  itemKey2Children = {};
  itemKey2ParenttKey = {};

  state = {
    persistentTopChildren: [],
    drivenOutChildren: [],
    onScreenChildren: [],
    drivenInChildren: [],
    persistentBottomChildren: [],

    selectedKey: '',
    lastSelectedKey: '',
  };

  _navigateTo = itemKey => {
    if (this.itemKey2ParenttKey[itemKey]) {
      if (this.itemKey2ParenttKey[itemKey] !== this.state.lastSelectedKey) {
        this.setState({
          drivenInChildren: this.itemKey2Children[
            this.itemKey2ParenttKey[itemKey]
          ].children,
          selectedKey: itemKey,
          lastSelectedKey: this.itemKey2ParenttKey[itemKey],
        });
      } else {
        this.setState({ selectedKey: itemKey });
      }
      this.sidebarContext = this._getSidebarContext();
      return;
    }

    if (this.itemKey2Children[itemKey]) {
      const { children, selectedKey } = this.itemKey2Children[itemKey];
      this.setState({
        drivenInChildren: children,
        selectedKey,
        lastSelectedKey: itemKey,
      });
    } else {
      this.setState({ selectedKey: itemKey });
    }

    this.sidebarContext = this._getSidebarContext();
  };

  _getSidebarContext = () => {
    return {
      itemClicked: this._navigateTo,
      backClicked: () => {
        this.setState({
          drivenInChildren: [],
          drivenOutChildren: this.state.drivenInChildren,
          selectedKey: this.state.lastSelectedKey,
          lastSelectedKey: '',
        });
        this.sidebarContext = this._getSidebarContext();
      },
      getSelectedKey: () => this.state.selectedKey,
    };
  };

  sidebarContext = this._getSidebarContext();

  componentWillMount() {
    this._setInnerMenus(this.props);
  }

  componentWillReceiveProps(props) {
    this._setInnerMenus(props);
  }

  _setInnerMenus(props) {
    const persistentTopChildren = [];
    const persistentBottomChildren = [];
    const onScreenChildren = [];

    const handleChild = child => {
      if (child.type === SidebarItem) {
        this.itemKey2Children[child.props.itemKey] = {
          selectedKey: child.props.innerMenu
            ? child.props.innerMenu.find(
                c => c.type === SidebarItem && !c.props.disable,
              ).props.itemKey
            : child.props.itemKey,
          children: child.props.innerMenu ? child.props.innerMenu : [],
        };

        if (child.props.innerMenu) {
          child.props.innerMenu.forEach(innerChild => {
            if (innerChild.type === SidebarItem) {
              this.itemKey2ParenttKey[innerChild.props.itemKey] =
                child.props.itemKey;
            }
          });
        }
        onScreenChildren.push(child);
      } else if (child.type === SidebarPersistentHeader) {
        persistentTopChildren.push(child);
      } else if (child.type === SidebarPersistentFooter) {
        persistentBottomChildren.push(child);
      } else {
        onScreenChildren.push(child);
      }
    };

    if (props.children) {
      if (props.children.length) {
        props.children.forEach(child => {
          if (child.length > 0) {
            child.forEach(handleChild);
          } else {
            handleChild(child);
          }
        });
      } else {
        handleChild(props.children);
      }
    }

    const newState = {
      persistentTopChildren,
      persistentBottomChildren,
      onScreenChildren,
      selectedKey: props.selectedKey,
    };

    const selectedItemParentKey = this.itemKey2ParenttKey[props.selectedKey];
    if (selectedItemParentKey) {
      this.setState({
        ...newState,
        drivenInChildren: this.itemKey2Children[selectedItemParentKey].children,
        drivenOutChildren: [],
      });
    } else {
      this.setState({
        ...newState,
        drivenInChildren: [],
        drivenOutChildren: this.state.drivenInChildren,
      });
    }
  }

  /** marks the selected key as the current one */
  setSelectedKey = selectedKey => {
    this.setState({ selectedKey });
  };

  render() {
    const css = { ...defaultCss, ...this.props.classNames };

    const sliderClasses = classnames({
      [css.sliderOutToLeft]: this.state.drivenInChildren.length !== 0,
      [css.sliderInFromLeft]: this.state.drivenInChildren.length === 0,
      [css.slider]: true,
    });

    const sliderOutToRightClasses = classnames(
      css.sliderOutToRight,
      css.slider,
    );
    const sliderInFromRightClasses = classnames(
      css.sliderInFromRight,
      css.slider,
    );

    const rootClasses = classnames({
      [css.sideBar]: true,
      [css.hiddenSideBar]: this.props.isHidden,
    });

    return (
      <SidebarContext.Provider value={this.sidebarContext}>
        <div className={rootClasses} data-hook={this.props.dataHook}>
          {this.state.persistentTopChildren}

          <div className={css.content}>
            {this.state.drivenInChildren.length === 0 &&
              this.state.drivenOutChildren.length !== 0 && (
                <div
                  className={sliderOutToRightClasses}
                  data-hook={DataHooks.drivenOutChildren}
                >
                  {this.state.drivenOutChildren}
                </div>
              )}

            <div
              className={sliderClasses}
              data-hook={DataHooks.onScreenChildren}
            >
              {this.state.onScreenChildren}
            </div>

            {this.state.drivenInChildren.length !== 0 && (
              <div
                className={sliderInFromRightClasses}
                data-hook={DataHooks.drivenInChildren}
              >
                {this.state.drivenInChildren}
              </div>
            )}
          </div>

          {this.state.persistentBottomChildren}
        </div>
      </SidebarContext.Provider>
    );
  }
}

export default Sidebar;
