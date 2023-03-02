const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    res.send(JSON.stringify(books,null,4));
  });

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const id = req.params.isbn;
    if(id){
        res.send(books[id]);
    }
    res.send("They seems to be a problem");
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author;
    if(author){
        for(let i=1; i<=10;i++){
            if(books[i].author === author){
                res.send(books[i]);
            }
        }
        res.send("Unable to find Author");
    }
    res.send("No author provided");
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
    if(title){
        for(let i=1; i<=10;i++){
            console.log(books[i].title);
            if(books[i].title === title){
                res.send(books[i]);
            }
        }
        res.send("Unable to find the Book");
    }
    res.send("No Title provided");
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const id = req.params.isbn;
    if(id){
        for(let i in books){
            if(i === id){
                res.send(books[i].reviews);
            }
        }
        res.send("Unable to find the Book");
    }
    res.send("No ISBN provided");
});

public_users.get('/promise', (req,res) => {
    const prom = new Promise((resolve, reject) => {
        axios.get('https://alanjonse3-5000.theiadocker-1-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai')
        .then(response => {
            resolve(response.data);
        }).catch( err => {
            reject(err);
        });
    });
    prom.then(data => {
        res.send(JSON.stringify(books,null,4));
    }).catch(err =>{
        res.send(err);
    })
});

public_users.get('/promise/isbn/:isbn', (req,res) => {
    const isbn = req.params.isbn;
    const prom = new Promise((resolve, reject) => {
        axios.get(`https://alanjonse3-5000.theiadocker-1-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/isbn/${isbn}`)
        .then(response => {
            resolve(response.data);
        }).catch( err => {
            reject(err);
        });
    });
    prom.then(data => {
        res.send(data);
    }).catch(err =>{
        res.send(err);
    })
});

public_users.get('/promise/author/:author', (req,res) => {
    const author = req.params.author;
    const prom = new Promise((resolve, reject) => {
        axios.get(`https://alanjonse3-5000.theiadocker-1-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/author/${author}`)
        .then(response => {
            resolve(response.data);
        }).catch( err => {
            reject(err);
        });
    });
    prom.then(data => {
        res.send(data);
    }).catch(err =>{
        res.send(err);
    })
});

public_users.get('/promise/title/:title', (req,res) => {
    const title = req.params.title;
    const prom = new Promise((resolve, reject) => {
        axios.get(`https://alanjonse3-5000.theiadocker-1-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/title/${title}`)
        .then(response => {
            resolve(response.data);
        }).catch( err => {
            reject(err);
        });
    });
    prom.then(data => {
        res.send(data);
    }).catch(err =>{
        res.send(err);
    })
});

module.exports.general = public_users;
