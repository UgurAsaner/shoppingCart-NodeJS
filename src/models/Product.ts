import Category from './Category';

export default class Product {

	private title: string;
	private price: number;
	private category: Category;

	constructor(title: string, price: number, category: Category) {
		this.title = title;
		this.price = price;
		this.category = category;
	}

	public getCategory(): Category {
		return this.category;
	}

	public getCategoryName(): string {
		return this.category.getTitle();
	}

	public getTitle(): string {
		return this.title;
	}

	public getPrice(): number {
		return this.price;
	}

	public getPrintable(){
		return {
			title: this.title,
			price: this.price,
			category: this.getCategoryName()
		}
	}

}