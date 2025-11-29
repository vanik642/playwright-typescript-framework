import { ResultsPage } from '../pages/ResultsPage.js'
import { ProductInfoPage } from '../pages/ProductInfoPage.js';
import { test, expect } from '../fixtures/baseFixtures.js'


let search = [
    { searchKey: 'macbook', productName: 'MacBook Pro', imageCount: 4 },
    { searchKey: 'macbook', productName: 'MacBook Air', imageCount: 4 },
    { searchKey: 'samsung', productName: 'Samsung Galaxy Tab 10.1', imageCount: 7 },
];

for (let product of search) {
    test(`verify product header ${product.productName}`, { tag: ['@product,@sanity,@regression'] }, async ({ homePage }) => {
        let resultsPage: ResultsPage = await homePage.doSearch(product.searchKey);
        let productInfo: ProductInfoPage = await resultsPage.selectTheProduct(product.productName);
        await homePage.page.waitForTimeout(2000);
        expect(await productInfo.getProductHeader()).toBe(product.productName);
    });


}

for (let product of search) {
    test(`verify product images ${product.productName} ${product.imageCount}`, { tag: ['@product,@sanity'] }, async ({ homePage }) => {
        let resultsPage: ResultsPage = await homePage.doSearch(product.searchKey);
        let productInfo: ProductInfoPage = await resultsPage.selectTheProduct(product.productName);
        await homePage.page.waitForTimeout(2000);
        expect(await productInfo.getProductImagesCount()).toBe(product.imageCount);
    });

}

test(`verify product metadata`, async ({ homePage }) => {
    let resultsPage: ResultsPage = await homePage.doSearch('Macbook');
    let productInfo: ProductInfoPage = await resultsPage.selectTheProduct('MacBook Pro');
    await homePage.page.waitForTimeout(2000);
    let actualProductDetails = await productInfo.getProductDetails();
    expect.soft(actualProductDetails.get('header')).toBe('MacBook Pro');
    expect.soft(actualProductDetails.get('Brand')).toBe('Apple');
    expect.soft(actualProductDetails.get('Product Code')).toBe('Product 18');
    expect.soft(actualProductDetails.get('Reward Points')).toBe('800');
    expect.soft(actualProductDetails.get('Availability')).toBe('Out Of Stock');

});

test(`verify product pricing`, async ({ homePage }) => {
    let resultsPage: ResultsPage = await homePage.doSearch('Macbook');
    let productInfo: ProductInfoPage = await resultsPage.selectTheProduct('MacBook Pro');
    await homePage.page.waitForTimeout(2000);
    let actualProductDetails = await productInfo.getProductDetails();
    expect.soft(actualProductDetails.get('header')).toBe('MacBook Pro');
    expect.soft(actualProductDetails.get('price')).toBe('$2,000.00');
    expect.soft(actualProductDetails.get('externalprice')).toBe('$2,000.00');

});


