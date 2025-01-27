    # PopoverMenu Testkits

## PopoverMenu TestKit API

| method            | arguments | returned value     | description                                               |
| ----------------- | --------- | ------------------ | --------------------------------------------------------- |
| exists            | -         | `Promise<boolean>` | return true if element is in the DOM                      |
| getTriggerElement | -         | `Promise<element>` | Returns trigger element                                   |
| clickAtChild      | -         | `Promise<void>`    | Select a specific option (requires the menu to be opened) |
| isMenuOpen        | -         | `Promise<boolean>` | Return true if the menu is opened, otherwise return false |
| childrenCount     | -         | `Promise<number>`  | Returns children count                                    |

## ReactTestUtils Example

```javascript
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import PopoverMenu from 'wix-style-react/beta/PopoverMenu';
import { PopoverMenuTestkit } from 'wix-style-react/dist/beta/testkit';

const div = document.createElement('div');
const dataHook = 'myDataHook';

const component = (
  <div>
    <PopoverMenu dataHook={dataHook} />
  </div>
);

const wrapper = div.appendChild(
  ReactTestUtils.renderIntoDocument(component, { dataHook })
);

const testkit = PopoverMenuTestkit({ wrapper, dataHook });

//Do tests
describe('Element should exist', async () => {
  expect(await testkit.exists()).toBeTruthy();
});
```

## Enzyme Example

```javascript
import React from 'react';
import { mount } from 'enzyme';
import PopoverMenu from 'wix-style-react/beta/PopoverMenu';
import { PopoverMenuTestkit } from 'wix-style-react/dist/beta/testkit/enzyme';

const dataHook = 'myDataHook';
const wrapper = mount(
  <div>
    <PopoverMenu dataHook={dataHook} />
  </div>
);

const testkit = PopoverMenuTestkit({ wrapper, dataHook });

//Do tests
describe('Element should exist', async () => {
  expect(await testkit.exists()).toBeTruthy();
});
```

## Puppeteer Example

> Element should be rendered with a data-hook into the DOM `<PopoverMenu dataHook="myDataHook" />`

```javascript
import puppeteer from 'puppeteer';
import { PopoverMenuTestkit } from 'wix-style-react/dist/beta/testkit/puppeteer';

//puppeteer setup
const browser = await puppeteer.launch();
const page = await browser.newPage();

//Create an element testkit via the data-hook attribute
const testkit = await PopoverMenuTestkit({
  dataHook: 'myDataHook',
  page,
});
await page.goto('/page-where-popovermenu-appears'); //Your application url

//Do tests
describe('Element should exist', async () => {
  expect(await testkit.exists()).toBeTruthy();
});
```

## Protractor Example

> Element should be rendered with a data-hook into the DOM `<PopoverMenu dataHook="myDataHook" />`

```javascript
import { PopoverMenuTestkit } from 'wix-style-react/dist/beta/testkit/protractor';

//Create an element testkit via the data-hook attribute
const testkit = PopoverMenuTestkit({ dataHook: 'myDataHook' });

await browser.get('/page-where-popovermenu-appears'); //Your application url

//Do tests
describe('Element should exist', async () => {
  expect(await testkit.exists()).toBeTruthy();
});
```
