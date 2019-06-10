import 'regenerator-runtime/runtime';
import {
  puppeteerTestkitFactoryCreator,
  puppeteerUniTestkitFactoryCreator,
} from 'wix-ui-test-utils/puppeteer';

import inputDriverFactory from '../src/Input/Input.puppeteer.driver';

export const inputTestkitFactory = puppeteerTestkitFactoryCreator(
  inputDriverFactory,
);

import formFieldDriverFactory from '../src/FormField/FormField.puppeteer.driver';

export const formFieldTestkitFactory = puppeteerTestkitFactoryCreator(
  formFieldDriverFactory,
);

import tableDriverFactory from '../src/Table/Table.puppeteer.driver';

export const tableTestkitFactory = puppeteerTestkitFactoryCreator(
  tableDriverFactory,
);

import headingDriverFactory from '../src/Heading/Heading.puppeteer.driver';

export const headingTestkitFactory = puppeteerTestkitFactoryCreator(
  headingDriverFactory,
);

import textDriverFactory from '../src/Text/Text.puppeteer.driver';

export const textTestkitFactory = puppeteerTestkitFactoryCreator(
  textDriverFactory,
);

// wix-ui-core (unidriver)

import { textButtonDriverFactory } from '../src/TextButton/TextButton.uni.driver';

export const textButtonTestkitFactory = puppeteerUniTestkitFactoryCreator(
  textButtonDriverFactory,
);

import { avatarDriverFactory } from '../src/Avatar/Avatar.driver';

export const avatarTestkitFactory = puppeteerUniTestkitFactoryCreator(
  avatarDriverFactory,
);

import { iconButtonDriverFactory } from '../src/IconButton/IconButton.uni.driver';

export const iconButtonTestkitFactory = puppeteerUniTestkitFactoryCreator(
  iconButtonDriverFactory,
);

import { closeButtonDriverFactory } from '../src/CloseButton/CloseButton.uni.driver';

export const closeButtonTestkitFactory = puppeteerUniTestkitFactoryCreator(
  closeButtonDriverFactory,
);

import { proportionDriverFactory } from '../src/Proportion/Proportion.uni.driver';

export const proportionTestkitFactory = puppeteerUniTestkitFactoryCreator(
  proportionDriverFactory,
);

import { linearProgressBarDriverFactory } from '../src/LinearProgressBar/LinearProgressBar.uni.driver';

export const linearProgressBarTestkitFactory = puppeteerUniTestkitFactoryCreator(
  linearProgressBarDriverFactory,
);

import { circularProgressBarDriverFactory } from '../src/CircularProgressBar/CircularProgressBar.uni.driver';

export const circularProgressBarTestkitFactory = puppeteerUniTestkitFactoryCreator(
  circularProgressBarDriverFactory,
);

/*
 * Component generator test component
 */
import { generatedTestComponentDriverFactory } from '../src/GeneratedTestComponent/GeneratedTestComponent.uni.driver';

export const generatedTestComponentTestkitFactory = puppeteerUniTestkitFactoryCreator(
  generatedTestComponentDriverFactory,
);

import { dropdownBaseDriverFactory } from '../src/DropdownBase/DropdownBase.uni.driver';

export const dropdownBaseTestkitFactory = puppeteerUniTestkitFactoryCreator(
  dropdownBaseDriverFactory,
);

import { calendarPanelFooterDriverFactory } from '../src/CalendarPanelFooter/CalendarPanelFooter.uni.driver';

export const calendarPanelFooterTestkitFactory = puppeteerUniTestkitFactoryCreator(
  calendarPanelFooterDriverFactory,
);

import { boxDriverFactory } from '../src/Box/Box.uni.driver';

export const boxTestkitFactory = puppeteerUniTestkitFactoryCreator(
  boxDriverFactory,
);

import { buttonDriverFactory } from '../src/Button/Button.uni.driver';

export const buttonTestkitFactory = puppeteerUniTestkitFactoryCreator(
  buttonDriverFactory,
);

import { thumbnailDriverFactory } from '../src/Thumbnail/Thumbnail.uni.driver';

export const thumbnailTestkitFactory = puppeteerUniTestkitFactoryCreator(
  thumbnailDriverFactory,
);

import { segmentedToggleDriverFactory } from '../src/SegmentedToggle/SegmentedToggle.uni.driver';

export const segmentedToggleTestkitFactory = puppeteerUniTestkitFactoryCreator(
  segmentedToggleDriverFactory,
);

import { richTextInputAreaDriverFactory } from '../src/RichTextInputArea/RichTextInputArea.uni.driver';

