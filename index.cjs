const moong =require('mongoose')
const ex = require('express')
const body_parser = require('body-parser')
const parse = require('cors')
//importing created package
const {expense} = require('./schema.js')


const run = ex()
run.use(body_parser.json())
run.use(parse())


async function connecto_data(){
    try{
    await moong.connect('mongodb+srv://madhusri0774:root1234@cluster1.ifoup3n.mongodb.net/Expense_Tracker?retryWrites=true&w=majority&appName=Cluster1')     
    const port = process.env.PORT  || 8000
    run.listen(port , function(){

        console.log("listening at port !")
        })
    }
    catch(error){
        console.log("error")


    }
}

//to add functionality to the 1st : add-expense 
run.post('/add_expense' ,async function(request , response){
    // console.log(request.body)  ** to print the data from postman
   try {
    await expense.create({
        "amount" : request.body.amount ,
        "catagory" : request.body.catagory ,
        "date" : request.body.date
    })
    response.status(200).json({
        "status" : "success" , //there should be status inside the response status
         "content " : "added !"
    })
    }
    catch(error){
    response.status(500).json({
        "status" : "failure" , //there should be status inside the response status
         "content " : "corrupted !" ,
         "error" : error
    })
  }
})


// to fetch the details from the database
run.get('/get_expense' , async function(request, response){
    try{
    const exp_data = await expense.find()
    response.status(200).json(exp_data)
    console.log("done everything !")
    }
    catch(error) {
        response.status(500).json({
            "status" : "not connected" ,
            "context" : "entry not available !"
        })
    }
})

//to delete the details from the database
run.delete('/delete_expense/:id' ,async function(request , response){
    console.log(request.params)
    try{
    const x = await expense.findById(request.params.id)
    console.log(x)
    if (x){
        await expense.findByIdAndDelete(request.params.id)
        response.status(201).json({
            "status" : " available !"
        })
    }
    else{
        
    response.status(404).json({
        "status" : " not available !"
    })
}

    }
    catch(error) {
        response.json({
            "status" : "error" ,
            "error" : error
        })
    }

})

run.patch('/edit_expense/:id' , async function(request , response){
    try{
        const edit = expense.findById(request.params.id)
    try{
    if(edit){
        await edit.updateOne({
            "amount" : request.body.amount ,
            "catagory" : request.body.catagory ,
            "date" : request.body.date
        })
        response.json({
            "status" : "updated !"
        })
    }
}
    catch(error){
        response.json({
            "status" : "error" ,
            "error" : error
            })
        }
     }
    catch(er){
        response.json({
            "status" : "error !" ,
            "error" : er

        })
    }
    }
 )

connecto_data()