(function (notesController) {
    var data = require('../data');
    
    notesController.init = function (app) {
        app.get('/api/notes/:categoryName', function (req, res) {
            var categoryName = req.params.categoryName;
            data.getNotes(categoryName, function (err, note) {
                if (err) {
                    res.send(400, err);
                }
                res.set("Content-Type", "application/json");
                res.send(note.notes);
            });
        });
    }

}(module.exports));