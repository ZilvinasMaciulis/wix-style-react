import React from 'react';
import {
  tabs,
  tab,
  api,
  divider,
  header,
  title,
  code as baseCode,
  importExample,
  playground,
  testkit,
  description,
} from 'wix-storybook-utils/Sections';
import SectionHelper from 'wix-style-react/SectionHelper';
import { Layout, Cell } from 'wix-style-react/Layout';

import { Table } from '..';
import { storySettings } from './storySettings';
import { baseScope } from '../../../stories/utils/LiveCodeExample';
import compoundReadmeApi from './COMPOUND_README.API.md';
import contextReadmeApi from './CONTEXT_README.API.md';
import testkitReadme from './README.TESTKIT.md';

import TableExampleRaw from '!raw-loader!./examples/TableExample';
import TableToolbarExampleRaw from '!raw-loader!./examples/TableToolbarExample';
import TableEmptyStateExampleRaw from '!raw-loader!./examples/TableEmptyStateExample';
import TableActionCellExampleRaw from '!raw-loader!./examples/TableActionCellExample';
import TablePageExampleRaw from '!raw-loader!./examples/TablePageExample';
import TableInfiniteScrollExampleRaw from '!raw-loader!./examples/TableInfiniteScrollExample';
import TableHighlightedRowsExampleRaw from '!raw-loader!./examples/TableHighlightedRowsExample';
import TableAlignedColumnsExampleRaw from '!raw-loader!./examples/TableAlignedColumnsExample';
import TableVirtualizationExampleRaw from '!raw-loader!./examples/TableVirtualizationExample';

const code = config =>
  baseCode({
    components: baseScope,
    ...config,
  });

const data = [
  { firstName: 'Meghan', lastName: 'Bishop' },
  { firstName: 'Sara', lastName: 'Porter' },
  { firstName: 'Deborah', lastName: 'Rhodes' },
  { firstName: 'Walter', lastName: 'Jenning' },
];

const dataLong = [1, 2, 3, 4, 5].reduce(accum => accum.concat(data), []);

const columnsOption1 = [
  { title: 'First', width: '30%', render: row => row.firstName },
  { title: 'Last', width: '30%', render: row => row.lastName },
];

const columnsOption2 = [
  { title: 'Row Num', render: (row, rowNum) => rowNum },
  { title: 'First', render: row => row.firstName },
  { title: 'Last', render: row => row.lastName },
  { title: 'Full', render: row => row.firstName + row.lastName },
];

