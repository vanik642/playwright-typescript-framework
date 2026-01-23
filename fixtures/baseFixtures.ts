import {test as base,expect} from '@playwright/test';
import {HomePage} from '../pages/HomePage.ts';
import {LoginPage} from '../pages/LoginPage.ts'


type myFixtures={
    homePage:HomePage
};

export const test=base.extend<myFixtures>({

    homePage: async ({page,baseURL},use,testInfo)=>{

        //login auromatically before my test
        const loginPage=new LoginPage(page);
        await loginPage.goToLoginPage(baseURL)

        const username=testInfo.project.metadata.appUsername;
        const password=testInfo.project.metadata.appPassword;

        const homePage=await loginPage.doLogin(username,password);
        expect(await homePage.isUserLoggedIn()).toBeTruthy();
        await use(homePage)

        
    }

})


export {expect };