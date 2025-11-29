
import { Page, Locator } from '@playwright/test'

type flexibleLocator = string | Locator;

export class ElementUtil {


    private page: Page;
    private defaultTimeOut: number = 30000;


    constructor(page: Page, timeOut: number = 30000) {
        this.page = page;
        this.defaultTimeOut = timeOut;
    }


    /**
     * 
     * @param locator this method to convert the string o Locator else it will return the semactic based locators
     * @returns 
     */

    private getLocator(locator: flexibleLocator,index?:number): Locator {
        if (typeof locator === 'string') {
            if(index){
                return this.page.locator(locator).nth(index);
            }
            else{
                return this.page.locator(locator).first();
            }
            
        }
        else{
            if(index){
                return locator.nth(index);
            }
            else{
                return locator.first();
            }
        }
        

    }

    /**
     * Click on an element
     * @param locator 
     * @param options 
     */
    //Encapsulation
    async click(locator: flexibleLocator, options?: { force?: boolean; timeout?: number },index?:number): Promise<void> {
        await this.getLocator(locator,index).click({
            force: options?.force,
            timeout: options?.timeout || this.defaultTimeOut
        });

        console.log(`Clicked on the element',${locator}`);


    }

    /**
    * Double click on an element
    * @param locator 
    * @param options 
    */

    async doubleClick(locator: flexibleLocator): Promise<void> {
        await this.getLocator(locator).dblclick({
            timeout: this.defaultTimeOut
        });
        console.log(`Double click on the element',${locator}`);
    }

    /**
    * Right click on an element
    * @param locator 
    * @param options 
    */

    async rightClick(locator: flexibleLocator): Promise<void> {
        await this.getLocator(locator).click({
            button: 'right',
            timeout: this.defaultTimeOut
        });
        console.log(`Double click on the element',${locator}`);
    }



    /**
     * Fill text into an input fieldƒ
     * @param locator 
     * @param text 
     */
    async fill(locator: flexibleLocator, text: string): Promise<void> {
        await this.getLocator(locator).fill(text, { timeout: this.defaultTimeOut });
        console.log(`Filled text :${text} into element :${locator}`);

    }

    /**
     * Type text with dealay (defaut dalay:500 ms)
     * @param locator 
     * @param text 
     * @param delay 
     */
    async type(locator: flexibleLocator, text: string, delay: number = 500): Promise<void> {
        await this.getLocator(locator).pressSequentially(text, { delay, timeout: this.defaultTimeOut });
        console.log(`Typed text :${text} into element :${locator}`);

    }


    async clear(locator: flexibleLocator): Promise<void> {
        await this.getLocator(locator).clear();
        console.log(`Cleared the element:${locator}`);

    }

    /**
     * Get text context of an element
     * @param locator 
     */
    async getText(locator: flexibleLocator): Promise<string | null> {
        const text = await this.getLocator(locator).textContent();
        return text;
    }

    /**
    * Get Inner Text of an element
    * @param locator 
    */
    async getInnerText(locator: flexibleLocator): Promise<string> {
        const text = await this.getLocator(locator).innerText();
        return text.trim();
    }


    /**
   * Get attribute value of an element
   * @param locator 
   */
    async getAttributeValue(locator: flexibleLocator, attributeName: string): Promise<string | null> {
        return await this.getLocator(locator).getAttribute(attributeName);

    }

    /**
 * Get input(entered) value of an element
 * @param locator 
 */
    async getInputValue(locator: flexibleLocator): Promise<string | null> {
        return await this.getLocator(locator).inputValue();

    }

    /**
* Get input(entered) value of an element
* @param locator 
*/
    async getAllInnerTExts(locator: flexibleLocator): Promise<string[]> {
        return await this.getLocator(locator).allInnerTexts();

    }

    //===================== Element Visibility and State Check ===================//


    /**
     * check element is hidden
     * @param locator 
     * @param timeout 
     * @returns 
     */

    async isHidden(locator: flexibleLocator): Promise<boolean> {

        return await this.getLocator(locator).isHidden();
    }

    /**
     * check element is enabled
     * @param locator 
     * @param timeout 
     * @returns 
     */
    async isEnabled(locator: flexibleLocator, timeout: number = 5000): Promise<boolean> {

        return await this.getLocator(locator).isEnabled();
    }

    /**
        * check element is disabled
        * @param locator 
        * @param timeout 
        * @returns 
        */
    async isDisabled(locator: flexibleLocator): Promise<boolean> {

        return await this.getLocator(locator).isDisabled({ timeout: this.defaultTimeOut });
    }

    /**
     * check element is checked
     * @param locator 
     * @returns 
     */
    async isChecked(locator: flexibleLocator,): Promise<boolean> {

        return await this.getLocator(locator).isChecked({ timeout: this.defaultTimeOut });
    }

    /**
     * check element is editable
     * @param locator 
     * @returns 
     */
    async isEditable(locator: flexibleLocator,): Promise<boolean> {

        return await this.getLocator(locator).isEditable({ timeout: this.defaultTimeOut });
    }

     /**
     * check element is visible
     * @param locator 
     * @returns 
     */
     async isVisible(locator: flexibleLocator,index?:number): Promise<boolean> {

        return await this.getLocator(locator,index).isVisible({ timeout: this.defaultTimeOut });
    }




    //===============wait utils======================//

    /**
     * wait for element to be visibble
     */
    async waitForElementVisible(locator: flexibleLocator, timeout: number = 5000): Promise<boolean> {
        try {
            await this.getLocator(locator).waitFor({ state: 'visible', timeout });
            return true;
        }
        catch {
            return false;
        }

    }

    /**
     * wait for element to be attache to DOM
     */
    async waitForElementAttached(locator: flexibleLocator, timeout: number = 5000): Promise<boolean> {
        try {
            await this.getLocator(locator).waitFor({ state: 'attached', timeout });
            return true;
        }
        catch {
            return false;
        }

    }

    /**
     * wait for element to be attache to DOM
     */
    async waitForPageLoad(state: 'load' | 'domcontentloaded' | 'networkidle'): Promise<void> {
        await this.page.waitForLoadState(state);
        console.log(`wait for page load state:${state}`);

    }

    /**
     * wait for a spectic timeout(static)
     */

    async sleep(timeOut: number): Promise<void> {
        this.page.waitForTimeout(timeOut);
        console.log(`waited for ${timeOut} ms`);
    }


    //==================Drop Down Util/Select Based Drp Downs===============//

    async selectByText(locator: flexibleLocator, text: string) {
        await this.getLocator(locator).selectOption({ label: text }, { timeout: this.defaultTimeOut });
        console.log(`seleted option ${text} from drop down ${locator}`);
    }

    async selectByValue(locator: flexibleLocator, value: string) {
        await this.getLocator(locator).selectOption({ value: value }, { timeout: this.defaultTimeOut });
        console.log(`seleted option ${value} from drop down ${locator}`);
    }

    async selectByIndex(locator: flexibleLocator, index: number) {
        await this.getLocator(locator).selectOption({ index: index }, { timeout: this.defaultTimeOut });
        console.log(`seleted option ${index} from drop down ${locator}`);
    }



}