const componentExplanation = `
Technically, the following optional children are accepted:

1. \`<Table.Content/>\` - the actual content
2. \`<Table.ToolbarContainer/>\` - a container for the toolbar. It's also a consumer of the SelectionContext (see Context API)
3. \`<Table.Titlebar/>\` -  the header of the table, which means, a row with the names of the columns. By default, \`<Table.Content/>\` is rendered with the header. It's mostly useful when setting \`titleBarVisible\` to false, so we can render the title bar independently
4. \`<Table.EmptyState/>\` - a wrapper of the \`<EmptyState/>\` component for usage within the table
`;

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,

  component: Table,
  componentPath: '..',

  componentProps: {
    dataHook: storySettings.dataHook,
    id: 'id',
    data,
    columns: columnsOption1,
    showSelection: true,
  },

  exampleProps: {
    columns: [
      { label: '2 columns example', value: columnsOption1 },
      { label: '4 columns example', value: columnsOption2 },
    ],
    data: [
      { label: '4 rows', value: data },
      { label: '40 rows', value: dataLong },
    ],
  },

  sections: [
    header({
      issueUrl: 'https://github.com/wix/wix-style-react/issues/new',
      sourceUrl: 'https://github.com/wix/wix-style-react/tree/master/src/Table',
      component: (
        <Layout>
          <Cell span={6}>
            <SectionHelper appearance="danger">
              If you're still using `{`<DateTable/>`}, we advice you to use `
              {`<Table />`}` instead - which accepts the same API with
              additional capabilities.
            </SectionHelper>
          </Cell>
        </Layout>
      ),
    }),

    tabs([
      tab({
        title: 'Description',
        sections: [
          description({
            title: 'Description',
            text:
              'Table is a component for displaying data in structure of rows and columns. It might be included within `<Card/>` or `<Page/>` and supports a custom toolbar, sorting, infinite scrolling, virtualization and even more.',
          }),

          description(componentExplanation),

          importExample("import Table from 'wix-style-react/Table';"),

          divider(),

          title('Examples'),

          ...[
            {
              title: 'Plain Example',
              description: 'A basic table with data.',
              source: TableExampleRaw,
              compact: true,
            },
            {
              title: 'Table with Toolbar',
              description:
                'This is a basic table that implements a toolbar using `<Table.ToolbarContainer/>` - which receives the SelectionContext (`showSelection` is true in order to enable the selection). Notice that the whole table is wrapped by `<Card/>` so that the toolbar seems like part of the table. In addition, we render the main toolbar when there are no selected rows, and an actions toolbar when some rows are selected.',
              source: TableToolbarExampleRaw,
              compact: true,
            },
            {
              title: 'Table with EmptyState',
              description:
                'This example shows the usage for displaying an empty state message. Notice that `<Card/>` and `<TableToolbar/>` are optional - we should use them as necessary.',
              source: TableEmptyStateExampleRaw,
              compact: true,
            },
            {
              title: 'Table with ActionCell',
              description:
                'This example demonstrates how to render `<TableActionCell/>` in a column. The primary actions are rendered as buttons, whereas the secondary actions are rendered as icons. In case we use `numOfVisibleSecondaryActions`, the hidden icons would appear inside a popover menu.',
              source: TableActionCellExampleRaw,
              compact: true,
            },
            {
              title: 'Table in Page',
              description:
                'This example demonstrates how to render a table with sticky title and toolbar within `<Page/>`. Notice that `<Page/>` is practically responsible to render the title, using `<Page.Header/>` whereas `titleBarVisible` is false. Moreover, we use `<Page.Sticky/>` in order to stick the toolbar to top while scrolling.',
              source: TablePageExampleRaw,
              compact: true,
            },
            {
              title: 'Table with Infinite Scroll',
              description:
                'As opposed to pagination - infinite scroll means that new pages are loaded automatically, when the scrollbar reaches to the end (assuming there is more data to load). The `infiniteScroll` prop instructs the table to not render all data on startup, but rather gradually. Notice that the infinite scroll should listen to some scroll events (in order to determine when to render new items). In this example, we pass a container with limited height - but it could be any element that triggers scroll events.',
              source: TableInfiniteScrollExampleRaw,
              compact: true,
            },
            {
              title: 'Table with Highlighted Rows',
              description:
                'This example demonstrates how to highlight rows according to some logic.',
              source: TableHighlightedRowsExampleRaw,
              compact: true,
            },
            {
              title: 'Table with Aligned Columns',
              description:
                'This example demonstrates how to align the cells horizontally and vertically. Each column accepts `align` prop that aligns the text of the cells within this column horizontally. In case we want to align vertically - it should be done within the `render` method explicitly. Notice that we also define a width for the columns, which is optional.',
              source: TableAlignedColumnsExampleRaw,
              compact: true,
            },
          ].map(code),

          divider(),

          title('Table with Virtualization - Experimental'),

          tabs([
            tab({
              title: 'Description',
              sections: [
                description(
                  "Virtualization is a technique to optimize the performance when it comes in a large collection of items. In practice it means we render a limited number of items at a time - when we scroll, the appropriate hidden items are added to the DOM whereas the irrelevant items are removed from the DOM. Also, it implements infinite scroll behavior by default, so we don't need to use `infiniteScroll`, `hasMore`, `loadMore` and so on. Notice that when using the `virtualized` prop, we must define `width` for the columns and provide the `virtualizedLineHeight` and `virtualizedTableHeight` props. In addition, `titleBarVisible` must be false (because a title bar is appended automatically).",
                ),
              ],
            }),
            tab({
              title: 'Example',
              sections: [
                ...[
                  {
                    source: TableVirtualizationExampleRaw,
                    compact: true,
                  },
                ].map(code),
              ],
            }),
          ]),
        ],
      }),

      ...[
        { title: 'Table API', sections: [api()] },
        {
          title: 'Compound Components API',
          sections: [description(compoundReadmeApi)],
        },
        { title: 'Context API', sections: [description(contextReadmeApi)] },
        { title: 'Playground', sections: [playground()] },
        { title: 'Testkit', sections: [testkit(), description(testkitReadme)] },
      ].map(tab),
    ]),
  ],
};
