import { Page, Locator } from '@playwright/test'
import { ElementUtil } from '../utils/ElementUtil.js';

export class ProductInfoPage{

    private readonly page:Page;
    private readonly eleUtil:ElementUtil;
    private readonly header:Locator;
    private readonly imageCount:Locator;
    private readonly productMetaData:Locator;
    private readonly productPriceData:Locator;

    private readonly productMap=new Map<string,string|number|null>;

    constructor(page:Page) {
        this.page=page;
        this.eleUtil=new ElementUtil(page);
        this.header=page.locator('h1');
        this.imageCount=page.locator('div#content img');
        this.productMetaData=page.locator(`(//div[@id='content']//ul[@class='list-unstyled'])[1]//li`);
        this.productPriceData=page.locator(`(//div[@id='content']//ul[@class='list-unstyled'])[2]//li`);
        
    }

    async getProductHeader():Promise<string>{
        await this.eleUtil.waitForElementVisible(this.header);
        const header=await this.eleUtil.getInnerText(this.header);
        console.log('product header :'+header);
        return header.trim();
    }

    async getProductImagesCount():Promise<number>{
        await this.eleUtil.waitForElementVisible(this.imageCount);
        const imageCount=await this.imageCount.count();
        console.log(`total numbr of images for ${await this.getProductHeader()}===>${imageCount}`);
        return imageCount;
    }

    /**
     * 
     * @returns this method is returing complete product information :header ,image and metadata
     */
    async getProductDetails():Promise<Map<string,string|number|null>>{
        this.productMap.set('header',await this.getProductHeader());
        this.productMap.set('imagecount',await this.getProductImagesCount());
        await this.getProductMetaData();
        await this.getProductPricingData();
        console.log(`Full product details for product :${await this.getProductHeader()}`);
        this.printProductDetails();
        return this.productMap;
    }

    private async printProductDetails(){
        for(const [key,value] of this.productMap){
            console.log(key,value);
        }
    }

    // Brand: Apple
    // Product Code: Product 18
    // Reward Points: 800
    // Availability: Out Of Stock
    private async getProductMetaData(){
        let productMetaData:string[]=await this.productMetaData.allInnerTexts();
        for(let meta of productMetaData){

            let metadata:string[]=meta.split(':');
            let metaKey=metadata[0].trim();
            let metaValue=metadata[1].trim();
            this.productMap.set(metaKey,metaValue);

        }
    }

    //$2,000.00-0th
    // Ex Tax: $2,000.00-1th

    private async getProductPricingData(){
        let productPricing:string[]=await this.productPriceData.allInnerTexts();
        let productPrice=productPricing[0].trim();
        let productExTax=productPricing[1].split(':')[1].trim();
        this.productMap.set('price',productPrice);
        this.productMap.set('externalprice',productExTax);
        
    }

}