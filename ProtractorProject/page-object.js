class BasePageObject {
    get featuresLink() {
        return element(by.css('[href="features"]'));
    }

    get resourcesName() {
        return element(by.css('[title="Resources"]'));
    }

    get searchField() {
        return element(by.css('[type="search"]'));
    }

    get homeLink() {
        return element(by.css('.nav-link.home'));
    }

    get searchResults() {
        return element(by.css('.search-area.ng-star-inserted'));
    }

    get docsMenuItem() {
        return element(by.css('[title="Docs"]'));
    }

    get buttonVertMenu() {
        return element(by.css('.hamburger.mat-button'));
    }

    get sideNav() {
        return element(by.css('.sidenav.mat-drawer'));
    }

    get verticalMenuItem(){
        return element(by.css('.vertical-menu-item.heading.ng-star-inserted'));
    }

    get submenuElement(){
        return element(by.css('.heading-children.level-1.expanded'));
    }

    get vertMenuItem(){
        return element(by.css('[title="The fundamentals of Angular"]'));
    }

    get subItem(){
        return element(by.css('[title="The basic building blocks of Angular applications."]'));
    }

    get subSubMenuItem(){
        return element(by.css('.heading-children.level-2.expanded'));
    }

    get title(){
        return element(by.css('#what-is-angular'));
    }

    get navigationBar(){
        return element(by.css('ul [role="navigation"]'));
    }

    get link(){
        return element(by.css('.link[title="日本語版"]'))
    }
}

class PageObject extends BasePageObject{
    get titleValue(){
        return super.title.getText();
    }

    get menuItemTitle(){
        return super.resourcesName.getText();
    }
}
module.exports=PageObject;