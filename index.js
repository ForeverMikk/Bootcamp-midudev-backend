const http = require('http');

const notes = [
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

const app = http.createServer((request, response) => {
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.end(JSON.stringify(notes));
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server corriendo en puerto ${PORT}`);
