import { DeepPartial, SmartTableConfig, SmartTableConfigProvider } from './lib/smart-table-config.context'
import { SmartTable, TableColumn } from './lib/smart-table.component'

const items = [
	{
		id: 1,
		name: 'Frank',
		age: 20,
		favoriteColor: 'red',
		favoriteFood: 'pizza',
		favoriteAnimals: ['dog', 'cat'],
		address: {
			street: '123 Main St',
			city: 'New York',
			state: 'NY',
		},
	},
	{
		id: 2,
		name: 'Bob',
		age: 30,
		favoriteColor: 'blue',
		favoriteFood: 'steak',
		favoriteAnimals: ['dog', 'cat'],
		address: {
			street: '323 Main St',
			city: 'New York',
			state: 'NY',
		},
	},
	{
		id: 3,
		name: 'Sally',
		age: 40,
		favoriteColor: 'green',
		favoriteFood: 'salad',
		favoriteAnimals: ['dog', 'cat'],
		address: {
			street: '121 Main St',
			city: 'New York',
			state: 'NY',
		},
	},
	{
		id: 4,
		name: 'Sue',
		age: 50,
		favoriteColor: 'yellow',
		favoriteFood: 'salad',
		favoriteAnimals: ['dog', 'cat'],
		address: {
			street: '222 Main St',
			city: 'New York',
			state: 'NY',
		},
	},
	{
		id: 5,
		name: 'Mick',
		age: 20,
		favoriteColor: 'red',
		favoriteFood: 'pizza',
		favoriteAnimals: ['dog', 'cat'],
		address: {
			street: '123 Main St',
			city: 'New York',
			state: 'NY',
		},
	},
	{
		id: 6,
		name: 'Larry',
		age: 30,
		favoriteColor: 'blue',
		favoriteFood: 'steak',
		favoriteAnimals: ['dog', 'cat'],
		address: {
			street: '111 Main St',
			city: 'New York',
			state: 'NY',
		},
	},
	{
		id: 7,
		name: 'Danielle',
		age: 40,
		favoriteColor: 'green',
		favoriteFood: 'salad',
		favoriteAnimals: ['dog', 'cat'],
		address: {
			street: '123 Main St',
			city: 'New York',
			state: 'NY',
		},
	},
	{
		id: 8,
		name: 'Jane',
		age: 50,
		favoriteColor: 'yellow',
		favoriteFood: 'salad',
		favoriteAnimals: ['dog', 'cat'],
		address: {
			street: '345 Main St',
			city: 'New York',
			state: 'NY',
		},
	},
	{
		id: 9,
		name: 'Oliver',
		age: 20,
		favoriteColor: 'red',
		favoriteFood: 'pizza',
		favoriteAnimals: ['dog', 'cat'],
		address: {
			street: '234 Main St',
			city: 'New York',
			state: 'NY',
		},
	},
	{
		id: 10,
		name: 'Zach',
		age: 30,
		favoriteColor: 'blue',
		favoriteFood: 'steak',
		favoriteAnimals: ['dog', 'cat'],
		address: {
			street: '123 Main St',
			city: 'New York',
			state: 'NY',
		},
	},
]

const config: DeepPartial<SmartTableConfig> = {
	components: {},
}

const SortProperties = {
	id: (item: (typeof items)[number]) => item.id,
	name: (item: (typeof items)[number]) => item.name,
	age: (item: (typeof items)[number]) => item.age,
}

export function Demo() {
	const columns: TableColumn<(typeof items)[number]>[] = [
		{
			key: 'id',
			title: 'ID',
			getSortProperty: SortProperties.id,
		},
		{
			key: 'name',
			title: 'Name',
			getValue: (item) => {
				return <strong>{item.name}</strong>
			},
			getSortProperty: SortProperties.name,
		},
		{
			key: 'age',
			title: 'Age',
			getSortProperty: SortProperties.age,
		},
		{
			key: 'favoriteColor',
			title: 'Favorite Color',
		},
		{
			key: 'favoriteFood',
			title: 'Favorite Food',
		},
		{
			key: 'favoriteAnimals',
			title: 'Favorite Animals',
			getValue: (item) => {
				return item.favoriteAnimals.join(', ')
			},
		},
		{
			key: 'address',
			title: 'Address',
			getValue: (item) => {
				return `${item.address.street}, ${item.address.city}, ${item.address.state}`
			},
		},
	]

	return (
		<SmartTableConfigProvider config={config}>
			<div>
				<h1>Smart Table</h1>
				<SmartTable
					items={items}
					columns={columns}
					getItemKey={(item) => item.id}
					paginationOptions={{
						pageSize: 5,
					}}
				/>
			</div>
		</SmartTableConfigProvider>
	)
}
