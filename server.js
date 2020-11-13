import express from 'express';
import path from 'path';
import fs from 'fs';

const __dirname = path.resolve(path.dirname('')); 
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'client')));

app.use('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'client', 'main', 'index.html'));
});

app.use('/signUp/:username/:password', (req, res)=>{
    const info = JSON.parse(fs.readFileSync('./info.json'));
    const username = req.params.username;
    const password = req.params.password;

    info.push({
        username: username,
        password: password
    });

    fs.writeFileSync('./info.json', JSON.stringify(info));
    res.send(info);
});

app.listen(port, ()=>{
    console.log(`App started on port: ${port}`);
});

