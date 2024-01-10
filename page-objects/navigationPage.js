const { expect } = require('@playwright/test');
/**
  * @param {import('playwright').Page} page
  */

class NavigationPage {
    constructor(page) {
        this.page = page;
        
        // you can keep it simple which means that write locators code inside the method, for example for formsLayoutsPage page.getByText('Forms'); defined into formsLayoutsPage not into counstructor for eassly debug and avoid confiusing in order to debug
        this.form = page.getByText('Forms');
        this.fomLayouts = page.getByText('Form Layouts');
        this.modal= page.getByRole('link', { name: 'Modal & Overlays' });
        this.toastr=page.getByRole('link', { name: 'Toastr' });
        this.tabelsAndDate = page.getByRole('link', { name: 'Tables & Data' });
        this.smartTable = page.getByRole('link', { name: 'Smart Table' });
        this.datePicker = page.getByRole('link', { name: 'Datepicker' });
    }

    async formsLayoutsPage() {
        await this.form.click();
        await this.fomLayouts.click();
    }
    async ModalOverlaysPage() {
        await this.modal.click();
        await this.toastr.click();
    }
    async SmartTablePage() {
        await this.tabelsAndDate.click();
        await this.smartTable.click();
    }
    async DatePickerPage() {
        await this.form.click();
        await this.datePicker.click();
    }

    // async _selectGroupMenuItem(groupItemMenue){
    //     const getMenuGroup = this.page.getByTitle(groupItemMenue)
    //     const expandedState= await getMenuGroup.getByAttribute('arial-expanded')
    //     if(expandedState ==='false'){
    //         await getMenuGroup.click();
    //     }
    // }

}

module.exports = { NavigationPage }