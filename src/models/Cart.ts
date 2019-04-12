import Product from "./Product";
import Campaign from "./Campaign";
import Category from "./Category";
import Coupon from "./Coupon";

export default class Cart {

	private totalAmount: number = 0;
	private totalAmountAfterDiscounts: number = 0;
	private discountedCampaign: string;
	private discountedCoupon: string;
	private campaignDiscount: number = 0;
	private couponDiscount: number = 0;
	private deliveryCost: number = 0;
	private items = [];
	private isCampaignDiscountCalculated: boolean = false;

	constructor() { }

	public addItem(product: Product, quantity: number): void {
		const item = { product, quantity };
		const itemInList = this.items.find(item => item.product == product);

		if (itemInList) {
			itemInList.quantity += quantity;
			item.quantity = quantity - itemInList.quantity;
		} else {
			this.items.push(item);
		}

		this.applyItemAmounts(item);
	}

	public getPrintableItems() {
		const printableItems = this.items.map((item) => {

			const product = item.product;
			const quantity = item.quantity;
			const unitPrice = product.getPrice();

			return {
				Category: product.getCategoryName(),
				Product: product.getTitle(),
				Quantity: item.quantity,
				'Unit Price': unitPrice,
				'Total Price': unitPrice * quantity
			};
		});

		return printableItems;
	}

	public getTotalAmountsAfterDiscount(): number {
		this.totalAmountAfterDiscounts = this.totalAmount;
		this.applyDiscounts();
		return this.totalAmountAfterDiscounts;
	}

	private applyDiscounts(): Cart {
		return this
			.applyCampaigns()
			.applyCoupons();
	}

	private applyCoupons(): Cart {
		this.totalAmountAfterDiscounts -= this.couponDiscount;
		return this;
	}

	private applyCampaigns(): Cart {
		this.totalAmountAfterDiscounts -= this.campaignDiscount;
		return this;
	}

	public getCampaignDiscount(): number {
		return this.campaignDiscount;
	}

	public getNumberOfProducts(): number {
		return this.items.length;
	}

	public calculateCampaignDiscount(campaigns: Campaign[]) {
		let discounts = this.calculateCampaignDiscounts(campaigns);

		let maxAmountDiscount = discounts.reduce((current, next) => {
			return current.discount > next.discount ? current : next;
		});

		this.campaignDiscount = maxAmountDiscount.discount;
		this.discountedCampaign = maxAmountDiscount.campaignTitle;
	}

	private calculateCampaignDiscounts(campaigns: Campaign[]) {

		let campaingDiscounts = [];
		let productAmountsPerCategory = this.getProductAmountsPerCategory();

		campaigns.forEach((campaign) => {

			let categoryTitle = campaign.getCategory().getTitle();
			let productAmounts = productAmountsPerCategory[categoryTitle]

			let categoryTotalQuantity = productAmounts.totalQuantity;
			let categoryTotalPrice = productAmounts.totalPrice;

			let discount = campaign.getDiscountAmount(categoryTotalQuantity, categoryTotalPrice);

			campaingDiscounts.push(
				{
					campaignTitle: campaign.getTitle(),
					discount
				}
			);
		});

		return campaingDiscounts;
	}

	private getProductAmountsByCategories() {

		let productAmountsByCategories = [];

		this.items.forEach(item => {
			let product: Product = item.product;
			let quantity: number = item.quantity;
			let categories = product.getCategory().getAllCategories();

			let categoriesWithProductAmounts = categories.map((category) => {
				return {
					category: category.getTitle(),
					productTitle: product.getTitle(),
					price: product.getPrice(),
					quantity: quantity
				}
			});

			Array.prototype.push.apply(productAmountsByCategories, categoriesWithProductAmounts);
		});

		return productAmountsByCategories;
	}

	public getDistinctCategories(): Category[] {

		let allCategories: Category[] = []

		const getDistincts = (value, index, self) => {
			return self.indexOf(value) === index;
		}

		this.items.forEach(item => {

			let product: Product = item.product;
			let categories = product.getCategory().getAllCategories();

			Array.prototype.push.apply(allCategories, categories);
		});


		return allCategories.filter(getDistincts);
	}

	public calculateCouponDiscount(coupons: Coupon[], campaigns: Campaign[]) {

		if (!this.isCampaignDiscountCalculated) {
			this.calculateCampaignDiscount(campaigns);
		}

		let discounts = this.calculateCouponDiscounts(coupons);

		let maxAmountDiscount = discounts.reduce((current, next) => {
			return current.discount > next.discount ? current : next;
		});

		this.couponDiscount = maxAmountDiscount.discount;
		this.discountedCoupon = maxAmountDiscount.couponTitle;
	}

	private calculateCouponDiscounts(coupons: Coupon[]) {

		let couponDiscounts = [];
		let totalAmountAfterCampaignDiscount = this.totalAmount - this.campaignDiscount;

		coupons.forEach((coupon) => {

			let discount = coupon.getDiscountAmount(totalAmountAfterCampaignDiscount);

			couponDiscounts.push(
				{
					couponTitle: coupon.getTitle(),
					discount
				}
			);
		});

		return couponDiscounts;
	}

	public getCouponDiscount(): number {
		return this.couponDiscount;
	}

	public getDeliveryCost(): number {
		return this.deliveryCost;
	}

	public getTotalAmount(): number {
		return this.totalAmount;
	}

	public print(): void {
		console.log('Printing Cart');
	}

	public getDiscountedCampaign(): string {
		return this.discountedCampaign;
	}

	public getDiscountedCoupon(): string {
		return this.discountedCoupon;
	}

	private applyItemAmounts(item): void {
		this.totalAmount += item.product.getPrice() * item.quantity;
		this.totalAmountAfterDiscounts = this.totalAmount;
		this.isCampaignDiscountCalculated = false;
	}

	private getProductAmountsPerCategory() {

		let productsAmountsPerCategory = {};
		let productAmounts = this.getProductAmountsByCategories();

		productAmounts.forEach((productAmount) => {
			let category = productAmount.category;
			let productQuantity = productAmount.quantity;
			let productPrice = productAmount.price;
			let currentAmountsOfCategory = productsAmountsPerCategory[category];

			let totalPrice = productQuantity * productPrice;

			if (currentAmountsOfCategory) {

				productsAmountsPerCategory[category] =

					{
						totalQuantity: currentAmountsOfCategory.totalQuantity + productQuantity,
						totalPrice: currentAmountsOfCategory.totalPrice + totalPrice
					}

			} else {
				productsAmountsPerCategory[category] =

					{
						totalQuantity: productQuantity,
						totalPrice: totalPrice
					}

			}
		});

		return productsAmountsPerCategory;
	}
}