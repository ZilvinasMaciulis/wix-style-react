import React from 'react';
import PropTypes from 'prop-types';
import { listItemActionBuilder } from '../../ListItemAction';
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
  };

  _onSelect = e => {
    const onClick = this.itemsOnClick.find(({ id }) => id === e.id).onClick;
    onClick && onClick();
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
          size: child.props.textSize,
          prefixIcon: child.props.prefixIcon,
          disabled: child.props.disabled,
        };
      }

      return { id, value: child, custom: true };
    });
  };

  _proxyOnClicks = options => {
    this.itemsOnClick = options.map(({ id, onClick }) => ({ id, onClick }));
  };

  _renderOptions = () => {
    const { textSize } = this.props;
    const children = this._filterChildren(this.props.children);
    const options = this._buildOptions(children);

    this._proxyOnClicks(options);

    return options.map(option => {
      if (option.divider || option.custom) {
        return option;
      }
      return listItemActionBuilder({
        ...option,
        paddingSize: 'small',
        skin: option.skin || 'dark',
        size: textSize,
      });
    });
  };

  _renderTriggerElement = toggle => {
    const { triggerElement } = this.props;
    if (!triggerElement) {
      return null;
    }

    return React.isValidElement(triggerElement)
      ? React.cloneElement(triggerElement, { onClick: toggle })
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
        placement={placement}
        minWidth={minWidth}
        maxWidth={maxWidth}
        flip={flip}
        fixed={fixed}
        showArrow={showArrow}
      >
        {({ toggle }) => this._renderTriggerElement(toggle)}
      </DropdownBase>
    );
  }
}

PopoverMenu.MenuItem.displayName = 'PopoverMenu.MenuItem';
PopoverMenu.Divider.displayName = 'PopoverMenu.Divider';

export default PopoverMenu;
