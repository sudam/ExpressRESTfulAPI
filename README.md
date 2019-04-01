# ExpressRESTfulAPI

Building a RESTful API using Express JS.
Eg: CRUD functions to manipulate Genres table in a Movies database.

## Resources

- Node.JS [https://nodejs.org](https://nodejs.org/)
- Express [http://expressjs.com/](http://expressjs.com/)
- npm
	- nodemon - to watch for changes in files and automatically restart the node process (for development)
	- Joi - to perform input validation

## Steps

- Install Node.JS
- Install Express and load Express in the application
- Install Joi and load it in the application
- To pass JSON object with the body of the request, we need to use express.json() in the top
	- `app.use(express.json());`

#### Load Express and Joi   

    const Joi = require('joi');
    const express = require('express');
    const app = express();

#### Listen to a given port 
    const port = process.env.PORT  ||  3000;    
    app.listen(port, () =>  console.log(`Listening to port ${port}...`));

#### Function to validate input
   
    function validateGenre(genre){
	    const schema  = {
		    name: Joi.string().required()
	    };
	    return Joi.validate(genre, schema);
    }
#### Sample data array

    const  genres  = [    
	    {id:1, name:  'Drama'},    
	    {id:2, name:  'Thriller'},    
	    {id:3, name:  'Comedy'},    
	    {id:4, name:  'Adventure'}    
    ];

## Methods
#### GET (Get all items)
    app.get('/api/genres', (req,res) => {       
	    res.send(genres);    
    });
    
#### GET (Get item by id)
    app.get('/api/genres/:id', (req,res) => {  
	    const  genre  =  genres.find(g  =>  g.id  ===  parseInt(req.params.id));    
	    if(!genre) res.status(404).send('The Genre not found!');    
	    res.send (genre);
    });
    
#### POST (Add new item)
    app.post('/api/genres',(req,res) => {
	    const { error } =  validateGenre(req.body);    
	    if(error) return  res.status(400).send(error.details[0].message);    
	    const  genre  = {   
		    id:  genres.length  +  1,
		    name:  req.body.name    
	    };  
	    genres.push(genre);
	    res.send(genre);
    });

#### PUT (Edit an existing item)

    app.put('/api/genres/:id', (req,res) => { 
	    const  genre  =  genres.find(g  =>  g.id  ===  parseInt(req.params.id));
	    if(!genre) return  res.status(404).send('The Genre not found!');
	    const { error } =  validateGenre(req.body);
	    if(error) return  res.status(400).send(error.details[0].message);
	    genre.name  =  req.body.name;
	    res.send(genre);
    });

#### DELETE (Edit an existing item)

    app.delete('/api/genres/:id', (req,res)=>{
	    const  genre  =  genres.find(g  =>  g.id  ===  parseInt(req.params.id));
	    if(!genre) return  res.status(404).send('The Genre not found!');
	    const  index  =  genres.indexOf(genre);
	    genres.splice(index, 1);
	    res.send(genre);
    });
