import { Page, Locator } from '@playwright/test'
import { ElementUtil } from '../utils/ElementUtil.js';
import {HomePage} from '../pages/HomePage.js'
import { time } from 'console';
import { RegisterPage } from './RegisterPage.js';

export class LoginPage {


    //Page Locators/Objects/Object Reporitied -Use Encapsulayion -use private and make final

    private readonly page: Page;
    private readonly eleUtil;
    private readonly emailId: Locator;
    private readonly password: Locator;
    private readonly loginButton: Locator;
    private readonly warningMessage: Locator;
    private readonly registration:Locator;

    //Page class Constructor

    constructor(page: Page) {
        this.page = page;
        this.eleUtil = new ElementUtil(page);
        this.emailId = page.getByRole('textbox', { name: 'E-Mail Address' });
        this.password = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.locator(`input[type="submit"][value="Login"]`);
        this.warningMessage = page.locator('.alert.alert-danger.alert-dismissible');
        this.registration=page.getByRole('link', { name: 'Register' });

    }

    //Page Actions
    // async goToLoginPage() {
    //     await this.page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login')
    // }

    async goToLoginPage(baseURL:string|undefined) {
        await this.page.goto(baseURL+'?route=account/login')
    }

    // async doLogin(email:string,password:string){
    //     await this.emailId.fill(email);
    //     await this.password.fill(password);
    //     await this.loginButton.click();
    // }

    /**
     * login to app using username/password
     * @param email n
     * @param password 
     * @returns 
     */
    async doLogin(email: string, password: string): Promise<HomePage> {
        await this.eleUtil.fill(this.emailId, email);
        await this.eleUtil.fill(this.password, password);
        await this.eleUtil.click(this.loginButton, { force: true, timeout: 5000 });
        // const pageTitle=this.page.title();
        // console.log(`Home Page Title :+${pageTitle}`);
        // return pageTitle;
        return new HomePage(this.page);
    }

    /**
     * 
     * @returns get the warning messgae in case of invalid login
     */
    async getInvalidLoginMessage(): Promise<string | null> {
        const errorMsg = await this.eleUtil.getText(this.warningMessage);
        console.log('invalid login warning message : ' + errorMsg);
        return errorMsg;

    }


    async navigateToRegisterPage():Promise<RegisterPage>{
        await this.eleUtil.click(this.registration);
        return new RegisterPage(this.page);
    }
}