
import { LoginPage } from '../pages/LoginPage.js'
import { test, expect } from '../fixtures/baseFixtures.js'

test('verify valid login @login ',

  {
    annotation: [
      { type: 'epic', description: 'EPIC 100 - Design login page for open Cart APP' },
      { type: 'feature', description: 'Login Page Feature' },
      { type: 'story', description: 'US 50 -user can login to app' },
      { type: 'severity', description: 'Blocker' },
      { type: 'owner', description: 'Vanita K' },
    ]
  }
  , async ({ homePage }) => {

    await expect(homePage.page).toHaveTitle('My Account');

  });



test.skip('verify invalid login @wip', async ({ page, baseURL }) => {
  //AAA
  let loginPage = new LoginPage(page);
  await loginPage.goToLoginPage(baseURL);
  await loginPage.doLogin('pwtest@nal.com', 'test123');
  const errorMesg = await loginPage.getInvalidLoginMessage();
  expect(errorMesg).toContain('Warning: No matcth for E-Mail Address and/or Password.');
});