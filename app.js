const axios = require('axios');
const puppeteer = require('puppeteer');
const fs = require('fs');



async function scrapeStockPrice() {
    const browser = await puppeteer.launch({
        headless: false
      });
    const page = await browser.newPage();
    await page.goto('https://www.bseindia.com/markets/equity/EQReports/HighLow.html?Flag=H',{ waitUntil: 'networkidle2'}); // Replace with the actual URL of the website
      
   
    try {
        const data = await page.evaluate(() => {
            const rows = Array.from(document.querySelectorAll('tr.ng-scope'));
            const rowData=[];
            rows.forEach((row) => {
                const obj={};
                const tdElement = row.querySelector('td.tdcolumn.text-left');
                const price = row.querySelectorAll('td.tdcolumn.text-right.ng-binding');
                const ltp=price[0].textContent;
                const high=price[1].textContent;
                obj.symbol= tdElement.getAttribute('title');
                obj.ltp=ltp;
                obj.high=high;
                rowData.push(obj);
              });
          
        
            return rowData;
          });
        
          console.log(data);
        
      } catch (error) {
        console.error('Error:', error);
      } 
       
    await browser.close();
  }
  
  scrapeStockPrice();

  