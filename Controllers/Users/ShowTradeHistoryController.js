const connection = require('../../Connection')

const ShowTradeHistoryController =(req, res)=>{


        let sql = `SELECT * FROM transactionhistory WHERE UserId = "${req.token.userid}"`

        connection.query(sql , (err , results)=>{

            if(results.length){


                res.json(results.reverse())

            }
            else{

                // res.json({msg:"Nothing to Show" , status:400})
                // res.send()
            }



        })

}

module.exports = ShowTradeHistoryController;