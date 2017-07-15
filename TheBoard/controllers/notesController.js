(function (notesController) {
    var data = require('../data');
    
    notesController.init = function (app) {
        /*
         * GET notes for category name
         */
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
        
        /*
         * Save note for corresponding category name
         */
        app.post('/api/notes/:categoryName', function (req, res) {
            var categoryName = req.params.categoryName;
            var noteToInsert = {
                note: req.body.note,
                color: req.body.color,
                author: "Srinivasan"
            }
            data.addNote(categoryName, noteToInsert, function (error) {
                if (error) {
                    res.send(400, "Failed to add note to data store");
                } else {
                    res.set("Content-Type", "application/json");
                    res.send(201, noteToInsert);
                }
            });
        });
    }

}(module.exports));