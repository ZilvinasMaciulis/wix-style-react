/**
 * Storybook list of stories
 *
 * order is reflected in storybook sidebar
 */

require('./Introduction');
require('./Playground/Playground');

// 1. Foundations
require('../src/Typography/docs/index.story'); // 1.2 Typography
require('../src/new-icons/docs'); // 1.4 Icons

require('./ScrollBar'); // 1.8 ScrollBar

// 2. Layout
require('./PageLayout/index.story'); // 2.1 Page Layout
require('../src/Card/docs'); // 2.2 Card Layout

// 3. Inputs
require('./TextInput/index.story'); // 3.1. Text Input
require('./TextArea/index.story'); // 3.2 Text Area
require('./RichTextArea/index.story'); // 3.3 Rich Text Area
require('./NumberInput/index.story'); // 3.4 NumberInput
require('../src/ColorInput/docs/index.story'); // 3.11 ColorInput
require('./MultiSelect/index.story'); // 3.12 Tags

// 4. Selection
require('./Dropdown/DropdownStory'); // 4.1 Dropdown
require('./SegmentedToggle/index.story'); // 4.5 SegmentedToggle
require('./Slider/index.story'); // 4.8 Slider

// 5. Buttons
require('../src/Button/docs/index.story'); // 5.1 Standard
require('../src/IconButton/docs/index.story'); // 5.2 Icon Button
require('../src/TextButton/docs/index.story'); // 5.3 Text Button
require('../src/CloseButton/docs/index.story'); // 5.4 Close Button

// 7. Tooltips
require('./Tooltip/index.story'); // 7.1 Tooltip

// 8. Notification Bars
require('../src/Notification/docs/index.story');
require('../src/FloatingNotification/docs/index.story');

// 9. Modals
require('../src/MessageBox/docs');

// Components API
require('../src/Accordion/docs/index.story');
require('../src/AddItem/docs/index.story');
require('../src/AutoComplete/docs');
require('../src/AutoCompleteComposite/docs');
require('../src/Avatar/docs/index.story');
require('../src/Badge/docs/index.story');
require('../src/BadgeSelect/docs/index.story');
require('../src/Box/docs/index.story');
require('../src/Breadcrumbs/docs/index.story');
require('../src/Calendar/docs/index.story');
require('../src/CalendarPanel/docs/index.story');
require('../src/CalendarPanelFooter/docs/index.story');
require('../src/CardGalleryItem/docs/index.story');
require('../src/Card/Subheader/docs/index.story');
require('../src/Carousel/docs/index.story');
require('../src/Checkbox/docs/index.story');
require('../src/CircularProgressBar/docs/index.story');
require('../src/Collapse/docs/index.story');
require('../src/ColorPicker/docs/index.story');
require('../src/CounterBadge/docs/index.story');
require('../src/DataTable/docs');
require('../src/DatePicker/docs/index.story');
require('../src/Dropdown/docs/index.story');
require('../src/DropdownBase/docs/index.story');
require('../src/DropdownLayout/docs');
require('../src/EditableSelector/docs/index.story');
require('../src/EmptyState/docs/index.story');
require('../src/EndorseContentLayout/docs');
require('../src/FilePicker/docs/index.story');
require('../src/FloatingHelper/FloatingHelperContent/docs/index.story');
require('../src/FloatingHelper/docs/index.story');
require('../src/FormField/docs/index.story');
require('../src/FullTextView/docs/index.story');
require('../src/GenericModalLayout/docs/index.story');
require('../src/GoogleAddressInput/docs/index.story');
require('../src/GooglePreview/docs/index.story');
require('../src/Grid/docs');
require('../src/Heading/docs/index.story');
require('../src/Highlighter/docs/index.story');
require('../src/ImageViewer/docs/index.story');
require('../src/Input/docs/index.story');
require('../src/InputArea/docs/index.story');
require('../src/InputWithOptions/docs');
require('../src/Label/docs/index.story');
require('../src/Layout/docs');
require('../src/Layout/docs/index.story');
require('../src/LinearProgressBar/docs/index.story');
require('../src/ListItemAction/docs/index.story');
require('../src/Loader/docs/index.story');
require('../src/MessageBox/FunctionalLayout/docs/index.story');
require('../src/Modal/docs');
require('../src/ModalSelectorLayout/docs/index.story');
require('../src/MultiSelect/docs/index.story');
require('../src/MultiSelectCheckbox/docs/index.story');
require('../src/MultiSelectComposite/docs');
require('../src/NumberInput/docs/index.story');
require('../src/Page/docs/PageExampleStories');
require('../src/Page/docs/index.story');
require('../src/PageHeader/docs/index.story');
require('../src/Popover/docs/index.story');
require('../src/PopoverMenu/docs/index.story');
require('../src/Proportion/docs/index.story');
require('../src/RadioGroup/docs/index.story');
require('../src/Range/docs');
require('../src/RichTextInputArea/docs/index.story');
require('../src/Search/docs/index.story');
require('../src/SectionHelper/docs/index.story');
require('../src/SegmentedToggle/docs/index.story');
require('../src/Slider/docs/index.story');
require('../src/SideMenu/docs');
require('../src/SideMenu/docs/SideMenu');
require('../src/Skeleton/docs/index.story');
require('../src/SocialPreview/docs/index.story.js');
require('../src/StatsWidget/docs/index.story');
require('../src/Swatches/docs/index.story');
require('../src/Table/docs/index.story');
require('../src/TableActionCell/docs/index.story');
require('../src/TableToolbar/docs/ToolbarStory');
require('../src/Tabs/docs');
require('../src/Tag/docs/index.story');
require('../src/Text/docs/index.story');
require('../src/Thumbnail/docs/index.story');
require('../src/TimeInput/docs/index.story');
require('../src/ToggleSwitch/docs/index.story');
require('../src/Tooltip/TooltipNext/docs/index.story');

