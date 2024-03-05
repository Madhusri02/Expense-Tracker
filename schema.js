const mong =require('mongoose')

///defining scheme with help of mongoose

const ext_schema = new mong.Schema({
    amount : {
        type : Number 
    },
    catagory : {
        type : String
    },
    date : {
        type : Date 
    }
})

const expense = mong.model('expense_details' , ext_schema) //model(collection_name , attribute)

//exporting details

module.exports = {expense} //can export two or three ip/op