export const richTextInputAreaTestkitFactory = puppeteerUniTestkitFactoryCreator(
  richTextInputAreaDriverFactory,
);

import { floatingNotificationDriverFactory } from '../src/FloatingNotification/FloatingNotification.uni.driver';

export const floatingNotificationTestkitFactory = puppeteerUniTestkitFactoryCreator(
  floatingNotificationDriverFactory,
);

import { numberInputDriverFactory } from '../src/NumberInput/NumberInput.uni.driver';

export const numberInputTestkitFactory = puppeteerUniTestkitFactoryCreator(
  numberInputDriverFactory,
);

import { noBorderInputDriverFactory } from '../src/NoBorderInput/NoBorderInput.puppeteer.driver';

export const noBorderInputTestkitFactory = puppeteerTestkitFactoryCreator(
  noBorderInputDriverFactory,
);

import { colorInputDriverFactory } from '../src/ColorInput/ColorInput.uni.driver';

export const colorInputTestkitFactory = puppeteerUniTestkitFactoryCreator(
  colorInputDriverFactory,
);

import { dateInputDriverFactory } from '../src/DateInput/DateInput.uni.driver';

export const dateInputTestkitFactory = puppeteerUniTestkitFactoryCreator(
  dateInputDriverFactory,
);

import { editableTitleUniDriverFactory } from '../src/EditableTitle/EditableTitle.uni.driver';

export const editableTitleTestkitFactory = puppeteerUniTestkitFactoryCreator(
  editableTitleUniDriverFactory,
);

import { accordionDriverFactory } from '../src/Accordion/Accordion.uni.driver';

export const accordionTestkitFactory = puppeteerUniTestkitFactoryCreator(
  accordionDriverFactory,
);

import { socialPreviewDriverFactory } from '../src/SocialPreview/SocialPreview.uni.driver';

export const socialPreviewTestkitFactory = puppeteerUniTestkitFactoryCreator(
  socialPreviewDriverFactory,
);

import { googlePreviewDriverFactory } from '../src/GooglePreview/GooglePreview.uni.driver';

export const googlePreviewTestkitFactory = puppeteerUniTestkitFactoryCreator(
  googlePreviewDriverFactory,
);

import tooltipDriverFactory from '../src/Tooltip/Tooltip.protractor.driver';
import { tooltipDriverFactory as tooltipNextDriverFactory } from '../src/Tooltip/TooltipNext/Tooltip.uni.driver';

export const tooltipTestkitFactory = puppeteerTestkitFactoryCreator(
  tooltipDriverFactory,
);

export const TooltipTestkit = puppeteerUniTestkitFactoryCreator(
  tooltipNextDriverFactory,
);

import { notificationUniDriverFactory } from '../src/Notification/Notification.uni.driver';

export const notificationTestkitFactory = puppeteerUniTestkitFactoryCreator(
  notificationUniDriverFactory,
);

import { checkboxUniDriverFactory } from '../src/Checkbox/Checkbox.uni.driver';

export const checkboxTestkitFactory = puppeteerUniTestkitFactoryCreator(
  checkboxUniDriverFactory,
);

import { loaderUniDriverFactory } from '../src/Loader/Loader.uni.driver';

export const loaderTestkitFactory = puppeteerUniTestkitFactoryCreator(
  loaderUniDriverFactory,
);

import { errorIndicatorDriverFactory } from '../src/ErrorIndicator/ErrorIndicator.uni.driver';

export const errorIndicatorTestkitFactory = puppeteerUniTestkitFactoryCreator(
  errorIndicatorDriverFactory,
);

import { sidebarDriverFactory } from '../src/Sidebar/Sidebar.uni.driver';

export const sidebarTestkitFactory = puppeteerUniTestkitFactoryCreator(
  sidebarDriverFactory,
);

import { ListItemActionDriverFactory } from '../src/ListItemAction/ListItemAction.uni.driver';

export const ListItemActionTestkitFactory = puppeteerUniTestkitFactoryCreator(
  ListItemActionDriverFactory,
);

import { cardSubheaderDriverFactory } from '../src/Card/Subheader/Subheader.uni.driver';

export const subheaderTestkitFactory = puppeteerUniTestkitFactoryCreator(
  cardSubheaderDriverFactory,
);

import { swatchesDriverFactory } from '../src/Swatches/Swatches.uni.driver';

export const swatchesTestkitFactory = puppeteerUniTestkitFactoryCreator(
  swatchesDriverFactory,
);
