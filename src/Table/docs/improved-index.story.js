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

import { Table } from '..';
import { storySettings } from './storySettings';
import { baseScope } from '../../../stories/utils/LiveCodeExample';
import { Category } from '../../../stories/storiesHierarchy';
import compoundReadmeApi from './COMPOUND_README.API.md';
import contextReadmeApi from './CONTEXT_README.API.md';
import testkitReadme from './README.TESTKIT.md';

import TableExampleRaw from '!raw-loader!./examples/TableExample';
import TableToolbarExampleRaw from '!raw-loader!./examples/TableToolbarExample';

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
3. \`<Table.TitleBar/>\` -  the header of the table, which means, a row with the names of the columns. By default, \`<Table.Content/>\` is rendered with the header. It's mostly useful when setting \`titleBarVisible\` to false, so we can render the title bar independently
4. \`<Table.EmptyState/>\` - a wrapper of the \`<EmptyState/>\` component for usage within the table
`;

export default {
  category: Category.WIP,
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
                'This is a basic table that implements a toolbar using `<Table.ToolbarContainer/>` - which receives the SelectionContext (`showSelection` is true in order to enable the selection). Notice that the whole table is wrapped by `<Card/>` so that the toolbar seems like part of the table. In addition, we render the main toolbar when there is no selected rows, and an actions toolbar when some rows are selected.',
              source: TableToolbarExampleRaw,
              compact: true,
            },
          ].map(code),
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
