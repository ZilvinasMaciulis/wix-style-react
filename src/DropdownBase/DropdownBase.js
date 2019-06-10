import React from 'react';
import PropTypes from 'prop-types';
import style from './DropdownBase.st.css';

import Popover, { placements } from '../Popover';
import DropdownLayout from '../DropdownLayout';

class DropdownBase extends React.PureComponent {
  static displayName = 'DropdownBase';

  static propTypes = {
    dataHook: PropTypes.string,

    /** A controlled prop to control whether the Popover should be opened*/
    open: PropTypes.bool,
    /** The Popover's placement */
    placement: PropTypes.oneOf(placements),
    /** The Popover's appendTo */
    appendTo: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    /** Whether to show the Popover's arrow */
    showArrow: PropTypes.bool,
    /** Callback function to be called on outside click */
    onClickOutside: PropTypes.func,
    /** Callback function to be called on mouseEnter on the entire component */
    onMouseEnter: PropTypes.func,
    /** Callback function to be called on mouseEnter onMouseLeave the entire component */
    onMouseLeave: PropTypes.func,
    /** Callback function to be called when selecting an option. It's signature is `onSelect(selectedOption)` */
    onSelect: PropTypes.func,

    /** The minimum width applied to the list */
    minWidth: PropTypes.number,
    /** The maximum width applied to the list */
    maxWidth: PropTypes.number,

    /**
     * The target component to be rendered. If a regular node is paseed, it'll be rendered as-is.
     * If a function is passed, it's expected to return a React element. The function accepts an
     * object containing the following properties:
     *
     *  * `open` - will open the Popover
     *  * `close` - will close the Popover
     *  * `toggle` - will toggle the Popover
     *  * `delegateKeyDown` - the underlaying DropdownLayout's keydown handler. It can be called
     *                        inside another keyDown event in order to delegate it.
     *  * `selectedOption` - the currently selected option
     *
     * Refer to the component documentation for more information.
     */
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),

    /**
     * Array of objects. Objects must have an `id` and can can include value and node. If value is
     * '-', a divider will be rendered instead (dividers do not require and id).
     */
    options: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.shape({
          id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
            .isRequired,
          value: PropTypes.oneOfType([
            PropTypes.node,
            PropTypes.string,
            PropTypes.func,
          ]).isRequired,
          disabled: PropTypes.bool,
          overrideStyle: PropTypes.bool,
        }),

