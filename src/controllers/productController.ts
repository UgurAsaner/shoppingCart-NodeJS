import Product from "../models/Product";
import Category from "../models/Category";
import * as dataHelper from "../helpers/dataHelper"

export function getPrintabeProducts(products?: Product[]) {
	products = products || getProducts();

	return products.map(
		product => product.getPrintable()
	);
}

export function getProducts(): Product[] {
	return dataHelper.getAllByClass(Product);
}

export function getByIndex(index: number): Product {
	let products = getProducts();

	return products[index];
}