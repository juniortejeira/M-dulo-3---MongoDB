const { Schema, model } = require('mongoose');

const Estudiantes = new Schema ({
    name: String,
    age: Number,
    grade: Number,
    group: String,
    user:String,
    password:String,
    subjects: [String],
    orientation: String || null
},{versionKey: false});

module.exports = model('Estudiante', Estudiantes); 