const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcrypt')
const Estudiante = require('./models/schema')
const users_veri = require('./models/users_schema')

const url = 'mongodb://127.0.0.1:27017/collage';

const app = express();


//rutas dinamicas
app.use(express.urlencoded({extended: true}))//para usar rutas dinamicas
app.use(express.json())//Esa expresion lee lo que vos pasas en el body de insomnia, y si es un json lo convierte a objeto de js





//=====================================verificacion de datos===================================

app.post('/api/profesores/crear-cuenta',async (req,res)=>{
  //datos solicitados
      //let id = ObjectId(6)
      const users = req.body.users;
      const password = req.body.passwords;
      //comprobar que sean correctos los datos
      
  
   
        //debe ser async                      (dato a incriptar, cantidad de incriptacion)
          let passwordHash = await bcrypt.hash(password,8)
          //const user =  await users_veri.insertOne({users});
          var usuario = await users_veri.create({passwords:passwordHash,users});
          res.json({
              menssage:'Autentificacion exitosa'       
              });
           
})

app.post('/api/profesores/crear-cuenta',async(req,res)=>{
  //guardamos el codificado de la password
  let usuario = req.body.users
  let password = req.body.passwords
 
  //igualamos los datos req en el body con la propiedad del users(squema)
  let match = await users_veri.findOne({users:usuario})
  console.log(match);
  //comparamos la password con la incriotacion
  let compare = bcrypt.compareSync(password,match.passwords);
  //el valor debuelto en compareSync es un booleano 
  if(compare == true){
      res.json('ok, datos correctos')
  }else{
      res.json('error')
  }
})













app.get('/', async (req, res) => {
    const estudiantes = await Estudiante.find();
    res.json(estudiantes) 
});

//=============================2-1=================================
//Creamos una funcion que busca por el valor ingresado en la ruta y luego oculta las cosas inecesarias
app.get('/api/estudiantes/grado/:valor', async (req, res) => {
  //requerimos el valor ingresado
    const valor = req.params.valor
    console.log(valor)
    //buscamos en la categoria grado el 'valor' ingresado
    const estudiantes = await Estudiante.find({grade:valor},{subjects:0, orientation:0,"grade": 0});
    res.json(estudiantes) 
});

//=============================2-2=================================
//Creamos una funcion que busca por el valor ingresado en la ruta y luego oculta las cosas inecesarias
app.get('/api/estudiantes/orientacion/:valor', async (req, res) => {
  //requerimos el valor ingresado
    const valor = req.params.valor
    console.log(valor)
    //buscamos en la categoria grado el 'valor' ingresado
    const estudiantes = await Estudiante.find({orientation:valor},{age:0, orientation:0});
    res.json(estudiantes) 
});

//=============================2-3=================================
app.get('/api/estudiantes/edad/mayor-de-edad', async (req, res) => {
    //buscamos en la categoria grado el 'valor' ingresado
    const estudiantes = await Estudiante.find({$and:[{"age":{$gte: 17}}]},{_id:0,age:0, orientation:0,subjects:0}).sort({"name":1});

    res.json(estudiantes) 
});

//=============================2-4=================================
app.get('/api/estudiantes/asignatura/:asig/:grado', async (req, res) => {
  //requerimos el valor ingresado
    const asignatura = req.params.asig
    console.log(asignatura)
    const grados = req.params.grado
    console.log(grados)
    const estudiantes = await Estudiante.find({$and: [{orientation: asignatura,grade:grados}]});
    res.json(estudiantes) 
});



/* 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); */

//=============================2-5=================================
app.post('/api/estudiantes/nuevo' , async (req, res) => {
    const newUsers = await Estudiante.create(req.body);
    res.json(newUsers)//respondemos con un json     
    console.log(req.body)
});






mongoose.connect(url)
 .then(async () => {
   app.listen('3000', () => {console.log("Server Iniciado")})
 })

