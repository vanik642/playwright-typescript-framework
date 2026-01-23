
import { ResultsPage } from '../pages/ResultsPage.js';
import { test, expect } from '../fixtures/baseFixtures.js';

//data provider for product search key and results count//array
const searchData = [
    { searchKey: 'macbook', resultsCount: 3 },
    { searchKey: 'samsung', resultsCount: 2 },
    { searchKey: 'imac', resultsCount: 1 },
    { searchKey: 'canon', resultsCount: 1 },
    { searchKey: 'Dummy', resultsCount: 0 },
];

for (const product of searchData) {
    test(`@search verify product search ${product.searchKey} `, async ({ homePage }) => {
        const resultsPage: ResultsPage = await homePage.doSearch(product.searchKey);
        const searchCount = await resultsPage.getSearchResultCount();
        expect(searchCount).toBe(product.resultsCount);
    });
}

