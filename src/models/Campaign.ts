import Category from "./Category";
import { DiscountType } from "./DiscountType";
import Discount from "./Discounts";

export default class Campaign extends Discount {

	private category: Category;
	private numberOfItems: number;

	constructor(category: Category, discount: number, numberOfItems: number, discountType: DiscountType) {
		super(discount, discountType);
		this.category = category;
		this.numberOfItems = numberOfItems;
		this.title = `${category.getTitle()} ${this.title} Campaign`;
	}

	public getPrintable(): object {
		return {
			title: this.title,
			category: this.category.getTitle(),
			'after x items': this.numberOfItems,
			discount: this.getDiscountString()
		};
	}

	public getDiscountAmount(totalQuantity: number, totalPrice: number): number {

		if (totalQuantity < this.numberOfItems) {
			return 0;
		}

		if (this.isRateTyped()) {
			return (totalPrice * this.discount) / 100;
		} else {
			return this.discount;
		}
	}

	public getCategory(): Category {
		return this.category;
	}

	public getNumberOfItems(): number {
		return this.numberOfItems;
	}
}