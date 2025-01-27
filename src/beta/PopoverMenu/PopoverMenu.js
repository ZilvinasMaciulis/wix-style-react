import React from 'react';
import PropTypes from 'prop-types';
import ListItemAction from '../../ListItemAction';
import DropdownBase from '../../DropdownBase';
import { placements } from '../../Popover';
import styles from './PopoverMenu.st.css';

/** PopoverMenu */
class PopoverMenu extends React.PureComponent {
  static displayName = 'PopoverMenu';

  static MenuItem = () => ({});

  static Divider = () => {
    return (
      <div style={{ padding: `6px 24px 6px 18px` }}>
        <div className={styles.divider} />
      </div>
    );
  };

  static propTypes = {
    /** The maximum width applied to the list */
    maxWidth: PropTypes.number,

    /** The minimum width applied to the list */
    minWidth: PropTypes.number,

    /** Popover content z-index */
    zIndex: PropTypes.number,

    /** Moves popover content relative to the parent by x or y */
    moveBy: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number }),

    /** Element to trigger the popover */
    triggerElement: PropTypes.element.isRequired,

    /** The Popover's placement:
     *  * auto-start
     *  * auto
     *  * auto-end
     *  * top-start
     *  * top
     *  * top-end
     *  * right-start
     *  * right
     *  * right-end
     *  * bottom-end
     *  * bottom
     *  * bottom-start
     *  * left-end
     *  * left
     *  * left-start
     */
    placement: PropTypes.oneOf(placements),

    /** Changing text size */
    textSize: PropTypes.oneOf(['small', 'medium']),

    /** Allow text wrap for menu items */
    wrapText: PropTypes.bool,

    /**
     * Menu items
     *  * <PopoverMenu.MenuItem>
     *  * `text` - Item text
     *  * `onClick` - Callback to be triggered on item click
     *  * `skin` - Item theme (dark, destructive)
     *  * `prefixIcon` - Prefix icon
     *  * `textSize` - Text size (small, medium)
     *  * `disabled` - Disabled
     *  * />
     */
    children: PropTypes.node,

    /** The Popover's appendTo */
    appendTo: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),

    /**
     * Whether to enable the flip behaviour. This behaviour is used to flip the `<Popover/>`'s placement
     * when it starts to overlap the target element (`<Popover.Element/>`).
     */
    flip: PropTypes.bool,
    /**
     * Whether to enable the fixed behaviour. This behaviour is used to keep the `<Popover/>` at it's
     * original placement even when it's being positioned outside the boundary.
     */
    fixed: PropTypes.bool,

    /** Whether to show the Popover's arrow */
    showArrow: PropTypes.bool,
  };

  static defaultProps = {
    maxWidth: 204,
    minWidth: 144,
    placement: 'bottom',
    appendTo: 'parent',
    textSize: 'medium',
    fixed: true,
    flip: true,
    showArrow: true,
    wrapText: false,
  };

  savedOnClicks = null;
  focusableList = [];
  children = {};

  state = {
    focused: 0,
  };

  _onSelect = e => {
    const onClick = this.savedOnClicks.find(({ id }) => id === e.id).onClick;
    onClick && onClick();
  };

  _onKeyDown = (e, id) => {
    const ARROW_LEFT = 37;
    const ARROW_UP = 38;
    const ARROW_RIGHT = 39;
    const ARROW_DOWN = 40;

    const length = this.focusableList.length;
    let focused = this.state.focused;

    const keyCode = e.keyCode;

    if (keyCode === ARROW_LEFT || keyCode === ARROW_UP) {
      if (id === 0) {
        focused = this.focusableList[length - 1];
      } else {
        const nextIndex = this.focusableList.indexOf(id) - 1;
        focused = this.focusableList[nextIndex];
      }
    }

    if (keyCode === ARROW_RIGHT || keyCode === ARROW_DOWN) {
      if (id === length - 1) {
        focused = this.focusableList[0];
      } else {
        const nextIndex = this.focusableList.indexOf(id) + 1;
        focused = this.focusableList[nextIndex];
      }
    }

    if (focused !== this.state.focused) {
      this._focus(e, focused);
    }
  };

  _focus = (e, focused) => {
    e.preventDefault();
    const native = this.children[focused].focus;
    const focusableHOC = this.children[focused].wrappedComponentRef;

    const callback = native
      ? this.children[focused].focus
      : focusableHOC
      ? focusableHOC.innerComponentRef.focus
      : () => ({});

    this.setState({ focused }, () => callback());
  };

  _filterChildren = children => {
    return React.Children.map(children, child => child).filter(
      child => typeof child !== 'string',
    );
  };

  _buildOptions = children => {
    return children.map((child, id) => {
      const displayName = child.type && child.type.displayName;

      if (displayName && displayName === 'PopoverMenu.Divider') {
        return {
          id: id,
          value: child,
          divider: true,
          overrideStyle: true,
        };
      }

      if (displayName && displayName === 'PopoverMenu.MenuItem') {
        return {
          id: id,
          title: child.props.text,
          onClick: child.props.onClick,
          skin: child.props.skin,
          prefixIcon: child.props.prefixIcon,
          disabled: child.props.disabled,
        };
      }

      return { id, value: child, custom: true, overrideStyle: true };
    });
  };

  _saveOnClicks = options => {
    this.savedOnClicks = options.map(({ id, onClick }) => ({ id, onClick }));
  };

  _renderOptions = () => {
    const { textSize, wrapText } = this.props;
    const children = this._filterChildren(this.props.children);
    const options = this._buildOptions(children);

    // Store information for further use
    this._saveOnClicks(options);

    return options.map(option => {
      if (option.divider || option.custom) {
        return option;
      }
      const { id, disabled, onClick, ...rest } = option;

      const { focused } = this.state;

      if (!disabled) {
        this.focusableList = [...this.focusableList, id];
      }

      return {
        id,
        disabled,
        overrideStyle: true,
        value: props => (
          <ListItemAction
            {...props}
            {...rest}
            as="button"
            autoFocus={id === this.focusableList[0]}
            dataHook={`popover-menu-${id}`}
            ref={ref => (this.children[id] = ref)}
            tabIndex={id === focused && !disabled ? '0' : '-1'}
            onKeyDown={e => this._onKeyDown(e, id)}
            skin={option.skin || 'dark'}
            size={textSize}
            className={styles.listItem}
            wrapText={wrapText}
          />
        ),
      };
    });
  };

  _renderTriggerElement = toggle => {
    const { triggerElement } = this.props;
    if (!triggerElement) {
      return null;
    }

    return React.isValidElement(triggerElement)
      ? React.cloneElement(triggerElement, {
          onClick: toggle,
        })
      : triggerElement({
          onClick: toggle,
        });
  };

  render() {
    const {
      appendTo,
      placement,
      minWidth,
      maxWidth,
      flip,
      fixed,
      showArrow,
      dataHook,
    } = this.props;
    return (
      <DropdownBase
        {...styles('root', {}, this.props)}
        dataHook={dataHook}
        options={this._renderOptions()}
        onSelect={this._onSelect}
        appendTo={appendTo}
        overflow="visible"
        placement={placement}
        minWidth={minWidth}
        maxWidth={maxWidth}
        flip={flip}
        fixed={fixed}
        showArrow={showArrow}
        tabIndex="-1"
      >
        {({ toggle }) => this._renderTriggerElement(toggle)}
      </DropdownBase>
    );
  }
}

PopoverMenu.MenuItem.displayName = 'PopoverMenu.MenuItem';
PopoverMenu.Divider.displayName = 'PopoverMenu.Divider';

export default PopoverMenu;
