import { test, expect } from '@playwright/test'

import { LoginPage } from '../pages/LoginPage.js';
import { RegisterPage } from '../pages/RegisterPage.js';
import fs from 'fs';
import {parse} from 'csv-parse/sync';


type RegData = {
    firstName: string,
    lastName: string,
    telephone: string,
    password: string,
    subscribeNewsletter: string
}

let fileContent=fs.readFileSync('./data/register.csv','utf-8')
let registrationData:RegData[]=parse(fileContent,{
    columns:true,
    skip_empty_lines:true

});

for(let user of registrationData){
test(`verify user is able to register ${user.firstName} @register`,async({page,baseURL})=>{

    let loginPage=new LoginPage(page);
    await loginPage.goToLoginPage(baseURL);
    let registerPage:RegisterPage=await loginPage.navigateToRegisterPage();
    let isUserRegisterd:boolean=await registerPage.registerUser(user.firstName,user.lastName,getRandomEmail(),user.telephone,user.password,user.subscribeNewsletter);
    expect(isUserRegisterd).toBeTruthy();
})
}

function getRandomEmail() : string{
    let randomValue = Math.random().toString(36).substring(2, 9);
    return `auto_${randomValue}@nal.com`;
}