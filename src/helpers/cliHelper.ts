import chalk from 'chalk';
import * as readline from 'readline-sync';
import * as productController from '../controllers/productController';
import { getPrintableCategories } from '../controllers/categoryController';
import * as cartController from '../controllers/cartController';
import * as campaignController from '../controllers/campaignController';
import * as couponController from '../controllers/couponController';


const mainMenuOptions = [
	{
		text: 'Browse Products',
		action: browseProducts
	},
	{
		text: 'Show Categories',
		action: showCategories
	},
	{
		text: 'Show Campaigns',
		action: showCampaigns
	},
	{
		text: 'Show Coupons',
		action: showCoupons
	},
	{
		text: 'Show Products in Cart',
		action: showProductsInCart
	},
	{
		text: 'Show Cart Sumary',
		action: showCartSummary
	}
];

function showColorizedMessage(colorString: string, message?: string) {
	message = message || `Welcome to Shopping App`;
	console.log(
		chalk.keyword(colorString)(`\t\t\t${message}`)
	);
}

export function showMainMenu(message?) {
	console.clear();
	showColorizedMessage('orange', message);

	const mainMenuOptionTexts = mainMenuOptions.map(option => option.text);
	const index = readline.keyInSelect(mainMenuOptionTexts, 'Please select an option...');

	if (index >= 0) {
		console.clear();
		mainMenuOptions[index].action();
	} else {
		console.log('Bye Then...');
	}
}

function browseProducts() {
	const products = productController.getPrintabeProducts();
	console.table(products);

	const index = readline.questionInt('Please select a product to add...');
	const selectedProduct = productController.getByIndex(index);
	const productTitle = selectedProduct.getTitle();
	const quantity = readline.questionInt(`Please enter quantity for ${productTitle}...`);

	cartController.addProduct(selectedProduct, quantity);
	showMainMenu(`${quantity} ${productTitle} added to Cart.`);
}

function showCategories(getSelection?: boolean) {

	const text = getSelection ? 'Please select a category...' : '';
	const categoryOptions = getPrintableCategories();
	const index = readline.keyInSelect(categoryOptions, text);
	if (getSelection) {
		return index;
	} else {
		showMainMenu();
	}
}

function showCampaigns() {
	const printableCampaigns = campaignController.getPrintableCampaigns();
	console.table(printableCampaigns);
	readline.keyIn(`Press any key for Main Menu`);
	showMainMenu();
}

function showCoupons() {
	const printableCoupons = couponController.getPrintableCoupons();
	console.table(printableCoupons);
	readline.keyIn(`Press any key for Main Menu`);
	showMainMenu();
}

function showCartSummary() {
	const products = cartController.getProductsInCart();

	if (products.length < 1) {
		showMainMenu('Chart is empty');
	}

	const campaignDiscountDetails = cartController.getCampaignDiscountDetails();
	const couponDiscountDetails = cartController.getCouponDiscountDetails();
	const totalAmount = cartController.getTotalAmount();
	const totalAmountAfterDiscounts = cartController.getTotalAmountAfterDiscounts();
	const deliveryCost = cartController.getDeliveryCost();
	let discounts = [];
	let totalDiscount;


	console.table(products);

	if (campaignDiscountDetails.Amount > 0) {
		discounts.push(campaignDiscountDetails);
	}

	if (couponDiscountDetails.Amount > 0) {
		discounts.push(couponDiscountDetails);
	}

	if (discounts.length > 0) {

		totalDiscount = discounts
			.map(discounts => discounts.Amount)
			.reduce((total, next) => total + next)

		discounts.push({
			Title: 'Total Discount',
			Amount: totalDiscount
		});

		showColorizedMessage('green', 'Discounts')
		console.table(fixAmounts(discounts));
	}

	let summary = [
		{
			Description: 'Total Amount',
			Amount: totalAmount
		},
		{
			Description: 'Total Discount',
			Amount: -totalDiscount
		},
		{
			Description: 'Total Amount After Discounts',
			Amount: totalAmountAfterDiscounts
		},
		{
			Description: 'Delivery Cost',
			Amount: deliveryCost
		},
		{
			Description: 'Totally',
			Amount: totalAmountAfterDiscounts + deliveryCost
		}
	];

	showColorizedMessage('orange', 'Summary');
	console.table(fixAmounts(summary));

	readline.keyIn(`Press any key for Main Menu`);
	showMainMenu();
}

function showProductsInCart() {
	const products = cartController.getProductsInCart();
	console.table(products);

	readline.keyIn(`Press any key for Main Menu`);
	showMainMenu();
}

function fixAmounts(array) {
	array.forEach((element) => {
		element.Amount = element.Amount.toFixed(2)
	});

	return array;
}

