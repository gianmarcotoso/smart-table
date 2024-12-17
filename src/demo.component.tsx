import { useState } from 'react'
import { DeepPartial, SmartTableConfig, SmartTableConfigProvider } from './lib/smart-table-config.context'
import { SmartTable, SortProperties, TableColumn } from './lib/smart-table.component'
import { SortDirection } from './lib'

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

type Item = (typeof items)[number]

const DemoSortPredicates = {
	id: (item: Item) => item.id,
	name: (item: Item) => item.name,
	age: (item: Item) => item.age,
}

export function Demo() {
	const columns: TableColumn<Item>[] = [
		{
			key: 'id',
			title: 'ID',
			getSortProperty: DemoSortPredicates.id,
		},
		{
			key: 'name',
			title: 'Name',
			getValue: (item) => {
				return <strong>{item.name}</strong>
			},
			getSortProperty: 'name',
		},
		{
			key: 'age',
			title: 'Age',
			getSortProperty: DemoSortPredicates.age,
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
			getSortProperty: 'favorite',
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

	const [page, setPage] = useState(0)
	const [sortProperties, setSortProperties] = useState<SortProperties<Item>>({
		direction: SortDirection.Ascending,
		property: DemoSortPredicates.id,
	})

	return (
		<SmartTableConfigProvider config={config}>
			<div>
				<h1>Smart Table</h1>
				<SmartTable
					items={items}
					columns={columns}
					getItemKey={(item) => item.id}
					sortProperties={sortProperties}
					onSortChange={(sortProperties) => {
						setSortProperties(sortProperties)
					}}
					onPageChange={(page) => {
						setPage(page)
					}}
					paginationOptions={{
						pageSize: 5,
						activePage: page,
					}}
				/>

				<button onClick={() => setPage(0)}>0</button>
				<button onClick={() => setPage(1)}>1</button>

				<button
					onClick={() =>
						setSortProperties({ property: DemoSortPredicates.id, direction: SortDirection.Ascending })
					}
				>
					Sort by ID Ascending
				</button>
				<button
					onClick={() =>
						setSortProperties({ property: DemoSortPredicates.age, direction: SortDirection.Descending })
					}
				>
					Sort by Age Descending
				</button>
			</div>
		</SmartTableConfigProvider>
	)
}
