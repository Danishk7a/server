const UserkycController =(req, res)=>{
  

    let name = req.body.name;
    let adhar = req.body.adhar;
    let phone = req.body.phone;
    let pan = req.body.pan;


console.log(name + ""+adhar+""+phone)
console.log(req.body)
console.log(req.file)

res.json({msg:"working"})
    
        
}

module.exports = UserkycController ;