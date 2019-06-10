## Enzyme/ReactTestUtils TestKit API

| method                         | arguments            | returned value | description                                                      |
| ------------------------------ | -------------------- | -------------- | ---------------------------------------------------------------- |
| getRowsCount                   | -                    | number         | num of rows                                                      |
| getRowsWithClassCount          | string               | number         | num of rows with <arg> class name                                |
| getRowText                     | number               | string         | get row index <arg> text                                         |
| getRowClasses                  | number               | string         | get row index <arg> classes                                      |
| getHeaderCellStyle             | number               | string         | get header cell index <arg> inline style                         |
| getCellStyle                   | (rowIndex, colIndex) | string         | get cell index <args> inline style                               |
| isRowClickable                 | number               | bool           | true if row index <arg> is clickable                             |
| getTitles                      | -                    | map            | get map of all titles                                            |
| isDisplayingNothing            | -                    | bool           | true if the table has no data and the header is not displayed    |
| isDisplayingHeaderOnly         | -                    | bool           | true if displaying only headers                                  |
| hasChildWithId                 | string               | bool           | true if the element has a child with <arg> id                    |
| isDisplayingHeader             | -                    | bool           | true if the element is displaying it's headers                   |
| clickRow                       | (number, eventData)  | -              | click with <eventData> the row index <number>                    |
| mouseEnterRow                  | (number, eventData)  | -              | mouse enter with <eventData> the row index <number>              |
| mouseLeaveRow                  | (number, eventData)  | -              | mouse leave with <eventData> the row index <number>              |
| setProps                       | json                 | element        | returns a clone of this element with the new props from the json |
| hasRowDetails                  | string               | bool           | true if row index has details                                    |
| getRowDetailsText              | string               | string         | returns details text                                             |
| hasSortableTitle               | (index)              | bool           | true if column title is sortable                                 |
| hasSortDescending              | (index)              | bool           | true if column title has sort descending style                   |
| clickSort                      | (index, eventData)   | -              | click with <eventData> the column index <number>                 |
| getRowDetails                  | string               | element        | returns row details by row index                                 |
| getRowCheckboxDriver           | index: number        | CheckboxDriver | Get driver of row selection checbox by row index                 |
| getBulkSelectionCheckboxDriver | -                    | CheckboxDriver | Get driver of row bulk-selection checbox                         |
| clickRowChecbox                | index                | -              | Click the row selection checkbox                                 |
| clickBulkSelectionCheckbox     | -                    | -              | Click the bulk-selection checkbox                                |
| isRowSelected                  | index : number       | boolean        | Is row selected by index                                         |
| getBulkSelectionState          | -                    | string         | Get bulk seleciton state. Possible value 'ALL', 'SOME', 'NONE.   |
| getTitlebar                    | -                    | element        | Get title-bar (column titles)                                    |

## Protractor TestKit API

| method            | arguments | returned value | description                         |
| ----------------- | --------- | -------------- | ----------------------------------- |
| clickRowByIndex   | number    | -              | click row index <number>            |
| getRowTextByIndex | number    | string         | get row index <number> text         |
| element           | -         | element        | get the actual element              |
| hoverRow          | (index)   | element        | Hover a specific row with the mouse |

## Usage Example

> Unit Testing Example

```javascript
  import React from 'react';
  import {tableTestkitFactory} from 'wix-style-react/dist/testkit';
  import {tableTestkitFactory as enzymeTableTestkitFactory} from 'wix-style-react/dist/testkit/enzyme';

  /***************
   enzyme example
  ***************/

  const dataHook = 'myDataHook';
  const wrapper = mount(<div/><Table {...props} dataHook={dataHook}/></div>);
  const testkit = enzymeTableTestkitFactory({wrapper, dataHook});

  //Do tests
  expect(testkit.getRowsCount()).toBe(5);

  /**********************
   ReactTestUtils example
  **********************/

  const div = document.createElement('div');
  const dataHook = 'myDataHook';
  const wrapper = div.appendChild(
    ReactTestUtils.renderIntoDocument(<div/><Table {...props} dataHook={dataHook}/></div>, {dataHook})
  );
  const testkit = tableTestkitFactory({wrapper, dataHook});

  //Do tests
  expect(testkit.getRowsCount()).toBe(5);
```

> Unit Testing Example - Table in Page

```javascript
import React from 'react';
import { tableTestkitFactory } from 'wix-style-react/dist/testkit';
/***************
 enzyme example
***************/

const dataHook = 'myDataHook';
const wrapper = mount(
  <Table withWrapper={false} data={tableData} showSelection>
    <Page>
      <Page.Header title="My Table Title" />
      <Page.FixedContent>
        <Card>
          <Table.ToolbarContainer />
          <Table.Titlebar dataHook="test-table-titlebar" />
        </Card>
      </Page.FixedContent>
      <Page.Content>
        <Card>
          <Table.Content titleBarVisible={false} dataHook="test-table-content" />
        </Card>
      </Page.Content>
    </Page>
  </Table>
);

const titlebarDriver = enzymeTableTestkitFactory({
  wrapper,
  dataHook: 'test-table-titlebar'
});

const contentDriver = enzymeTableTestkitFactory({
  wrapper,
  dataHook: 'test-table-content'
});

//Do tests
expect(titlebarDriver.getBulkSelectionCheckboxDriver().isChecked()).toBeTruthy();
expect(contentDriver.getRowsCount()).toBe(defaultProps.data.length);
expect(contentDriver.isRowSelected(0)).toBeTruthy();
```

> E2E example

```javascript
//Element should be rendered with a data-hook into the DOM
<Table dataHook="myDataHook" />;

/**********************
   Protractor example
  **********************/

import { tableTestkitFactory, waitForVisibilityOf } from 'wix-style-react/dist/testkit/protractor';

//Create an element testkit via the data-hook attribute
const testkit = tableTestkitFactory({ dataHook: 'myDataHook' });

describe('Table', () => {
  it('should be displayed', async () => {
    await browser.get(appUrl); //Your application url
    await waitForVisibilityOf(testkit.element(), 'Cannot find Table');
    expect(await testkit.element().isPresent()).toBeTruthy();
  });
});
```

```javascript
/*******************
   Puppeteer example
  *******************/

import puppeteer from 'puppeteer';
import { tableTestkitFactory } from 'wix-style-react/dist/testkit/puppeteer';

//puppeteer setup
const browser = await puppeteer.launch();
const page = await browser.newPage();

//Create an element testkit via the data-hook attribute
const testkit = await tableTestkitFactory({ dataHook: 'myDataHook', page });
await page.goto(appUrl); //Your application url

expect(await testkit.getCellValue(2, 3)).to.equal('my test');
```
