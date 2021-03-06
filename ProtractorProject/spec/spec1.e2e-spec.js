let PageObject = require("../page-object");
let validation = require("../validator");
var packageJson = require("../package.json");
var packageLockJson = require("../package-lock.json");
validation.addSchema();
let po = new PageObject();
let EC = protractor.ExpectedConditions;

describe('testing the https://angular.io/docs page', function () {
    beforeEach(async function () {
        await browser.get('https://angular.io/docs');
    });

    it('checks whether submenus in vertical menu are displayed', async function () {
        await po.verticalMenuItem.click();
        expect(await po.submenuElement.isDisplayed()).toBe(true);
    });

    it('checks TAB key', async function () {
        await po.docsMenuItem.sendKeys(protractor.Key.TAB);
        expect(await po.menuItemTitle).toEqual('RESOURCES');
    });

    it('matches url', async function () {
        await po.featuresLink.click();
        expect(await browser.getCurrentUrl()).toMatch(/\/features/);
    });

    it('checks whether vertical menu is closed after clicking on the button ', async function () {
        await po.buttonVertMenu.click();
        expect(await po.sideNav.isDisplayed()).toBe(false);
    });

    it("checks whether subitems of the submenu in vertical menu are displayed", async function () {
        await po.vertMenuItem.click();
        await po.subItem.click();
        expect(await po.subSubMenuItem.isDisplayed()).toBe(true);
    });

    it('displays the search area', async function () {
        await po.searchField.sendKeys('a', protractor.Key.ENTER);
        await browser.wait(EC.visibilityOf(po.searchResults), 10000);
        expect(await po.searchResults.isDisplayed()).toBe(true);
    });

    it('verifies that the header matches the expected header', async function () {
        expect(await po.titleValue).toEqual('What is Angular?');
    });

    it('goes to the home page', async function () {
        await po.homeLink.click();
        expect(await browser.getCurrentUrl()).toEqual('https://angular.io/');
    });

    it("checks if it switched to the Japanese version", async function () {
        await po.link.click();
        expect(await browser.getCurrentUrl()).toEqual('https://angular.jp/');
    });
});

describe("JSON validation tests", function () {
    it("validate package.json", function () {
        validation.validateJSON("package", packageJson);
    });

    it("validate package-lock.json", function () {
        validation.validateJSON("package-lock", packageLockJson);
    });
});