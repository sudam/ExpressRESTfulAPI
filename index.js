const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const genres = [
    {id:1, name: 'Drama'},
    {id:2, name: 'Thriller'},
    {id:3, name: 'Comedy'},
    {id:4, name: 'Adventure'}
];

// get all genres
app.get('/api/genres', (req,res) => {
   // get all genres
   res.send(genres);
});

// get genres by id
app.get('/api/genres/:id', (req,res) => {
    // check if requested genre exists
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) res.status(404).send('The Genre not found!');

    res.send (genre);
});

// post a new genre
app.post('/api/genres',(req,res) => {
    // validate the requested genre
    const { error } = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    // if valid, add new genre object 
    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };

    genres.push(genre);
    res.send(genre);
});

// update an existing genre
app.put('/api/genres/:id', (req,res) => {
    // check if the requested genre id exists
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('The Genre not found!');

    // validate the requested genre
    const { error } = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // if valid, update the with the new values
    genre.name = req.body.name;
    res.send(genre);
});

// delete an existing genre
app.delete('/api/genres/:id', (req,res)=>{
    // check if requested genre id exists
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('The Genre not found!');

    // if available, delete with the requested id, by looking at its indexs
    const index = genres.indexOf(genre);
    genres.splice(index, 1); // remove 1 item with above index
    res.send(genre);
});


// listen to a given port (PORT - environment in which the process run)
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${port}...`));

// validate input
function validateGenre(genre){
    const schema = {
        name: Joi.string().required()
    };
    return Joi.validate(genre, schema);
}