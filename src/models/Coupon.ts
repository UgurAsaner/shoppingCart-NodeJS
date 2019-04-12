import { DiscountType } from "./DiscountType";
import Discount from "./Discounts";

export default class Coupon extends Discount {

	private minPurchase: number;

	constructor(minPurchase: number, discount: number, discountType: DiscountType) {
		super(discount, discountType);
		this.minPurchase = minPurchase;
		this.title += ` Coupon`;
	}

	public getPrintable(): object {
		return {
			title: this.title,
			'min purchase': this.minPurchase,
			discount: this.getDiscountString()
		};
	}

	public getDiscountAmount(totalPrice: number): number {
		if (totalPrice < this.minPurchase) {
			return 0;
		}

		if (this.isRateTyped()) {
			return (totalPrice * this.discount) / 100;
		} else {
			return this.discount;
		}
	}
}