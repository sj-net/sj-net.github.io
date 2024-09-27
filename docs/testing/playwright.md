---
title: Playwright
parent: Testing
layout: default
published: true
grand_parent: My Docs
---

### How to extend the page object in the playwright.
---

I googled a lot to find it but officially there are no docs for this. So after a lot of research I found a way to do it. 

This is the typescript version. 

```ts
import { test as baseTest, Locator, Page } from '@playwright/test';
import { UserCredential } from '@firebase/auth';
import { FirebaseError } from 'firebase/app';
type MyPage = {
    navigateAsync: (testId: string) => Promise<void>,
    findTextInput: (testId: string) => {
        setCursorAt: (position: number) => Promise<void>
        selectText: (startPosition: number, endPosition: number) => Promise<void>
    }
}
type MyFixtures = {
    auth: {
        loginAsync: (user: any) => Promise<UserCredential | FirebaseError>
        logoutAsync: () => Promise<void>
    },
    page: MyPage & Page,
}
export const test = baseTest.extend<MyFixtures>({
    page: ({ page }: { page: MyPage & Page }, use) => {
        page.navigateAsync = async (testId: string) => await page.getByTestId(testId).click();
        page.findTextInput = (testId: string) => {
            let textInput = page.getByTestId(testId) as Locator;
            return {
                selectText: async (startPosition: number, endPosition: number) => {
                    await textInput.waitFor();
                    await textInput.evaluate((el, { startPosition, endPosition }) => {
                        (el as HTMLInputElement).setSelectionRange(startPosition, endPosition)
                    }, { startPosition, endPosition });;
                },
                setCursorAt: async (position: number) => {
                    await textInput.waitFor();
                    await textInput.evaluate((el, position) => {
                        (el as HTMLInputElement).setSelectionRange(position, position)
                    }, position);
                }
            }
        }
        use(page);
    },
    auth: ({ page }, use) => {
        use({
            loginAsync: async (user) => await page.evaluate(async (user: { email: string; displayName: string; }) => {
                return await (window as any).firebase.login(user.email, user.displayName);
            }, user),
            logoutAsync: async () => {
                await page
                    .locator(`button[data-testid=menu-logout]`)
                    .filter({ has: page.locator(':not([hidden]), :not([style*="display: none"])') })
                    .click();
            },
        })
    },
});
export const expect = test.expect;
```

Now instead of using test and expect from `import test, { expect } from '@playwright/test';`, import from the above custom test and expect.

- Usage 

```ts
import { expect, test } from './../baseFixtures';
test.describe('Suite 1', () => {
    test('Test 1', async ({ page, auth }) => {
        await page.goto('/');
        await auth.loginAsync({ email: '', passowrd: '' });
        await page.navigateAsync('menu-home');
        // assert logic skipped.
    });
});
```