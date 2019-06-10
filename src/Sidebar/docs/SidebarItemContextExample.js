/* eslint-disable */
class SidebarItemContextExample extends React.Component {
  render() {
    return (
      <div style={{ height: '500px', color: 'white' }}>
        <Sidebar selectedKey={'item1'}>
          <Sidebar.Item itemKey={'item1'}>
            <div>Item 1</div>
          </Sidebar.Item>

          <Sidebar.Item itemKey={'item2'}>
            <SidebarItemContextConsumer>
              {({ selected }) => (
                <div>item2 is {!selected() && 'not'} selected</div>
              )}
            </SidebarItemContextConsumer>
          </Sidebar.Item>
        </Sidebar>
      </div>
    );
  }
}