        // A divider option without an id
        PropTypes.shape({
          value: PropTypes.oneOf(['-']),
        }),
      ]),
    ),

    /** The `id` of the selected option in the list */
    selectedId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /** Dropdown container overflow value */
    overflow: PropTypes.string,

    /** Dropdown container tabindex value */
    tabIndex: PropTypes.string,

    /**
     * The `id` of the **initial** selected option in the list, will be used when the selection
     * behaviour is being controlled
     */
    initialSelectedId: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),

    /** Dropdown content z-index */
    zIndex: PropTypes.number,

    /** moves dropdown content relative to the parent by x or y */
    moveBy: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number }),

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
  };

  static defaultProps = {
    placement: 'bottom',
    appendTo: 'parent',
    showArrow: false,
  };

  _dropdownLayoutRef = null;
  _shouldCloseOnMouseLeave = false;

  state = {
    open: this.props.open,
    selectedId: this.props.selectedId || this.props.initialSelectedId || -1,
  };

  /**
   * Return `true` if the `open` prop is being controlled
   */
  _isControllingOpen = (props = this.props) => {
    return typeof props.open !== 'undefined';
  };

  /**
   * Return `true` if the selection behaviour is being controlled
   */
  _isControllingSelection = (props = this.props) => {
    return (
      typeof props.selectedId !== 'undefined' &&
      typeof props.onSelect !== 'undefined'
    );
  };

  _open = () => {
    !this._isControllingOpen() && this.setState({ open: true });
  };

  _close = e => {
    if (this._isControllingOpen()) {
      return;
    }

    // If called within a `mouseleave` event on the target element, we would like to close the
    // popover only on the popover's `mouseleave` event
    if (e && e.type === 'mouseleave') {
      // We're not using `setState` since we don't want to wait for the next render
      this._shouldCloseOnMouseLeave = true;
    } else {
      this.setState({ open: false });
    }
  };

  _toggle = () => {
    !this._isControllingOpen() &&
      this.setState(({ open }) => ({
        open: !open,
      }));
  };

  _handleClickOutside = () => {
    const { onClickOutside } = this.props;

    this._close();
    onClickOutside && onClickOutside();
  };

  _handlePopoverMouseEnter = () => {
    const { onMouseEnter } = this.props;

    onMouseEnter && onMouseEnter();
  };

  _handlePopoverMouseLeave = () => {
    const { onMouseLeave } = this.props;

    if (this._shouldCloseOnMouseLeave) {
      this._shouldCloseOnMouseLeave = false;

      this.setState({
        open: false,
      });
    }

    onMouseLeave && onMouseLeave();
  };

  _handleSelect = selectedOption => {
    const newState = {};

    if (!this._isControllingOpen()) {
      newState.open = false;
    }

    if (!this._isControllingSelection()) {
      newState.selectedId = selectedOption.id;
    }

    this.setState(newState, () => {
      const { onSelect } = this.props;
      onSelect && onSelect(selectedOption);
    });
  };

  _handleClose = () => {
    if (this.state.open) {
      this._close();
    }
  };

  _getSelectedOption = selectedId => {
    return this.props.options.find(({ id }) => id === selectedId);
  };

  /**
   * Determine if a certain key should open the DropdownLayout
   */
  _isOpenKey = key => {
    return ['Enter', 'Spacebar', ' ', 'ArrowDown'].includes(key);
  };

  /**
   * A common `keydown` event that can be used for the target elements. It will automatically
   * delegate the event to the underlaying <DropdownLayout/>, and will determine when to open the
   * dropdown depending on the pressed key.
   */
  _handleKeyDown = e => {
    if (this._isControllingOpen()) {
      return;
    }

    const isHandledByDropdownLayout = this._delegateKeyDown(e);

    if (!isHandledByDropdownLayout) {
      if (this._isOpenKey(e.key)) {
        this._open();
        e.preventDefault();
      }
    }
  };

  /*
   * Delegate the event to the DropdownLayout. It'll handle the navigation, option selection and
   * closing of the dropdown.
   */
  _delegateKeyDown = e => {
    if (!this._dropdownLayoutRef) {
      return false;
    }

    return this._dropdownLayoutRef._onKeyDown(e);
  };

  componentWillReceiveProps(nextProps) {
    // Keep internal state updated if needed
    if (
      this._isControllingOpen(nextProps) &&
      this.props.open !== nextProps.open
    ) {
      this.setState({ open: nextProps.open });
    }

    if (
      this._isControllingSelection(nextProps) &&
      this.props.selectedId !== nextProps.selectedId
    ) {
      this.setState({ selectedId: nextProps.selectedId });
    }
  }

  _renderChildren() {
    const { children } = this.props;
    const { selectedId } = this.state;

    if (!children) {
      return null;
    }

    return React.isValidElement(children)
      ? children // Returning the children as is when using in controlled mode
      : children({
          open: this._open,
          close: this._close,
          toggle: this._toggle,

          delegateKeyDown: this._delegateKeyDown,

          selectedOption: this._getSelectedOption(selectedId),
        });
  }

  render() {
    const {
      dataHook,
      placement,
      appendTo,
      showArrow,
      zIndex,
      moveBy,
      options,
      minWidth,
      maxWidth,
      fixed,
      flip,
      tabIndex,
      overflow,
    } = this.props;

    const { open, selectedId } = this.state;

    return (
      <Popover
        dataHook={dataHook}
        shown={open}
        placement={placement}
        appendTo={appendTo}
        showArrow={showArrow}
        zIndex={zIndex}
        moveBy={moveBy}
        onKeyDown={this._handleKeyDown}
        onMouseEnter={this._handlePopoverMouseEnter}
        onMouseLeave={this._handlePopoverMouseLeave}
        onClickOutside={this._handleClickOutside}
        fixed={fixed}
        flip={flip}
        {...style(
          'root',
          {
            withWidth: Boolean(minWidth || maxWidth),
            withArrow: showArrow,
          },
          this.props,
        )}
      >
        <Popover.Element>{this._renderChildren()}</Popover.Element>

        <Popover.Content>
          <div
            style={{
              maxWidth,
              minWidth,
            }}
          >
            <DropdownLayout
              dataHook="dropdown-base-dropdownlayout"
              ref={r => (this._dropdownLayoutRef = r)}
              selectedId={selectedId}
              options={options}
              onSelect={this._handleSelect}
              onClose={this._handleClose}
              tabIndex={tabIndex}
              inContainer
              visible
              overflow={overflow}
            />
          </div>
        </Popover.Content>
      </Popover>
    );
  }
}

export default DropdownBase;
