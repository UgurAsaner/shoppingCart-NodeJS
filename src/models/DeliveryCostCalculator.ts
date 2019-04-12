import ShoppingCart from "./Cart";

export default class DeliveryCostCalculator {
	
	private costPerDelivery: number;
	private costPerProduct: number;
	private fixedCost: number = 2.99;
	
	constructor(costPerDelivery: number, costPerProduct: number, fixedCost: number){
		this.costPerDelivery = costPerDelivery;
		this.costPerProduct = costPerProduct;
		this.fixedCost = fixedCost;		
	}

	public calculateFor(cart: ShoppingCart): number {

		let numberOfDeliveries = cart.getDistinctCategories().length;
		let numberofProducts = cart.getNumberOfProducts();

		return (this.costPerDelivery * numberOfDeliveries) + (this.costPerProduct * numberofProducts) + this.fixedCost;
	}

}