import autoExampleDriver from 'wix-storybook-utils/AutoExampleDriver';
import { eyesItInstance } from '../../test/utils/eyes-it';
import { multiSelectTestkitFactory } from '../../testkit/protractor';
import { $, browser } from 'protractor';
import {
  isFocused,
  mouseEnter,
  waitForVisibilityOf,
} from 'wix-ui-test-utils/protractor';
import {
  createStoryUrl,
  createTestStoryUrl,
} from '../../test/utils/storybook-helpers';
import { storySettings, testStories } from './docs/storySettings';

describe('MultiSelect', () => {
  describe('AutoExample', () => {
    const eyes = eyesItInstance({});

    const driver = multiSelectTestkitFactory({
      dataHook: storySettings.dataHook,
    });

    const getUrl = ({ rtl }) =>
      createStoryUrl({
        kind: storySettings.category,
        story: storySettings.storyName,
        withExamples: false,
        rtl,
      });

    function runDirectionRelatedTests() {
      eyes.it('should show 2 tags', async () => {
        await driver.click();
        await driver.selectItemById('AL');
        await driver.selectItemById('AZ');
      });
    }

    afterEach(() => {
      return autoExampleDriver.remount();
    });

    describe('LTR', () => {
      beforeAll(async () => {
        await browser.get(getUrl({ rtl: false }));
        const element = driver.element();
        await waitForVisibilityOf(element, 'Cannot find <MultiSelect/>');
      });

      runDirectionRelatedTests();

      eyes.it(
        'should show focus style + hover (focused by keyboard)',
        async () => {
          const element = driver.element();
          driver.click();
          await eyes.checkWindow('focused by keyboard (not hovered)');
          await mouseEnter(element);
        },
      );

      eyes.it('should show hover style with tag', async () => {
        const element = driver.element();
        await mouseEnter(element);
        await eyes.checkWindow('hover only');
        await driver.addTag();
        await mouseEnter(element);
      });
    });

    describe('RTL', () => {
      beforeAll(async () => {
        await browser.get(getUrl({ rtl: true }));
        const element = driver.element();
        await waitForVisibilityOf(element, 'Cannot find <MultiSelect/>');
      });

      runDirectionRelatedTests();
    });
  });

  describe('Test Page', () => {
    const eyes = eyesItInstance();

    eyes.it('should break to new line when needed', async () => {
      const url = createTestStoryUrl({
        category: storySettings.category,
        storyName: storySettings.storyName,
        testName: '1. With maxNumRows',
      });
      await browser.get(url);
      const driver = multiSelectTestkitFactory({
        dataHook: 'multi-select-limited',
      });
      await waitForVisibilityOf(driver.element(), 'Cannot find <MultiSelect/>');
      const height = await driver.getHeight();

      const ELEMENT_HEIGHT_MULTILINE = 70;
      expect(height).toBe(ELEMENT_HEIGHT_MULTILINE);
    });

    eyes.it('should show hover style (when Reorderable)', async () => {
      const url = createTestStoryUrl({
        category: storySettings.category,
        storyName: storySettings.storyName,
        testName: '2. Reorderable',
      });
      await browser.get(url);
      const driver = multiSelectTestkitFactory({
        dataHook: 'multi-select-reorderable',
      });
      const element = driver.element();
      await waitForVisibilityOf(element, 'Cannot find <MultiSelect/>');
      await mouseEnter(element);
      await eyes.checkWindow('hover only (not tag)');
      await driver.addTag();
      await mouseEnter(element);
    });

    eyes.it('should render MultiSelect with "select" mode ', async () => {
      const url = createTestStoryUrl({
        category: storySettings.category,
        storyName: storySettings.storyName,
        testName: testStories.selectMode,
      });
      await browser.get(url);
      const driver = multiSelectTestkitFactory({
        dataHook: 'multi-select-mode',
      });
      const element = driver.element();
      await waitForVisibilityOf(element, 'Cannot find <MultiSelect/>');
    });

    eyes.it('should fill input with tags without breaking a line', async () => {
      const url = createTestStoryUrl({
        category: storySettings.category,
        storyName: storySettings.storyName,
        testName: testStories.lineNotBraking,
      });
      await browser.get(url);
      const driver = multiSelectTestkitFactory({
        dataHook: storySettings.dataHook,
      });
      const element = driver.element();
      await waitForVisibilityOf(element, 'Cannot find <MultiSelect/>');
    });

    eyes.it('should render disabled MultiSelect', async () => {
      const url = createTestStoryUrl({
        category: storySettings.category,
        storyName: storySettings.storyName,
        testName: testStories.disabled,
      });
      await browser.get(url);
      const driver = multiSelectTestkitFactory({
        dataHook: 'disabled-multiselect',
      });
      const element = driver.element();
      await waitForVisibilityOf(element, 'Cannot find <MultiSelect/>');
    });
  });
});

describe('MultiSelect - Focus behaviour', () => {
  let driver;

  const storyUrl = createTestStoryUrl({
    category: storySettings.category,
    storyName: storySettings.storyName,
    testName: testStories.tabsSwitches,
  });

  beforeEach(async () => {
    browser.get(storyUrl);

    driver = multiSelectTestkitFactory({
      dataHook: 'multiselect-tabs-switches-test',
    });

    await waitForVisibilityOf(
      driver.element(),
      'Cant find muiltiselect-tabs-switches-test',
    );
  });

  const pressTab = () =>
    browser
      .actions()
      .sendKeys(protractor.Key.TAB)
      .perform();

  async function focusOnMultiSelect() {
    const firstElement = $(`[data-hook="input-for-focus-1"]`);
    await pressTab();
    expect(await isFocused(firstElement)).toEqual(true);

    await pressTab();
    expect(await driver.isFocused()).toEqual(true);
  }

  it('should move out focus of multiselect only after 2 tab press when selecting an item', async () => {
    await focusOnMultiSelect();

    await driver.click();
    await driver.hoverItemById('AL');
    await pressTab();
    expect(await driver.isFocused()).toEqual(true);
    expect(await driver.isOptionsShown()).toEqual(true);

    await pressTab();
    expect(await driver.isFocused()).toEqual(false);
    expect(await driver.isOptionsShown()).toEqual(false);
  });

  it('should move out focus of multiselect when pressing tab without any selection', async () => {
    await focusOnMultiSelect();
    //await browser.sleep(200000);
    await pressTab();
    expect(await driver.isFocused()).toEqual(false);
    expect(await driver.isOptionsShown()).toEqual(false);
  });
});
