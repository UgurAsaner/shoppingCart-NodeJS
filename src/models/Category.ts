export default class Category {

	private title: string;
	private parentCategory: Category;

	constructor(title: string, parentCategory?: Category) {
		this.title = title;
		this.parentCategory = parentCategory || null;
	}

	public getParentCategory() {
		return this.parentCategory;
	}

	public getTitle() {
		return this.title;
	}

	private hasParent(): boolean {
		return !!this.parentCategory;
	}

	public getAllCategories(): Category[] {

		let categories: Category[] = [];
		let currentCategory: Category = this;

		while (true) {

			categories.push(currentCategory);

			if (currentCategory.hasParent()) {
				currentCategory = currentCategory.getParentCategory();
			} else {
				break;
			}
		}

		return categories;
	}
}