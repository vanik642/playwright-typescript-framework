import { Page, Locator } from '@playwright/test'
import { ElementUtil } from '../utils/ElementUtil.js';
import {ProductInfoPage} from '../pages/ProductInfoPage.js'

export class ResultsPage{


    //Page Locators/Objects/Object Reporitied -Use Encapsulayion -use private and make final

    private readonly page: Page;
    private readonly eleUtil:ElementUtil;
    private readonly results:Locator;


     //Page class Constructor
    constructor(page:Page) {
        this.page = page;
        this.eleUtil = new ElementUtil(page);
        this.results=page.locator('.product-thumb');
        
    }

    //page actions

    async getSearchResultCount():Promise<number>{
        return await this.results.count();

    }

    async selectTheProduct(productName:string){
        console.log("=========product name:======="+productName);
        this.eleUtil.click(this.page.getByRole('link',{name:`${productName}`}));
        return new ProductInfoPage(this.page);

    }
}