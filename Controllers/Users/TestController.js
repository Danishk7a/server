const axios = require("axios");
const connection = require("../../Connection");

// URL https://api.binance.com/api/v3/ticker/price?symbol=

const TestController = async (req, res, next) => {
  // User Input

  let backedCoinPrice = 81.61;
  let inputAmount = req.body.amount;
  let inputSymbol = req.body.symbol;
  let custom = req.body.custom;
  let CoinPrice;

  if (!custom) {
    const Cp = await axios.get(
      `https://api.binance.com/api/v3/ticker/price?symbol=${inputSymbol}`
    );
    console.log(Cp.data.price);
    CoinPrice = Cp.data.price;
  }

  let backedCoin = inputSymbol.substr(inputSymbol.length - 4);
  let Coin = inputSymbol.substring(0, inputSymbol.length - 4);

  //    ====================================Custom process========================================

  if (custom) {
    // CoinPrice = req.body.Cprice
    CoinPrice = req.body.Cprice;
    console.log("this is Creq" + req.body.Cprice);

    connection.query(`START TRANSACTION`, (err, res) => {
      if (err) throw err;
      console.log("transaction applied");
    });

    connection.query(
      `SELECT * FROM wallet WHERE Userid ='${req.token.userid}'  AND currency ='${backedCoin}'`,
      (err, result) => {
        // backend Coin ki entry hai isme ? checking..
        if (result.length) {
          console.log("hai isme backed coin");
          // yaha chahiye backed

          if (result[0].quantity * backedCoinPrice > inputAmount) {
            let jnkn = inputAmount / backedCoinPrice;
            let newBackedQuantity = result[0].quantity - jnkn;

            let sql = `UPDATE wallet SET ? WHERE UserId = ? AND currency = ?`;

            connection.query(
              sql,
              [{ quantity: newBackedQuantity }, req.token.userid, backedCoin],
              (err, result) => {
                if (err) throw err;

                connection.query(
                  `SELECT * FROM wallet WHERE  UserId='${req.token.userid}' AND currency = '${Coin}' `,
                  (err, result) => {
                    if (err) throw err;
                    if (result.length) {
                      console.log("this i s coin price" + "" + CoinPrice);
                      let CoinQuantity = inputAmount / CoinPrice;
                      let finalCoinQuantity = result[0].quantity + CoinQuantity;
                      console.log("this is final q" + finalCoinQuantity);

                      let sql = `UPDATE wallet SET ? WHERE UserId = ? AND currency = ?`;
                      connection.query(
                        sql,
                        [
                          { quantity: finalCoinQuantity },
                          req.token.userid,
                          Coin,
                        ],
                        (err, result) => {
                          if (err) throw err;
                          connection.query(`COMMIT`);
                          // update price and quantity
                          let upsql = `SELECT * FROM coinlist WHERE symbol="${inputSymbol}"`;
                          connection.query(upsql, (err, result) => {
                            if (err) throw err;
    
                            let updatedCustomQuan = result[0].quantity - CoinQuantity
                              let updatedCustomPrice =  result[0].price + 0.1
                            connection.query(
                              `UPDATE coinlist SET quantity = "${updatedCustomQuan}", price = "${updatedCustomPrice}" WHERE symbol="${inputSymbol}" `,
        
                              (err, resin) => {
                                console.log( updatedCustomQuan)
                                console.log( updatedCustomPrice)
                                console.log();
                                if (err) throw err;
                                console.log("all done and set");
                                let insertcustom = `INSERT INTO customcoin (symbol , quantity, price, type) VALUES("${inputSymbol}", "${updatedCustomQuan}" , "${updatedCustomPrice}" , "${1}")`;
                                connection.query(insertcustom,(err,resu)=>{
                                    if(err) throw err;
                                    console.log("final log done")

                                })


                              }
                            );
                          });
                        }
                      );
                      console.log("inside if");

                      // transaction histry
                      let TH = `INSERT INTO transactionhistory (UserId , quantity , amount, currency , type) VALUES("${req.token.userid}", "${CoinQuantity}" , "${CoinPrice}" , "${Coin}" ,"credit")`;

                      console.log("yaha thik h idhr sb");
                      connection.query(TH, (err, results) => {
                        if (err) throw err;
                        console.log("histry add hogyi");
                        return res.json({
                          status: 200,
                          msg: "Payment Success",
                        });
                      });
                    } else {
                      let CoinQuantity = inputAmount / CoinPrice;
                      let finalCoinQuantity = CoinQuantity;
                      let info = {
                        Price: CoinPrice,
                        quantity: finalCoinQuantity,
                        currency: Coin,
                        type: "credit",
                      };
                      req.transaction = info;
                      let sql = `INSERT INTO wallet (UserId,quantity,currency) VALUES("${req.token.userid}","${finalCoinQuantity}" , "${Coin}")`;
                      connection.query(sql, (err, result) => {
                        if (err) throw err;
                        connection.query(`COMMIT`);
                        console.log("inside in ");

                        let TH = `INSERT INTO transactionhistory (UserId , quantity , amount, currency , type) VALUES("${req.token.userid}", "${finalCoinQuantity}" , "${CoinPrice}" , "${Coin}" ,"credit")`;

                        connection.query(TH, (err, results) => {
                          if (err) throw err;
                          console.log("histry add hogyi");
                          return res.json({
                            status: 200,
                            msg: "Payment Success",
                          });
                        });
                      });

                      console.log("inside else");
                    }
                  }
                );
              }
            );
          } else {
            // Second Else
            return res.json({
              status: 400,
              msg: `Not Suffiecient ${backedCoin}`,
            });
          }
        } else {
          // First Else
          console.log("ni hai backed coin");
          return res.json({
            status: 400,
            msg: `Not Suffiecient ${backedCoin}`,
          });
        }
      }
    );

    return 0;
  }

  //    ====================================Custom process========================================

  connection.query(`START TRANSACTION`, (err, res) => {
    if (err) throw err;
    console.log("transaction applied");
  });

  connection.query(
    `SELECT * FROM wallet WHERE Userid ='${req.token.userid}'  AND currency ='${backedCoin}'`,
    (err, result) => {
      // backend Coin ki entry hai isme ? checking..
      if (result.length) {
        console.log("hai isme backed coin");
        // yaha chahiye backed

        if (result[0].quantity * backedCoinPrice > inputAmount) {
          let jnkn = inputAmount / backedCoinPrice;
          let newBackedQuantity = result[0].quantity - jnkn;

          let sql = `UPDATE wallet SET ? WHERE UserId = ? AND currency = ?`;

          connection.query(
            sql,
            [{ quantity: newBackedQuantity }, req.token.userid, backedCoin],
            (err, result) => {
              if (err) throw err;

              connection.query(
                `SELECT * FROM wallet WHERE  UserId='${req.token.userid}' AND currency = '${Coin}' `,
                (err, result) => {
                  if (err) throw err;
                  if (result.length) {
                    let CoinQuantity = inputAmount / CoinPrice;
                    let finalCoinQuantity = result[0].quantity + CoinQuantity;
                    let sql = `UPDATE wallet SET ? WHERE UserId = ? AND currency = ?`;
                    connection.query(
                      sql,
                      [{ quantity: finalCoinQuantity }, req.token.userid, Coin],
                      (err, result) => {
                        if (err) throw err;
                        connection.query(`COMMIT`);
                      }
                    );
                    console.log("inside if");

                    let TH = `INSERT INTO transactionhistory (UserId , quantity , amount, currency , type) VALUES("${req.token.userid}", "${CoinQuantity}" , "${CoinPrice}" , "${Coin}" ,"credit")`;

                    connection.query(TH, (err, results) => {
                      if (err) throw err;
                      console.log("histry add hogyi");
                      return res.json({ status: 200, msg: "Payment Success" });
                    });
                  } else {
                    let CoinQuantity = inputAmount / CoinPrice;
                    let finalCoinQuantity = CoinQuantity;
                    let info = {
                      Price: CoinPrice,
                      quantity: finalCoinQuantity,
                      currency: Coin,
                      type: "credit",
                    };
                    req.transaction = info;
                    let sql = `INSERT INTO wallet (UserId,quantity,currency) VALUES("${req.token.userid}","${finalCoinQuantity}" , "${Coin}")`;
                    connection.query(sql, (err, result) => {
                      if (err) throw err;
                      connection.query(`COMMIT`);
                      console.log("inside in ");

                      let TH = `INSERT INTO transactionhistory (UserId , quantity , amount, currency , type) VALUES("${req.token.userid}", "${finalCoinQuantity}" , "${CoinPrice}" , "${Coin}" ,"credit")`;

                      connection.query(TH, (err, results) => {
                        if (err) throw err;
                        console.log("histry add hogyi");
                        return res.json({
                          status: 200,
                          msg: "Payment Success",
                        });
                      });
                    });

                    console.log("inside else");
                  }
                }
              );
            }
          );
        } else {
          // Second Else
          return res.json({
            status: 400,
            msg: `Not Suffiecient ${backedCoin}`,
          });
        }
      } else {
        // First Else
        console.log("ni hai backed coin");
        return res.json({ status: 400, msg: `Not Suffiecient ${backedCoin}` });
      }
    }
  );
};

module.exports = TestController;
