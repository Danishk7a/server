const connection = require('../../Connection')
const axios  = require('axios');

const SellCoinController = async (req, res)=>{


    // User Input
  
    let backedCoinPrice = 81.61;
    let inputAmount = req.body.amount;
    let inputSymbol = req.body.symbol;
    let custom = req.body.custom;
    let CoinPrice;

    if (!custom) {
    const Cp = await axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${inputSymbol}`);
    console.log(Cp.data.price)
    CoinPrice = Cp.data.price;
    }

    let backedCoin = inputSymbol.substr(inputSymbol.length - 4);
    let Coin = inputSymbol.substring(0, inputSymbol.length - 4);








    connection.query(`START TRANSACTION`,(err,res)=>{
        if(err) throw err;
        console.log("transaction applied")

    })

    connection.query(`SELECT * FROM wallet WHERE Userid ='${req.token.userid}'  AND currency ='${Coin}'`, (err,result)=>{
        // backend Coin ki entry hai isme ? checking..
        if(result.length){
    console.log("hai isme backed coin")
    // yaha chahiye backed
           
    if(result[0].quantity*CoinPrice > inputAmount ){
        let jnkn =  inputAmount / CoinPrice 
        let newQuantity =   result[0].quantity - jnkn;

       

        let sql = `UPDATE wallet SET ? WHERE UserId = ? AND currency = ?`
                        
        connection.query(sql,[{quantity:newQuantity} , req.token.userid , Coin],(err,result)=>{
            if(err) throw err;


            connection.query(`SELECT * FROM wallet WHERE  UserId='${req.token.userid}' AND currency = '${backedCoin}' `, (err,result)=>{
                if(err) throw err;
                    if(result.length){
                      
                         

                            let backedCoinQuantity  =   inputAmount/ backedCoinPrice;
                            let finalbackedCoinQuantity = result[0].quantity + backedCoinQuantity;
                            let sql = `UPDATE wallet SET ? WHERE UserId = ? AND currency = ?`;
                            connection.query(sql,[{quantity:finalbackedCoinQuantity}, req.token.userid, backedCoin],(err, result)=>{

                                if(err)throw err;
                                connection.query(`COMMIT`);
                                

                                 })
                            console.log('inside if')
                                    
                                let TH = `INSERT INTO transactionhistory (UserId , quantity , amount, currency , type) VALUES("${req.token.userid}", "${backedCoinQuantity}" , "${backedCoinPrice}" , "${backedCoin}" ,"debit")`


                                connection.query(TH,(err, results)=>{
                                    if(err) throw err;
                                    console.log("histry add hogyi")
                                
                                
                                })

                     



                    }else{

                            
                        let backedCoinQuantity  =   inputAmount/ backedCoinPrice;
                        let finalbackedCoinQuantity = result[0].quantity + backedCoinQuantity;
                            let sql = `INSERT INTO wallet (UserId,quantity,currency) VALUES("${req.token.userid}","${finalbackedCoinQuantity}" , "${backedCoin}")`
                            connection.query(sql,(err, result)=>{

                                if(err)throw err;
                                connection.query(`COMMIT`);
                                console.log("inside in ")
                              

                                let TH = `INSERT INTO transactionhistory (UserId , quantity , amount, currency , type) VALUES("${req.token.userid}", "${finalbackedCoinQuantity}" , "${backedCoinPrice}" , "${backedCoin}" ,"debit")`


                                connection.query(TH,(err, results)=>{
                                    if(err) throw err;
                                    console.log("histry add hogyi")
                                    return res.json({status:200,msg:"Payment Success"})
                                
                                
                                })



                            })

                    

                      

                        console.log("inside else")




                    }




            })




        
        
        })
        

          






    }else{
        // Second Else
        res.json({msg:`Not Suffiecient ${backedCoin} to buy ${Coin}`})

    }

    


}
    
    
    
    
    
    else{
                // First Else
            console.log("ni hai backed coin")
            res.json({msg:`Not Suffiecient ${Coin} to sell ${backedCoin}`})

            }


    })




















  
    
        
}

module.exports = SellCoinController;