import { Page, Locator } from '@playwright/test'
import { ElementUtil } from '../utils/ElementUtil.js';
import {LoginPage} from '../pages/LoginPage.js'
import {ResultsPage} from '../pages/ResultsPage.js'

export class HomePage{
    
    //Page Locators/Objects/Object Reporitied -Use Encapsulayion -use private and make final

   // private readonly page: Page;
    readonly page: Page;
    private readonly eleUtil:ElementUtil;
    private readonly loginLink:Locator;
    private readonly logoutLink:Locator;
    private readonly search:Locator;
    private readonly searchIcon:Locator;
    
    //Page class Constructor

    constructor(page: Page) {
        this.page = page;
        this.eleUtil = new ElementUtil(page);
        this.loginLink=page.getByRole('link', { name: 'Login' });
        this.logoutLink=page.getByRole('link', { name: 'Logout' });
        this.search=page.getByRole('textbox',{name:'Search'});
        this.searchIcon=page.locator('.btn.btn-default.btn-lg');
        

    }

    async isUserLoggedIn():Promise<boolean>{
        return this.eleUtil.isVisible(this.logoutLink,0);

    }

    async logOut():Promise<LoginPage>{
        await this.eleUtil.click(this.logoutLink,{timeout:5000},1);
        await this.eleUtil.click(this.loginLink,{timeout:4000},1);
        return new LoginPage(this.page);

    }

    async doSearch(searchKey:string){
        console.log(`search key :${searchKey}`);
        await this.eleUtil.fill(this.search,searchKey);
        await this.eleUtil.click(this.searchIcon);
        return new ResultsPage(this.page);

    }
}