// Styling
require('../src/Typography/docs/cssClasses.story');

// WIP
require('./WIP');
require('../src/DragAndDrop/docs/DragAndDrop');
require('../src/BadgeSelectItemBuilder/docs');
require('../src/ContactItemBuilder/docs');
require('../src/DateInput/docs/index.story');

// Tests
require('../src/Typography/test/TestStory');
require('../src/Input/docs/InputTestStories');
require('../src/NumberInput/test/testStory');
require('../src/TimeInput/docs/testStory');
require('../src/Page/docs/PageTestStories'); // Tests/2. Layout/2.5 + Page/
require('../src/Page/docs/PageTestStoriesDeprecated'); // Tests/2. Layout/2.5 + Page/Deprecated
require('../src/PageHeader/docs/PageHeaderTestStories'); // Tests/2. Layout/2.5 + PageHeader/
require('../src/IconButton/docs/testStory'); // Tests/5. Button/5.2 IconButton
require('../src/TextButton/docs/testStory'); // Tests/5. Button/5.3 TextButton
require('../src/CloseButton/docs/testStory'); // Tests/5. Button/5.4 CloseButton
require('../src/Calendar/docs/CalendarTestStory'); // Tests/3. Inputs/3.13 Calendar
require('../src/MultiSelect/docs/testStory'); // Tests/3. Inputs/3.8 Tags
require('../src/PopoverMenu/docs/PopoverMenuRegressionTest'); // Tests/7.3. Popover Menu/
require('../src/Popover/docs/testStory');
require('../src/Modal/test/TestsStory'); //Tests/9. Modal
require('../src/TableToolbar/docs/ToolbarTestStory'); // Tests/10. Table
require('../src/Tag/docs/TagTestStory'); // Tests/12. Other/12.5 Tag
require('../src/Avatar/docs/AvatarTestStory'); // Tests/12. Other/12.6 Avatar
require('../src/Box/docs/testStory');
require('../src/Thumbnail/docs/testStory');
require('../src/EditableSelector/docs/testStory');
require('../src/Slider/docs/testStory'); // 4.7 Slider
require('../src/StatsWidget/docs/testStory'); // 2.7 StatsWidget
require('../src/SegmentedToggle/docs/testStory'); // 4.5 SegmentedToggle
require('../src/FloatingNotification/docs/FloatingNotificationTestStory'); // 8.2 FloatingNotification
require('../src/FormField/docs/testStory');
require('../src/DropdownLayout/docs/testStory');
require('../src/InputWithOptions/docs/testStory');
require('../src/ColorInput/docs/testStory');
require('../src/DateInput/test/testStories');

// DEPRECATED
require('./FieldWithSelectionComposite');
require('./Deprecated/RichTextArea/index.story');
require('./Deprecated/RichTextArea/testStory');

// The generated test component
require('../src/GeneratedTestComponent/docs/index.story');
require('../src/GeneratedTestComponent/test/GeneratedTestComponentStories');

require('../src/NoBorderInput/docs/index.story');
require('../src/EditableTitle/docs/index.story');

// TODO: move to correct position
require('../src/beta/PopoverMenu/docs/index.story');
