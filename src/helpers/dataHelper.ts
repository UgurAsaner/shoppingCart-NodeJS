import Category from '../models/Category';
import Product from '../models/Product';
import Coupon from '../models/Coupon';
import Campaign from '../models/Campaign';
import Cart from '../models/Cart';
import { DiscountType } from '../models/DiscountType';
import DeliveryCostCalculator from '../models/DeliveryCostCalculator';

const data = {
	CampaignList: [],
	CategoryList: [],
	ProductList: [],
	CouponList: [],
	DeliveryCostCalculatorList:[],
	Cart: new Cart()
};

export function createInitialData() {

	let categories: Category[] = [];
	let products: Product[] = [];
	let coupons: Coupon[] = [];
	let campaigns: Campaign[] = [];
	let deliveryCostCalculators: DeliveryCostCalculator[] = []; 
	
	categories.push(new Category('Electronics'));
	categories.push(new Category('Home Electronics', categories[0]));
	categories.push(new Category('Kitchen Electronics', categories[1]));
	categories.push(new Category('Mobile Phones', categories[0]));
	categories.push(new Category('Computers', categories[0]));

	products.push(new Product('IPhone X', 8999.99, categories[3]));
	products.push(new Product('Xaomi Mi Max', 1899.99, categories[3]));
	products.push(new Product('Macbook Air', 7869.99, categories[4]));
	products.push(new Product('Asus X780R', 3689.99, categories[4]));
	products.push(new Product('Toast Machine', 239.89, categories[2]));

	coupons.push(new Coupon(4650, 5, DiscountType.Rate));
	coupons.push(new Coupon(10000, 600, DiscountType.Amount));

	campaigns.push(new Campaign(categories[0], 10, 2, DiscountType.Rate));
	campaigns.push(new Campaign(categories[1], 15, 3, DiscountType.Rate));
	campaigns.push(new Campaign(categories[1], 200, 4, DiscountType.Amount));

	deliveryCostCalculators.push(new DeliveryCostCalculator(1.5, 0.5, 2.80));

	data.CategoryList = categories;
	data.CouponList = coupons;
	data.ProductList =  products;
	data.CampaignList = campaigns;
	data.DeliveryCostCalculatorList = deliveryCostCalculators;
}

export function getCart(): Cart {
	return data.Cart;
}

export function getAllByClass(Class): any[] {
	try{
		return data[`${Class.name}List`];
	} catch(e) {
		return [];
	}
}