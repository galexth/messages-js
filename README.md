# Getting Started

`npm install`

`npm start`

### Table view settings:

```js
const config = {
  title: "title",
  headers: {
    title: "Title",
    sessions: "Sessions",
    users: "Users",
    phones: "Phones",
    leads: "Leads",
  },
};

const data = [
    ...,
    {
        title: 'some title',
        sessions: 522,
        users: 471,
        phones: 4,
        leads: 4,
        childs: [
            ...,
            {
                title: 'some title',
                sessions: 522,
                users: 471,
                phones: 4,
                leads: 4,
                childs: [...]
            }
        ]
    }
];
```

```jsx
<Table items={data} config={config} />
```

### List view settings:

```js
const config = {
  title: "title",
};

const data = [
    ...,
    {
        title: 'some title',
        childs: [...]
    }
];
```

```jsx
<List items={data} config={config} />
```
