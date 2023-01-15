const connection = require("../../Connection");
const axios = require("axios");
const InternalWithdrawController = async (req, res) => {
  let coin = req.body.wcoin;
  let amount = req.body.wamount;
  let email = req.body.wemail;
  let coinPrice = 81.61;

  if (coin !== "USDT") {
    const Cp = await axios.get(
      `https://api.binance.com/api/v3/ticker/price?symbol=${coin}USDT`
    );
    console.log("this is coin price" + Cp);
    console.log("this is coin price" + Cp.data.price);
    coinPrice = Cp.data.price;
  }

  connection.query(
    `SELECT * FROM wallet WHERE currency ="${coin}" AND UserId ="${req.token.userid}"`,
    (err, result) => {
      if (err) throw err;
      console.log(result[0].quantity);
      // console.log(result);

      connection.query(
        `SELECT * from users WHERE email = "${email}" `,
        (errr, response) => {
          if (errr) throw errr;
          // console.log(response)
          if (response.length) {
            if (result[0].quantity * coinPrice >= amount) {
              // console.log("everything is good  your current Coin is " + result[0].quantity*coinPrice  )

              connection.query(`START TRANSACTION`, (err, res) => {
                if (err) throw err;
                console.log("transaction applied");

                connection.query(
                  `UPDATE wallet SET quantity = "${updatedCustomQuan}", price = "${updatedCustomPrice}" WHERE symbol="${inputSymbol}`
                );
              });
            } else {
              res.json({ status: 400, msg: "insuffiecient amount" });
              console.log("ni h balance itna isme");
            }
          } else {
            res.json({ status: 400, msg: "User not found" });
            console.log("user ni h isme");
          }
        }
      );
    }
  );

  // console.log(amount)
  // console.log(email)
  // console.log(coin)

  // res.json({msg:"working hogya sahi h "})
};

module.exports = InternalWithdrawController;
