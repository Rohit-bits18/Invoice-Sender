const puppeteer = require('puppeteer');

function bill(req,res) {

    if(req.body){
        const body = req.body;
        const totals = calculateTotal(body);    
     
        console.log(body)

        res.render('Bill.ejs', {
            body: body,
            tp: totals.subtotalPrice,
            tq: totals.totalQuantity,
            net: totals.total
        });

      const pdf =async ()=> {
        
    
    const html = await new Promise((resolve, reject) => {
        res.render('Bill.ejs', {
            body: body,
            tp: totals.subtotalPrice,
            tq: totals.totalQuantity,
            net: totals.total
        }, (err, html) => {
            if (err) reject(err);
            resolve(html);
        });
    });

    console.log(html); 
    await take_Screen(html);

    }

     pdf();
    
        }else{
            return;
        }
   
}



function calculateTotal(obj) {
    let totalQuantity = 0;
    let subtotalPrice = 0;

   
    for (let key in obj) {
        if (key.startsWith('quantity')) {
            const index = key.replace('quantity', '');  
            const quantity = parseInt(obj[key], 10);    
            totalQuantity += quantity;  
            const priceKey = 'price' + index;  
            const price = parseInt(obj[priceKey], 10);  
            subtotalPrice += quantity * price;  
        }
    }

    let total = subtotalPrice + subtotalPrice/10;

    return { totalQuantity, subtotalPrice,total };
}


async function take_Screen (html) {
 
  
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
      
     
  
    try {
        await page.setContent(html);
     
     await page.pdf({path:`./Your-invoice.pdf`,format:'A4' });
    
  
    } catch (err) {
      console.log(`Error: ${err.message}`);
    } finally {
      await browser.close();
      console.log(`pdf has been captured successfully`);
      await browser.close();
    
      return;
    }
  };
  
  
 
  

module.exports={bill}


