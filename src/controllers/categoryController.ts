import Category from "../models/Category";
import * as dataHelper from "../helpers/dataHelper"

export function getPrintableCategories() {
	let categories = getCategories();

	return categories.map(
		category => category.getTitle()
	);
}

export function getCategories(): Category[] {
	return dataHelper.getAllByClass(Category);
}