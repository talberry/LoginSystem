//server.js
import express from 'express';
import path from 'path';
import fs from 'fs';

const __dirname = path.resolve(path.dirname(''));

const port = process.env.PORT||3000;
const app = express();

app.use('client', express.static(path.join(__dirname, 'client')))

app.use(express.static(path.join(__dirname, 'client')));

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'client', 'main', 'index.html'));
});

app.get('/signUp/:username/:password', (req, res)=>{
    const info = JSON.parse(fs.readFileSync('./info.json'));
    const username = req.params.username;
    const password = req.params.password;
    const id = info.length;

    info.push({
        id: id,
        username: username,
        password: password
    });

    fs.writeFileSync('./info.json', JSON.stringify(info));
    res.send(info);
});


app.get('/removeUser/:id', (req, res)=>{
    const info = JSON.parse(fs.readFileSync('./info.json'));
    const id = req.params.id;
    const removedUser = info[id];

    info.slice(id );

    fs.writeFileSync('./info.json', JSON.stringify(info));

    res.send(removedUser);
});


app.get('/users', (req, res)=>{
    const info = JSON.parse(fs.readFileSync('./info.json'));
});


app.get('/removeAll', (req, res)=>{
    const info = JSON.parse(fs.readFileSync('./info.json'));
    const emptyArray = [];
    
    fs.writeFileSync('./info.json', JSON.stringify(emptyArray));

    res.send(info);
});


app.listen(port, ()=>{
    console.log('server running on port:'+port);
});