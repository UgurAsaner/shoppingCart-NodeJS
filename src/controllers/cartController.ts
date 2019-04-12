import * as dataHelper from "../helpers/dataHelper"
import Cart from "../models/Cart";
import Product from "../models/Product";
import * as campaignController from "./campaignController";
import * as couponController from "./couponController";
import DeliveryCostCalculator from "../models/DeliveryCostCalculator";
import * as productController from "./productController";

let cart: Cart;

export function addProduct(product: Product, quantity: number) {
	const cart = getCart();
	cart.addItem(product, quantity);
}

export function getProductsInCart() {
	const cart = getCart();
	const printableProducts = cart.getPrintableItems();

	return printableProducts;
}

export function getCampaignDiscountDetails() {
	const cart = getCart();
	const categoriesInCart = cart.getDistinctCategories();
	const campaignsInCart = campaignController.getCampaigns(categoriesInCart)
	cart.calculateCampaignDiscount(campaignsInCart);

	return {
		Title: cart.getDiscountedCampaign(),
		Amount: cart.getCampaignDiscount()
	}
}

export function getCouponDiscountDetails() {
	const cart = getCart();
	const categoriesInCart = cart.getDistinctCategories();
	const campaignsInCart = campaignController.getCampaigns(categoriesInCart)
	const couponsAvailable = couponController.getCoupons();
	cart.calculateCouponDiscount(couponsAvailable, campaignsInCart);

	return {
		Title: cart.getDiscountedCoupon(),
		Amount: cart.getCouponDiscount()
	}
}

export function getDeliveryCost() {
	const cart = getCart();
	const deliveryCostCalculators = dataHelper.getAllByClass(DeliveryCostCalculator);
	const deliveryCostCalculator: DeliveryCostCalculator = deliveryCostCalculators[0];

	return deliveryCostCalculator.calculateFor(cart);
}

export function getTotalAmount(): number {
	const cart = getCart();
	return cart.getTotalAmount();
}

export function getTotalAmountAfterDiscounts(): number {
	const cart = getCart();
	return cart.getTotalAmountsAfterDiscount();
}

function getCart(): Cart {
	if (!cart) {
		cart = dataHelper.getCart();
	}
	return cart;
}