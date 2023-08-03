import { CommandStartedEvent, MongoGridFSChunkError } from "mongodb";
import mongoose from "mongoose";

const {Schema} = mongoose

const conect = 'mongodb+srv://gustavogr0217:A12345o@cluster0.gidrqhw.mongodb.net/db_Ahorros?retryWrites=true&w=majority'
mongoose.connect(conect, {useNewUrlParser: true, useUnifiedTopology: true});

const ahorroSchema = new Schema({
    cedula: Number,
    nombre: String,
    Apellido1: String,
    Apellido2: String,
    Deposito: Number
})  

const Ahorro = mongoose.model('ahorro',ahorroSchema)

const agregarAhorro = (req,res) =>{
    const ahorro = new Ahorro({
        cedula: Number(req.body.cedula),
        nombre: req.body.nombre,
        Apellido1: req.body.Apellido1,
        Apellido2: req.body.Apellido2,
        Deposito: Number(req.body.Deposito),
    })
    ahorro.save()
    .then(re =>{
        res.render('insertar')
    })
}



