import { expect } from 'chai';
import Category from '../src/models/Category'

describe('Category Creation', () => {

	it('should set Category title properly', () => {
		const title = 'elect';
		const s = new Category(title);
		expect(s.getTitle()).to.equal(title);
	});

	it('should set parentCategory properly', () => {
		const childTitle = 'child';
		const parentTitle = 'parent';

		const parent = new Category(parentTitle)
		const child = new Category(childTitle, parent);

		expect(child.getParentCategory().getTitle()).to.equal(parentTitle);
	});
})