
import { LoginPage } from '../pages/LoginPage.js';
import { test, expect } from '../fixtures/baseFixtures.js';

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



// eslint-disable-next-line no-empty-pattern
test('sample test @sample', async ({  }) => {
  expect(10).toBe(10);
});