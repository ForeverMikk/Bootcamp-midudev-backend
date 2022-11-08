const express = require('express');
const app = express();

app.use(express.json());

let notes = [
    {
        "id": 1,
        "content": "Hola como estas esto e una prueba",
        "date": "2019-05-30T19:20:14.298Z",
        "important": true
    },
    {
        "id": 2,
        "content": "Hola si estas? esto e una prueba",
        "date": "2019-05-30T19:20:14.298Z",
        "important": false
    },
    {
        "id": 3,
        "content": "Hola no estas?",
        "date": "2019-05-30T19:20:14.298Z",
        "important": true
    }
]

// const app = http.createServer((request, response) => {
//     response.writeHead(200, {'Content-Type': 'application/json'});
//     response.end(JSON.stringify(notes));
// });

app.get('/', (request, response) => {
    response.send('<h1>Hello Worlds</h1>');
})

app.get('/api/notes', (request, response) => {
    response.json(notes);
})

app.get('/api/notes/:id', (request, response) => {

    const id = Number(request.params.id);
    const note = notes.find(note => note.id === id);
    
    if(note) {
        response.json(note);
    } else {
        response.status(404).end();
    }
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id);

    notes = notes.filter(note => note.id !== id);
    response.status(204).end();
})

app.post('/api/notes', (request, response) => {
    const note = request.body;

    if(!note || !note.content) {
        return response.status(400).json({
            error: 'Note Content is Missing'
        })    
    }

    const ids = notes.map(note => note.id);
    const maxId = Math.max(...ids);

    const newNote = {
        id: maxId + 1,
        content: note.content,
        important: typeof note.important !== 'undefined' ? note.important : false,
        date: new Date().toISOString()
    }

    notes = [...notes, newNote];

    response.stattus(201).json(newNote);
})

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server corriendo en puerto ${PORT}`);
});
