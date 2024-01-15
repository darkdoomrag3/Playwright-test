const { test, expect } = require('@playwright/test');

   /**
   * @param {import('@playwright/test').Page} page
   */


   class DatePicker{
    constructor(page){
        this.page=page;
    }
    async singelDatePicker(nextDate){
        const calendarField = this.page.getByPlaceholder('Form Picker');
        await calendarField.click();
        let currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + nextDate); // Add days to the current date
    
        const expectedDate = currentDate.getDate().toString();
        const expectedMonthShow = currentDate.toLocaleString('en-US', { month: 'short' });
        const expectedYear = currentDate.getFullYear().toString();
        const day = currentDate.toLocaleString('en-US', { weekday: 'short' });
        const month = currentDate.toLocaleString('en-US', { month: 'short' });
        const dayOfMonth = String(currentDate.getDate()).padStart(2, '0');
        const year = currentDate.getFullYear();
        const time = currentDate.toTimeString().split(' ')[0];
        const timeZoneOffsetHours = Math.abs(currentDate.getTimezoneOffset() / 60);
        const timeZoneOffsetSign = currentDate.getTimezoneOffset() > 0 ? '-' : '+';
        const timeZone = `GMT${timeZoneOffsetSign}${String(timeZoneOffsetHours).padStart(2, '0')}:00`;
    
        const expectedDate2 = `${day} ${month} ${dayOfMonth} ${year} ${time} ${timeZone}`;
        console.log(expectedDate2);
    
        await this.page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate, { exact: true }).click();
    }

    async rangeDatePicker(start, end){
        
        const calendarField = this.page.getByPlaceholder('Range Picker');
        await calendarField.click();
        let firsttDate = new Date();
        firsttDate.setDate(firsttDate.getDate() + start); 
        let secondDate = new Date();
        secondDate.setDate(firsttDate.getDate() + end); 

        const firstExpectedDate = firsttDate.getDate().toString();
        const secondExpectedDate = secondDate.getDate().toString();
        await this.page.locator('[class="range-cell ng-star-inserted"]').getByText(firstExpectedDate, { exact: true }).click();
        await this.page.locator('[class="range-cell ng-star-inserted"]').getByText(secondExpectedDate, { exact: true }).click();
    }

}

module.exports = { DatePicker }