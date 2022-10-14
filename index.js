
import express from 'express'
import dotenv from 'dotenv'
import rutas from './src/workoutRoutes/workoutRoutes.js'
import cors from 'cors'
dotenv.config();

const app = express();
// const whiteList = [process.env.FRONTEND_URL]
// const corsOptions = {
//     origin: function (origin, callback) {
//       if(whiteList.includes(origin)){
//           callback(null, true)
//           return
//       }
//         callback(new Error('Not allowed by CORS'))
//     }
// }

app.use(cors())
app.use(express.json());
app.use('/api/museum', rutas)

const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=>{
    console.log('Servidor conectado');
}) 