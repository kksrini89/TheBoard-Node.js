﻿(function (data) {
    var seedData = require('./seedData');
    var database = require('./database');
    
    data.getNoteCategories = function (next) {
        next(null, seedData.initialNotes);
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