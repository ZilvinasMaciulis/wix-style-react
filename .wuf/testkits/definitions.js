/*
 * This file exports object with config for component testkits.
 * Ideally there should be no config, it is used for cases that are not following convention.
 *
 * Glossary:
 *   regular components export testkits and pass sanity tests automatically (no config).
 *   non-regular components need additional config for export and sanity tests to be automated.
 *
 * { [component.displayName]: TestkitDefinition }
 *
 * [component.displayName] = {
 *   // what kind of drivers should be tested
 *   drivers?: ['vanilla', 'enzyme']
 *
 *   // set to true if testkit already has export in `test/generate-testkit-exports/enzyme.template
 *   // this is used for proxied components from other libraries (like wix-ui-backoffice)
 *   manualExport?: false;
 *
 *   // skip sanity tests for this component entirely.
 *   // this is likely an indication for a fix
 *   skipTestkitSanity?: false;
 *
 *   // Indicate that component does not have testkit at all.
 *   // It is sometimes ok not to have one.
 *   noTestkit?: false;
 *
 *   // Mark if component uses unidriver.
 *   // It is required for unidriver, because it is tested differently
 *   unidriver?: false;
 *
 *   // set path to testkit if path is not following convention
 *   // this file will be imported and wrapped with appropriate testkit factory
 *   // (one of testkitFactoryCreator, uniTestkitFactoryCreator, enzymeTestkitFactoryCreator or enzymeUniTestkitFactoryCreator
 *   testkitPath?: function;
 * }
 */

