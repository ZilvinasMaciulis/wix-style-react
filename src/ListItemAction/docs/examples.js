export const simple = `
<div
  style={{
    width: '284px',
    height: '120px'
  }}
>
  <DropdownLayout
    visible
    options={[
      listItemActionBuilder({
        id: 0,
        title: 'option 1'
      }),
      listItemActionBuilder({
        id: 1,
        title: 'option 2',
      }),
      listItemActionBuilder({
        id: 1,
        title: 'option 3',
      }),
    ]}
/>
</div>
`;

export const prefix = `
<div
  style={{
    width: '284px',
    height: '120px'
  }}
>
  <DropdownLayout
    visible
    options={[
      listItemActionBuilder({
        id: 0,
        prefixIcon: <Icons.Edit />,
        title: 'option 1'
      }),
      listItemActionBuilder({
        id: 1,
        prefixIcon: <Icons.Edit />,
        title: 'option 2',
      }),
      listItemActionBuilder({
        id: 1,
        prefixIcon: <Icons.Edit />,
        title: 'option 3',
      }),
    ]}
/>
</div>
`;

export const skin = `
<div
  style={{
    width: '284px',
    height: '120px'
  }}
>
  <DropdownLayout
    visible
    options={[
      listItemActionBuilder({
        id: 0,
        title: 'standard'
      }),
      listItemActionBuilder({
        id: 1,
        skin: 'dark',
        title: 'dark',
      }),
      listItemActionBuilder({
        id: 2,
        skin:'destructive',
        title: 'destructive',
      }),
    ]}
/>
</div>
`;

export const size = `
<Layout>
 <Cell span={6}>
    <div
      style={{
        width: '200px',
        height: '120px'
      }}
    >
        <DropdownLayout
          visible
          options={[
            listItemActionBuilder({
              id: 0,
              size: 'small',
              prefixIcon: <Icons.Edit />,
              title: 'small'
            }),
            listItemActionBuilder({
              id: 1,
              size: 'small',
              prefixIcon: <Icons.Edit />,
              title: 'small',
            }),
            listItemActionBuilder({
              id: 2,
              size: 'small',
              prefixIcon: <Icons.Edit />,
              title: 'small',
            }),
          ]}
      />
    </div>
  </Cell>
  <Cell span={6}>
    <div
      style={{
        width: '200px',
        height: '120px'
      }}
    >
        <DropdownLayout
          visible
          options={[
            listItemActionBuilder({
              id: 0,
              size: 'medium',
              prefixIcon: <Icons.Edit />,
              title: 'medium'
            }),
            listItemActionBuilder({
              id: 1,
              size: 'medium',
              prefixIcon: <Icons.Edit />,
              title: 'medium',
            }),
            listItemActionBuilder({
              id: 2,
              size: 'medium',
              prefixIcon: <Icons.Edit />,
              title: 'medium',
            }),
          ]}
      />
    </div>
  </Cell>
</Layout>
`;

export const state = `
<div
  style={{
    width: '284px',
    height: '120px'
  }}
>
  <DropdownLayout
    visible
    options={[
      listItemActionBuilder({
        id: 0,
        title: 'disabled',
        prefixIcon: <Icons.Edit />,
        disabled: true,
      }),
      listItemActionBuilder({
        id: 1,
        title: 'disabled',
        prefixIcon: <Icons.Edit />,
        disabled: true,
      }),
      listItemActionBuilder({
        id: 2,
        title: 'disabled',
        prefixIcon: <Icons.Edit />,
        disabled: true,
      }),
    ]}
/>
</div>
`;

export const wrap = `
<div style={{ height: '240px' }}>
  <Layout>
  <Cell span={6}>
    <div
      style={{
        width: '200px',
        height: '120px'
      }}
    >
      <DropdownLayout
        visible
        options={[
          listItemActionBuilder({
            id: 0,
            as: "button",
            title: 'very long message very very',
          }),
          listItemActionBuilder({
            id: 1,
            as: "button",
            title: 'very long message very very',
          }),
          listItemActionBuilder({
            id: 1,
            as: "button",
            title: 'very long message very very',
          }),
        ]}
      />
    </div>
    </Cell>
    <Cell span={6}>
    <div
      style={{
        width: '200px',
        height: '120px'
      }}
    >
      <DropdownLayout
        visible
        options={[
          listItemActionBuilder({
            id: 0,
            as: "button",
            title: 'very long message very',
            wrapText: true,
          }),
          listItemActionBuilder({
            id: 1,
            as: "button",
            title: 'very long message very',
            wrapText: true,
          }),
          listItemActionBuilder({
            id: 1,
            as: "button",
            title: 'very long message very',
            wrapText: true,
          }),
        ]}
      />
    </div>
    </Cell>
  </Layout>
</div>
`;

export const as = `
<div
  style={{
    width: '284px',
    height: '120px'
  }}
>
  <DropdownLayout
    visible
    options={[
      listItemActionBuilder({
        id: 0,
        as: "button",
        title: 'option 1',
      }),
      listItemActionBuilder({
        id: 1,
        as: "button",
        title: 'option 2',
      }),
      listItemActionBuilder({
        id: 2,
        as: "button",
        title: 'option 3',
      }),
    ]}
/>
</div>
`;
