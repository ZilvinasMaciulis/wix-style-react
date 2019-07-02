    # Stepper Testkits

## Stepper TestKit API

| method             | returned value     | description                                               |
| -----------------  | ------------------ | --------------------------------------------------------- |
| exists()                   | `Promise<boolean>` | Returns true if element is in the DOM                      |
| clickStep(id)          | `Promise<void>` | Click step by id                                   |
| hoverStep(id)               | `Promise<void>`    | Hover step by id |
| getNumberOfSteps()                 | `Promise<number>` | Returns the number of rendered steps |
| isStepActive(id)              | `Promise<boolean>`  | Returns whether the step by id is active or not                                    |
| getStepType(id)              | `Promise<string>`  | Returns the type of step by id                                    |

## ReactTestUtils Example

```javascript
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import Stepper from 'wix-style-react/Stepper';
import { StepperTestkitFactory } from 'wix-style-react/dist/testkit';

const div = document.createElement('div');
const dataHook = 'myDataHook';

const component = (
  <div>
    <Stepper dataHook={dataHook} />
  </div>
);

const wrapper = div.appendChild(
  ReactTestUtils.renderIntoDocument(component, { dataHook })
);

const testkit = StepperTestkitFactory({ wrapper, dataHook });

//Do tests
describe('Element should exist', async () => {
  expect(await testkit.exists()).toBeTruthy();
});
```

## Enzyme Example

```javascript
import React from 'react';
import { mount } from 'enzyme';
import Stepper from 'wix-style-react/Stepper';
import { StepperTestkitFactory } from 'wix-style-react/dist/testkit/enzyme';

const dataHook = 'myDataHook';
const wrapper = mount(
  <div>
    <Stepper dataHook={dataHook} />
  </div>
);

const testkit = StepperTestkitFactory({ wrapper, dataHook });

//Do tests
describe('Element should exist', async () => {
  expect(await testkit.exists()).toBeTruthy();
});
```

## Puppeteer Example

> Element should be rendered with a data-hook into the DOM `<Stepper dataHook="myDataHook" />`

```javascript
import puppeteer from 'puppeteer';
import { StepperTestkitFactory } from 'wix-style-react/dist/testkit/puppeteer';

//puppeteer setup
const browser = await puppeteer.launch();
const page = await browser.newPage();

//Create an element testkit via the data-hook attribute
const testkit = await StepperTestkitFactory({
  dataHook: 'myDataHook',
  page,
});
await page.goto('/page-where-stepper-appears'); //Your application url

//Do tests
describe('Element should exist', async () => {
  expect(await testkit.exists()).toBeTruthy();
});
```

## Protractor Example

> Element should be rendered with a data-hook into the DOM `<Stepper dataHook="myDataHook" />`

```javascript
import { StepperTestkitFactory } from 'wix-style-react/dist/testkit/protractor';

//Create an element testkit via the data-hook attribute
const testkit = StepperTestkitFactory({ dataHook: 'myDataHook' });

await browser.get('/page-where-stepper-appears'); //Your application url

//Do tests
describe('Element should exist', async () => {
  expect(await testkit.exists()).toBeTruthy();
});
```
