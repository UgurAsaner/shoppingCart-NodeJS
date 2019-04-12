import { DiscountType } from "./DiscountType";

export default abstract class Discount {

	discount: number;
	title: string;
	private discountType: DiscountType;

	constructor(discount: number, discountType: DiscountType) {
		this.discount = discount;
		this.discountType = discountType;
		this.title = `${this.getDiscountString()} Discount`;
	}

	abstract getPrintable(): object;

	abstract getDiscountAmount(...args): number;

	public getTitle(): string {
		return this.title;
	}

	getDiscountString(): string {

		if (this.isRateTyped()) {
			return `${this.discount}%`;
		}

		return `${this.discount} tl`;
	}

	isRateTyped() {
		return this.discountType === DiscountType.Rate;
	}
}