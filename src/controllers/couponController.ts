import Coupon from "../models/Coupon";
import * as dataHelper from "../helpers/dataHelper"
import Category from "../models/Category";


export function getPrintableCoupons() {

	let campaigns = getCoupons();

	return campaigns.map(
		coupon => coupon.getPrintable()
	);
}

export function getCoupons(): Coupon[] {
	return dataHelper.getAllByClass(Coupon);
}