import app from '../server';
import { connect } from '../dbConnection'

// connect();
// const client = await connect();
// console.log("db connection - ", client.db)
run().catch(console.dir);
app.listen(1337, 'localhost', function(err) {
    if(err) {
        console.log("error starting server", err);
        return;
    }
    console.log("server started successfully on http://localhost3:1337")
})

async function run() {
    try {
        const client = await connect();
        console.log("++++++++++++++++++++1");
        // console.log("client - ", client.Schema.Types)

        console.log("++++++++++++++++++++1");
    } finally {
      // Ensures that the client will close when you finish/error
    //   await client.close();
    }
  }