module.exports = {
  SideMenuDrill: {
    skipSanityTest: true,
    testkitPath: "../src/SideMenu/DrillView/DrillView.driver"
  },

  BadgeSelectItemBuilder: { skipSanityTest: true, noTestkit: true },

  MultiSelect: {
    skipSanityTest: true // testkit does not have root `exists` method
  },

  MultiSelectCheckbox: {
    skipSanityTest: true // testkit does not have root `exists` method
  },

  DragAndDrop: { skipSanityTest: true, noTestkit: true },
  DragDropContextProvider: { skipSanityTest: true, noTestkit: true },

  EndorseContentLayout: {
    skipSanityTest: true,
    // TODO: testkit of this component is not following convention.
    // It is used only internally and before automated export was not exported manually
    noTestkit: true
  },

  GoogleAddressInput: {
    skipSanityTest: true,
    // TODO: testkit of this component is not following convention.
    // It is used only internally and before automated export was not exported manually
    noTestkit: true
  },

  GoogleAddressInputWithLabel: {
    skipSanityTest: true
    // TODO: testkit of this component is not following convention.
    // It is used only internally and before automated export was not exported manually
  },

  Grid: { skipSanityTest: true, noTestkit: true },
  HBox: { skipSanityTest: true, noTestkit: true },
  Layout: { skipSanityTest: true, noTestkit: true },
  MessageBox: { skipSanityTest: true, noTestkit: true },

  Header: {
    testkitPath: "../src/Card/Header/Header.driver",
    // TODO: this is actually  Card.Header, but is exported just as header
    skipSanityTest: true
  },

  Page: { skipSanityTest: true },
  PageHeader: { skipSanityTest: true },
  PopoverMenuItem: { skipSanityTest: true, noTestkit: true },
  TableToolbar: { skipSanityTest: true, noTestkit: true },
  Tooltip: { skipSanityTest: true, manualExport: true },
  VBox: { skipSanityTest: true, noTestkit: true },
  Collapse: { skipSanityTest: true, noTestkit: true },
  Card: { skipSanityTest: true, noTestkit: true },
  Composite: { skipSanityTest: true, noTestkit: true },
  FullTextView: { skipSanityTest: true, noTestkit: true },

  RichTextArea: {
    beforeAllHook: () => (window.getSelection = () => ({})),
    testkitPath: "../src/Deprecated/RichTextArea/RichTextArea.driver"
  },

  RichTextAreaComposite: {
    beforeAllHook: () => (window.getSelection = () => ({})),
    testkitPath:
      "../src/Deprecated/RichTextAreaComposite/RichTextAreaComposite.driver"
  },

  Avatar: { unidriver: true },

  TextButton: {
    unidriver: true,
    testkitPath: "../src/TextButton/TextButton.uni.driver"
  },

  IconButton: {
    unidriver: true,
    skipSanityTest: true,
    testkitPath: "../src/IconButton/IconButton.uni.driver"
  },

  CloseButton: {
    unidriver: true,
    testkitPath: "../src/CloseButton/CloseButton.uni.driver"
  },

  CardGalleryItem: {
    unidriver: true,
    testkitPath: "../src/CardGalleryItem/CardGalleryItem.uni.driver"
  },

  SideMenu: {
    testkitPath: "../src/SideMenu/core/SideMenu.driver"
  },

  Button: { unidriver: true, testkitPath: "../src/Button/Button.uni.driver" },

  CalendarPanelFooter: {
    unidriver: true,
    testkitPath: "../src/CalendarPanelFooter/CalendarPanelFooter.uni.driver"
  },

  ContactItemBuilder: { skipSanityTest: true },

  Draggable: {
    testkitPath: "../src/DragAndDrop/Draggable/Draggable.driver",
    skipSanityTest: true
  },

  EditableRow: {
    testkitPath: "../src/EditableSelector/EditableRow/EditableRow.driver",
    unidriver: false, // TODO: component has unidriver, but it is exported as legacy driver. Changing it is a breaking change
    skipSanityTest: true
  },

  FieldLabelAttributes: {
    testkitPath: "../src/FieldLabelAttributes/FieldLabelAttributes.driver",
    skipSanityTest: true
  },

  FieldWithSelectionComposite: {
    testkitPath:
      "../src/Composite/FieldWithSelectionComposite/FieldWithSelectionComposite.driver",
    skipSanityTest: true
  },

  Carousel: {
    drivers: ["enzyme"]
  },

  Notification: {},

  NumberInput: {
    unidriver: true,
    testkitPath: "../src/NumberInput/NumberInput.uni.driver"
  },

  FloatingNotification: {
    unidriver: true,
    drivers: ["enzyme"],
    testkitPath: "../src/FloatingNotification/FloatingNotification.uni.driver"
  },

  DatePicker: {
    skipSanityTest: true // testkit does not have root `exists` method
  },

  Proportion: {
    unidriver: true,
    drivers: ["enzyme"],
    testkitPath: "../src/Proportion/Proportion.uni.driver"
  },

  DropdownBase: {
    unidriver: true,
    testkitPath: "../src/DropdownBase/DropdownBase.uni.driver"
  },

  RadioButton: {
    testkitPath: "../src/RadioGroup/RadioButton/RadioButton.driver",
    skipSanityTest: true
  },

  MessageBoxMarketerialLayout: {
    testkitPath:
      "../src/MessageBox/MarketerialLayout/MessageBoxMarketerialLayout.driver",
    skipSanityTest: true
  },

  MessageBoxFunctionalLayout: {
    testkitPath:
      "../src/MessageBox/FunctionalLayout/MessageBoxFunctionalLayout.driver",
    skipSanityTest: true
  },

  Box: { unidriver: true, testkitPath: "../src/Box/Box.uni.driver" },

  Thumbnail: {
    unidriver: true,
    testkitPath: "../src/Thumbnail/Thumbnail.uni.driver"
  },

  SegmentedToggle: {
    unidriver: true,
    testkitPath: "../src/SegmentedToggle/SegmentedToggle.uni.driver"
  },

  RichTextInputArea: {
    unidriver: true,
    testkitPath: "../src/RichTextInputArea/RichTextInputArea.uni.driver"
  },

  NoBorderInput: {},

  DateInput: {
    unidriver: true,
    testkitPath: "../src/DateInput/DateInput.uni.driver"
  },

  ColorInput: {
    unidriver: true,
    testkitPath: "../src/ColorInput/ColorInput.uni.driver"
  },

  EditableTitle: {
    testkitPath: "../src/EditableTitle/EditableTitle.uni.driver",
    unidriver: true
  },

  GooglePreview: {
    unidriver: true,
    testkitPath: "../src/GooglePreview/GooglePreview.uni.driver"
  },

  Accordion: {
    unidriver: true,
    testkitPath: "../src/Accordion/Accordion.uni.driver"
  },

  SocialPreview: {
    unidriver: true,
    testkitPath: "../src/SocialPreview/SocialPreview.uni.driver"
  },

  ErrorIndicator: {
    unidriver: true,
    testkitPath: "../src/ErrorIndicator/ErrorIndicator.uni.driver"
  },

  CardSubheader: {
    unidriver: true,
    skipSanityTest: true,
    testkitPath: "../src/Card/Subheader/Subheader.uni.driver"
  },

  ListItemAction: {
    unidriver: true,
    testkitPath: "../src/ListItemAction/ListItemAction.uni.driver"
  },

  Swatches: {
    unidriver: true,
    testkitPath: "../src/Swatches/Swatches.uni.driver"
  },

  SortableList: {
    testkitPath: "../src/SortableList/SortableList.driver"
  },
  Sidebar: {
    unidriver: true,
    testkitPath: "../src/Sidebar/Sidebar.uni.driver"
  },

  Selector: {
    unidriver: false, // TODO: component has unidriver, but it is exported as legacy driver. Changing it is a breaking change
    testkitPath: "../src/Selector/Selector.driver"
  },

  NestableList: {
    testkitPath: "../src/NestableList/NestableList.driver"
  },

  Stepper: {
    unidriver: true,
    testkitPath: "../src/Stepper/Stepper.uni.driver"
  }
};
