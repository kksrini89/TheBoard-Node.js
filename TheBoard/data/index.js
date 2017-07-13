(function (data) {
    var seedData = require('./seedData');
    var database = require('./database');
    
    data.getNoteCategories = function (next) {
        //next(null, seedData.initialNotes);
        database.getDb(function (err, db) {
            if (err) {
                console.log("Failed to connect database! " + err);
            } else {
                db.notes.find().toArray(function (err, results) {
                    if (err)
                        next(err, null);
                    else {
                        next(null, results);
                    }
                });
            }
        });
    }
    
    data.createNewCategory = function (categoryName, next) {
        database.getDb(function (err, db) {
            if (err) {
                console.log("Failed to connect database! " + err);
            } else {
                var note = {
                    name : categoryName,
                    notes: []
                };
                db.notes.insert(note, function (err) { 
                    if (err)
                        next(err);
                    else
                        next(null);
                });
            }
        });
    }
    
    function seedDatabase() {
        database.getDb(function (err, db) {
            if (err) {
                console.log("Failed to seed database: " + err);
            } else {
                db.notes.count(function (err, count) {
                    if (err)
                        console.log("Failed to retrieve database count");
                    else {
                        if (count === 0) {
                            console.log("Seeding Database");
                            seedData.initialNotes.forEach(function (item) {
                                db.notes.insert(item, function (err) {
                                    if (err)
                                        console.log("Failed to insert note to database");
                                });
                            });
                        } else {
                            console.log("Already database seeded!");
                        }
                    }
                });
            }
        });
    }
    
    seedDatabase();

})(module.exports);