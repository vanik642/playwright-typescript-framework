import { test as base, expect } from '@playwright/test'

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

//let registerationData: RegData[] = JSON.parse(fs.readFileSync('./data/register.json', 'utf-8'));

let fileContent=fs.readFileSync('./data/register.csv','utf-8')
let registrationData:RegData[]=parse(fileContent,{
    columns:true,
    skip_empty_lines:true

})

type csvFixture={
    regData:RegData[];

}

export const dataTest=base.extend<csvFixture>({

    regData:async({},use)=>{
        let fileContent=fs.readFileSync('./data/register.csv','utf-8')
        let registrationData:RegData[]=parse(fileContent,{
            columns:true,
            skip_empty_lines:true
        
        });
        await use(registrationData);

    }
})

export {expect}