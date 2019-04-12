import Campaign from "../models/Campaign";
import * as dataHelper from "../helpers/dataHelper"
import Category from "../models/Category";


export function getPrintableCampaigns() {

	let campaigns = getCampaigns();

	return campaigns.map(
		campaign => campaign.getPrintable()
	);
}

export function getCampaigns(categories?: Category[]): Campaign[] {
	
	let campaigns: Campaign[] = dataHelper.getAllByClass(Campaign);

	if (categories && categories.length > 0) {
		return campaigns.filter(
			campaign => categories.indexOf(campaign.getCategory()) > -1
		)
	}
	return campaigns
}