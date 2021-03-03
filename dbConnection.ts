import mongoose = require('mongoose')

mongoose.connection.on('connected', function(){
    console.log('++++++++++++++++++++++')
    console.log('mongoose connected')

    console.log('++++++++++++++++++++++')
})

mongoose.connection.on('err', function(e){
    console.log('mongoose connection error', e)
})

mongoose.connection.off('disconnected', function(){
    console.log('mongoose disconnected')
})

export function connect() {
    // const uri = "mongodb+srv://<username>:<password>@firstcluster.4rc4s.mongodb.net/<dbname>?retryWrites=true&w=majority";
    let uri = "mongodb+srv://m001-student:m001-mongodb-basics@sandbox.cflxq.mongodb.net/m001-mongodb-basics";
    uri = "mongodb+srv://m001-student:m001-mongodb-basics@sandbox.cflxq.mongodb.net/pets";
    return mongoose.connect(uri);
}

