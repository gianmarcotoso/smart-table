# Smart Table

Smart Table is a simple table component for React.

## Installation

```bash
npm install @polaritybit/smart-table
```

## Usage

The `SmartTable` component renders a table of `items`, using user-specified `columns` to show values.

### Define columns

Defining columns is as simple as defining an array of objects. Each object represents a column on the table, and have the following properties:

-   `key`: The key of the column. It can be a property of an object within the `items` array, or any other value of your choice;
-   `title`: The title of the column;
-   `getValue`: a function that receives the `item` for the row that is being rendered and returns what to render within the column. If `getValue` is not specified, the value of the `key` property will be used, if present;
-   `getSortProperty`: A sort _predicate_ that tells the component how to sort the column. The column will be sortable only if this value is present. Read more about sorting in the [sorting](#sorting) section below;
-   `width`: The fixed width of the column. If not specified, the column will be auto-sized;
-   `headerClassName`: A class name to be applied to the column header;
-   `cellClassName`: A class name to be applied to the column cells;
-   `renderHeader`: A function that receives the `column` object and returns what to render within the column header. If not specified, the `title` property will be used;
-   `value`: A value to be used as the column value, if you want to show static values within the column; if it's not specified and `getValue` is not specified either, the value of the `key` property will be used, if present;

```jsx
const items = [
	{ id: 1, name: 'Billy', age: 21, foods: ['Chicken', 'Tuna', 'Tomatoes'] },
	{ id: 2, name: 'John', age: 32, foods: ['Beef', 'Pork', 'Potatoes'] },
	{ id: 3, name: 'Mary', age: 25, foods: ['Fish', 'Rice'] },
]

const columns = [
	{ key: 'id', title: 'ID' },
	{ key: 'name', title: 'Name', getValue: (item) => <strong>{item.name}</strong> },
	{ key: 'age', title: 'Age', getSortProperty: 'age' },
	{ key: 'foods', title: 'Favorite Foods', getValue: (item) => item.foods.join(', ') },
]
```

### Render the table

```jsx
<SmartTable items={items} columns={columns} getItemKey={(item) => item.id} />
```

When rendering a table, you need to specify the `items` that you want to render, the `columns` for the table and a `getItemKey` function that tells the Smart Table how to get the key of each item. The `getItemKey` function receives the `item` as a parameter and should return a unique value for each item.

The full list of props is:

-   `items`: The items to be rendered;
-   `columns`: The columns to be used;
-   `getItemKey`: A function that receives an `item` and returns a unique value for it;
-   `tableClassName`: A class name to be applied to the table;
-   `rowClassName`: A class name to be applied to the table rows;
-   `commonCellClassName`: A class name to be applied to all cells (excluding header cells);
-   `headerRowClassName`: A class name to be applied to the table header row;
-   `onRowClick`: A function that receives the `item` and is called when a row is clicked;
-   `parseDatasetValue`: When clicking on a row, it's item is found by using a data-attribute on the row itself; if this value was originally a number, it needs to be cast back to a number, and this function allows you how the key value should be parsed when reading it from a data-attribute (which is always a string);
-   `defaultSortProperties`: An object containing the default `property` and `direction` for the initial table sort order;
-   `config`: An object containing configuration options for the table. Read more about it in the [configuration](#configuration) section below;
-   `paginationOptions`: An object containing pagination options for the table. Read more about it in the [pagination](#pagination) section below;
-   `serverSideSorting`: If specified and set to true, tells the Smart Table that both sorting and pagination will happen on the server;
-   `onSortChange`: A function that receives an object with the `property` and `direction` of the new sort order and is called when the user changes the sort order;
-   `onPageChange`: A function that receives the new page and is called when the user changes the page;

A more advanced example:

```jsx
function MyTable() {
	// ...

	function handleRowClick(item) {
		console.log(item)
	}

	return (
		<SmartTable
			items={items}
			columns={columns}
			getItemKey={(item) => item.id}
			onRowClick={handleRowClick}
			parseDatasetValue={(id) => +id}
			defaultSortProperties={{ property: 'age', direction: SortDirection.Descending }}
		/>
	)
}
```

### Sorting

Unless sorting happens on the server, the Smart Table will sort the items by using the `getSortProperty` property of a column. This property can be a string, an array of strings or a function.

-   If it's a string, it will be used as the property name of the item to be sorted;
-   If it's an array of strings, it will be used as a path to the property of the item to be sorted (in case of nested objects);
-   If it's a function, it will receive the `item` and return the value to be used for sorting (either a property or a computed value);

Avoid defining predicate functions inline when defining columns, as it will cause unexpected behavior. Define these functions outside of the component, or cache them with other means.

```jsx
const SortPredicates = {
	id: (item) => item.id,
	age: (item) => item.age,
	foods: (item) => item.foods?.length ?? 0,
}

function MyTable() {
	// ...

	const columns = [
		{ key: 'id', title: 'ID', getSortProperty: SortPredicates.id },
		{ key: 'name', title: 'Name', getValue: (item) => <strong>{item.name}</strong> },
		{ key: 'age', title: 'Age', getSortProperty: SortPredicates.age },
		{
			key: 'foods',
			title: 'Favorite Foods',
			getValue: (item) => item.foods.join(', '),
			getSortProperty: SortPredicates.foods,
		},
	]

	// ...
}
```

### Pagination

Unless pagination happens on the server, the Smart Table will paginate the `items` automatically. The pagination options can be specified by using the `paginationOptions` prop, which is an object with the following properties:

-   `pageSize`: The number of items per page, always required;
-   `activePage`: The current page, if you want to control it from outside the component;
-   `totalItems`: The total number of items, only required when paginating on the server to show the correct number of pages;

### Configuration

By default, the Smart Table uses default HTML `table` elements. If you are using a UI framework you might want to customize which component is used to render the table and all of its inner components. This can be done by using the `config` prop, which is an object with the following properties:

-   `components`: Allows to specificy which components are to be used within the table:
    -   `TableContainer`: The component to be used as the table container;
    -   `Table`: The component to be used as the table;
    -   `TableHead`: The component to be used as the table head;
    -   `TableBody`: The component to be used as the table body;
    -   `TableRow`: The component to be used as the table row;
    -   `TableCell`: The component to be used as the table cell;
    -   `Paginator`: The component to be used as the paginator;
    -   `PaginatorItem`: The component to be used as the paginator item;
-   `table`: Allows to specify additional options for the table:
    -   `glyphs`: Specifies which glyphs are to be used for the sort arrows;
        -   `Ascending`: The glyph to be used for the ascending sort arrow;
        -   `Descending`: The glyph to be used for the descending sort arrow;
-   `pagination`: Allows to specify additional options for pagination:
    -   `showPaginatorAboveTable`: If set to true, the paginator will be rendered above the table;
    -   `showPaginatorBelowTable`: If set to true, the paginator will be rendered below the table (defaults to `true`);
    -   `maxPagesToShow`: the maximum number of pages to show in the paginator (defaults to `5`);
    -   `activePageItemClassName`: A class name to be applied to the active page item;
    -   `useCustomPagination`: If set to `true` allows you to completely override the pagination logic and implement your own pagination components;
    -   `paginatorClassName`: A class name to be applied to the paginator container;
    -   `paginatorItemClassName`: A class name to be applied to the paginator items;
    -   `glyphs`: Specifies which glyphs are to be used for the paginator arrows;
        -   `FirstPage`: The glyph to be used for the first page arrow;
        -   `PreviousPage`: The glyph to be used for the previous page arrow;
        -   `NextPage`: The glyph to be used for the next page arrow;
        -   `LastPage`: The glyph to be used for the last page arrow;
        -   `Ellipsis`: The glyph to be used for the ellipsis;

The complete defaults for the `config` object are these:

```jsx
export const DefaultSmartTableConfig = {
	components: {
		TableContainer: 'div',
		Table: 'table',
		TableHead: 'thead',
		TableBody: 'tbody',
		TableHeader: 'th',
		TableRow: 'tr',
		TableCell: 'td',
		Paginator: DefaultPaginator,
		PaginatorItem: DefaultPaginatorItem,
	},
	table: {
		sortGlyphs: {
			Ascending: () => <span>&#8593;</span>,
			Descending: () => <span>&#8595;</span>,
		},
	},
	pagination: {
		showPaginatorAboveTable: false,
		showPaginatorBelowTable: true,
		maxPagesToShow: 5,
		activePageItemClassName: 'active-page-item',
		useCustomPagination: false,
		paginatorClassName: 'paginator',
		paginatorItemClassName: 'paginator-item',
		glyphs: {
			FirstPage: () => <span>&laquo;</span>,
			PreviousPage: () => <span>&lsaquo;</span>,
			NextPage: () => <span>&rsaquo;</span>,
			LastPage: () => <span>&raquo;</span>,
			Ellipsis: () => <span>...</span>,
		},
	},
}
```

Configuration can be applied either on a table-by-table basis by passing the `config` prop, or with with the `SmartTableConfigProvider`, which receives the same `config` object and makes it available to all tables within its scope.

```jsx
import { SmartTableConfigProvider } from '@polaritybit/smart-table'

const config = {
	// ...
}

function App() {
	// prettier-ignore
	return (
        <SmartTableConfigProvider config={config}>
            {/* ... */}
        </SmartTableConfigProvider>
    )
}
```

## License

MIT
