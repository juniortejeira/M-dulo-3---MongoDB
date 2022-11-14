const express = require('express');
const  bcryptjs = require('bcryptjs')
const Estudiantes = require('./schema')
const app = express();


app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.post('/api/profesores/crear-cuenta',async (req,res)=>{
    //datos solicitados
        let id = ObjectId(6)
        const user = req.body.user;
        const password = req.body.password;
    //comprobar que sean correctos los datos
    if(user=='admin' && password == '12345678'){
        //debe ser async                      (dato a incriptar, cantidad de incriptacion)
        let passwordHash = await bcryptjs.hash(password,8)
        res.json({
            menssage:'Autentificacion exitosa',
            user:user,
            passwordHash:passwordHash,
        });
    }else{
            res.json({menssage:'Ingrese correctamente las credenciales'})
         }
    
})

app.get('/compare',(req,res)=>{
    //guardamos el codificado de la password
    let hashSaved = "$2a$08$04UheAuyfyqJhRRaWAhHC.W3afF9D/E7PLFCdsZhWDLpqfFM4qO36";
    //let id = req.body.id
    //comparamos la password con la incriotacion
    let compare = bcryptjs.compareSync('12345678',hashSaved);
    if(compare){
        res.json('ok, datos correctos')
    }else{
        res.json('error')
    }
})



module.exports = users;