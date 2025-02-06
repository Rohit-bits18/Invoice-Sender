function take_shot(temp){
  if(temp == 1){
    take_Screen();
    return 'success';
  }else{
console.log('nhi nhi ')
  }
}


async function take_Screen () {
  const puppeteer = require('puppeteer');

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('http://localhost:4000/bill');
   

  try {
   
   await page.pdf({path:`./${Date.now()}invoice2.pdf`,format:'A4' });
  

  } catch (err) {
    console.log(`Error: ${err.message}`);
  } finally {
    await browser.close();
    console.log(`pdf has been captured successfully`);
    await browser.close();
  
    return;
  }
};


module.exports = {take_shot}

