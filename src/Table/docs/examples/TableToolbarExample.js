/* eslint-disable */

class TableToolbarExample extends React.Component {
  state = {
    data: [
      { firstName: 'Meghan', lastName: 'Bishop' },
      { firstName: 'Sara', lastName: 'Porter' },
      { firstName: 'Deborah', lastName: 'Rhodes' },
      { firstName: 'Walter', lastName: 'Jenning' },
    ],
  };

  render() {
    return (
      <Card>
        <Table
          data={this.state.data}
          columns={[
            { title: 'First', render: row => row.firstName },
            { title: 'Last', render: row => row.lastName },
          ]}
          showSelection
        >
          <Table.ToolbarContainer>
            {selectionContext =>
              selectionContext.selectedCount === 0
                ? this._renderMainToolbar()
                : this._renderActionsToolbar({ ...selectionContext })
            }
          </Table.ToolbarContainer>
          <Table.Content />
        </Table>
      </Card>
    );
  }

  _renderMainToolbar = () => {
    const collectionOptions = [
      { id: 0, value: 'All Products' },
      { id: 1, value: 'Towels' },
      { id: 2, value: 'Slippers' },
    ];
    const filterOptions = [
      { id: 0, value: 'All' },
      { id: 1, value: 'Red' },
      { id: 2, value: 'Cyan' },
    ];

    return (
      <TableToolbar>
        <TableToolbar.ItemGroup position="start">
          <TableToolbar.Item>
            <TableToolbar.Title>My Table</TableToolbar.Title>
          </TableToolbar.Item>
          <TableToolbar.Item>
            <TableToolbar.Label>
              Collection
              <span style={{ width: '150px' }}>
                <Dropdown options={collectionOptions} selectedId={0} roundInput />
              </span>
            </TableToolbar.Label>
          </TableToolbar.Item>
          <TableToolbar.Item>
            <TableToolbar.Label>
              Filter By
              <span style={{ width: '86px' }}>
                <Dropdown options={filterOptions} selectedId={0} roundInput />
              </span>
            </TableToolbar.Label>
          </TableToolbar.Item>
        </TableToolbar.ItemGroup>
        <TableToolbar.ItemGroup position="end">
          <TableToolbar.Item>
            <Search />
          </TableToolbar.Item>
        </TableToolbar.ItemGroup>
      </TableToolbar>
    );
  };

  _renderActionsToolbar = ({ selectedCount, getSelectedIds }) => (
    <TableToolbar>
      <TableToolbar.ItemGroup position="start">
        <TableToolbar.Item>
          <TableToolbar.SelectedCount>{`${selectedCount} Selected`}</TableToolbar.SelectedCount>
        </TableToolbar.Item>
      </TableToolbar.ItemGroup>
      <TableToolbar.ItemGroup position="end">
        <TableToolbar.Item layout="button">
          <Button
            skin="light"
            prefixIcon={<Icons.Upload />}
            onClick={() => window.alert(`Exporting selectedIds=${getSelectedIds()}`)}
          >
            Export
          </Button>
        </TableToolbar.Item>
        <TableToolbar.Item layout="button">
          <Button
            skin="light"
            prefixIcon={<Icons.Duplicate />}
            onClick={() => window.alert(`Duplicating selectedIds=${getSelectedIds()}`)}
          >
            Duplicate
          </Button>
        </TableToolbar.Item>
        <TableToolbar.Item layout="button">
          <Button
            skin="light"
            prefixIcon={<Icons.Edit />}
            onClick={() => window.alert(`Editing selectedIds=${props.getSelectedIds()}`)}
          >
            Edit
          </Button>
        </TableToolbar.Item>
        <TableToolbar.Divider />
        <TableToolbar.Item>
          <Search expandable />
        </TableToolbar.Item>
      </TableToolbar.ItemGroup>
    </TableToolbar>
  );
}
