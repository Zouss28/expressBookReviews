const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [{username:'Alain',password:123}];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const checkReview = (user,book) => {
    return book.reviews.hasOwnProperty(user);
}

const verifyUser = (username)=>{ 
    for(let i in users){
        if(users[i].username === username){
            return true;
        }
    }
    return false;
}
const authenticatedUser = (username,password)=>{ 
    for(let i in users){
        if(users[i].username === username){
            if(users[i].password === password){
                return true;
            }
        }
    }
    return false;
}

//only registered users can login
regd_users.post("/login", (req,res) => {
    let {username,password} = req.body;
    if(!username){
        return res.status(403).send("No Body");
    }
    else if(authenticatedUser(username,password)){
        let accessToken = jwt.sign({
            data:username
        },'access',{expiresIn:60*60});
        req.session.authorized = {accessToken};
        return res.status(200).send("User logged in");
    }
    res.send("NO such User Try registering");

});

regd_users.post('/register', (req,res) => {
    let {username,password} = req.body;
    let inUser = verifyUser(username);
    if(!username || !password){
        res.send("NO Username Or Password Provided");
    }
    else if(inUser){
        res.send("UserName Already registered");
    }
    users.push({'username':username,'password':password});
    res.send("Registered , You can try to loggin");
})

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    const review = req.query.review;
    const book = books[req.params.isbn];
    if(checkReview(req.user.data,book)){
        book.reviews[req.user.data]= review;
        books[req.params.isbn] = book;
        res.send("Review Updated");
    }
    book.reviews[req.user.data]= review;
    books[req.params.isbn] = book;
    res.send("Review Added");

});

regd_users.delete("/auth/review/:isbn", (req, res) => {
    const book = books[req.params.isbn];
    if(checkReview(req.user.data,book)){
        delete book.reviews[req.user.data];
        books[req.params.isbn] = book;
        res.send("Review Deleted");
    }
    res.send("You dont have a review");
})

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
