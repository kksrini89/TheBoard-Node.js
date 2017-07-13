(function (homeController) {
    var data = require('../data');
    
    homeController.init = function (app) {
        app.get("/", function (req, res) {
            //res.render("jade/index", { title: "Express + Jade" }); (Haml like syntax)
            //res.render("ejs/index", { title: "Express + EJS" }); (Web forms like syntax)
            data.getNoteCategories(function (err, results) {
                res.render("index", { title: "Express + Vash" , error: err, categories: results });
            });            
        });
        app.post('/newCategory', function (req, res) {
            var categoryName = req.body.categoryName;
            data.createNewCategory(categoryName, function (err) {
                if (err) {
                    console.log(err);
                    res.redirect('/');
                } else {
                    res.redirect('/notes/' + categoryName);
                }
            });
        });
    }

}(module.exports));