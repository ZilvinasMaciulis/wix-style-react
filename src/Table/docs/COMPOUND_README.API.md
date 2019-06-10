### `<Table.Content/>`

You can render `<Table.Content/>` anywhere inside a `<Table/>` (not necessarily as a direct child).

#### Props

| propName        | propType | defaultValue | isRequired | description                                                                     |
| --------------- | -------- | ------------ | ---------- | ------------------------------------------------------------------------------- |
| titleBarVisible | boolean  | true         | false      | Whether to display the title bar (the row with the names of the columns) or not |

### `<Table.ToolbarContainer/>`

The `<ToolbarContainer/>` is a consumer of the Table's SelectionContext (React 16 context API). Which means it expects to receive a single child as a function. That function receives the following SelectionContext object as an argument.

#### Props

| propName | propType | defaultValue | isRequired | description                 |
| -------- | -------- | ------------ | ---------- | --------------------------- |
| children | any      |              | false      | A container for the toolbar |

### `<Table.Titlebar/>`

The `<Table/>` title bar (or "header"). Can be useful when setting `titleBarVisible` to `false`, so
you can render the title bar independently. See the "Table in a Page" example for example usage.

### `<Table.EmptyState/>`

An `<EmptyState>` for usage within a table. See the "Table in a Page" example for example usage.

#### Props

Accepts the same props as `<EmptyState/>`. See the API tab in the `<EmptyState/>` story for a full
list of valid props.
