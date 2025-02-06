const {take_shot} = require('./Genpdf');

function bill(req,res) {

    if(req.body){
        const body = req.body;
        const totals = calculateTotal(body);    
        let temp = 0;
        console.log(body)

      const pdf =()=> {
        
        res.render('Bill.ejs', {
            body: body,
            tp: totals.subtotalPrice,
            tq: totals.totalQuantity,
            net: totals.total
        });
                // temp = 1;

                // if(temp === 1){
                //     const ans = take_shot(1);
                //     return ans;
                // }
    }

    const ans =  pdf();
    console.log(ans)
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

module.exports={bill}


