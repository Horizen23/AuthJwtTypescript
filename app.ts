import express from 'express';
import router from './src/router';
import cors from 'cors'
import { PORT } from './src/config/token';
import dbConfig from './src/config/db'
import db from './src/model'


const app = express()
const Role = db.Role;
db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    // initial();
  })
  .catch((err:any) => {
    console.error("Connection error", err);
    process.exit();
});

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 20
}


app.use(cors(corsOptions))
app.use(express.json());
app.use('/',router)
  
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
  




function initial() {
  Role.estimatedDocumentCount((err:any, count:any) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save((err:any) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save((err:any) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save((err:any) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'admin' to roles collection");
      });
    }
  });
}
