﻿(function (homeController) {
    var data = require('../data');
    var auth = require('../auth/auth');
    
    homeController.init = function (app) {
        app.get("/", function (req, res) {
            //res.render("jade/index", { title: "Express + Jade" }); (Haml like syntax)
            //res.render("ejs/index", { title: "Express + EJS" }); (Web forms like syntax)
            data.getNoteCategories(function (err, results) {
                res.render("index", {
                    title: "Express + Vash" , 
                    error: err, 
                    categories: results,
                    newCatError: req.flash('newCatError'),
                    user: req.user
                });
            });
        });
        
        app.get("/notes/:categoryName", auth.ensureAuthenticated, function (req, res) {
            res.render("SPA-Views/notes", { title: req.params.categoryName, user: req.user });
        });
        
        app.post('/newCategory', auth.ensureAuthenticated, function (req, res) {
            var categoryName = req.body.categoryName;
            data.createNewCategory(categoryName, function (err) {
                if (err) {
                    console.log(err);
                    req.flash('newCatError', err);
                    res.redirect('/');
                } else {
                    res.redirect('/notes/' + categoryName);
                }
            });
        });
    }

}(module.exports));