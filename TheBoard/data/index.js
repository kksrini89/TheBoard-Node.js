(function (data) {
    var seedData = require('./seedData');
    var database = require('./database');
    
    /*
     * Get Notes for Category Name - GET
     * RETURNS - Notes
     */
    data.getNotes = function (categoryName, next) {
        database.getDb(function (err, db) {
            if (err) {
                console.log("Failed to connect database! " + err);
            } else {
                db.notes.findOne({ name: categoryName }, next);
            }
        });
    }
    
    /*
     * Get Note Categories - GET
     * RETURNS - Array[categories]
     */
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
    
    /*
     * Creating a New Category - CREATE
     */
    data.createNewCategory = function (categoryName, next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err);
            } else {
                db.notes.find({ name: categoryName }).count(function (err, count) {
                    if (err) {
                        next(err, null);
                    } else {
                        if (count !== 0) {
                            next("The category name already exists ");
                        } else {
                            var note = {
                                name : categoryName,
                                notes: []
                            };
                            db.notes.insert(note, function (err) {
                                if (err)
                                    next(err);
                                else {
                                    next(null);
                                }
                            });
                        }
                    }
                });
            }
        });
    }
    
    /*
     * Adding New Note
     */
    data.addNote = function (categoryName, noteToInsert, next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err);
            } else {
                db.notes.update({ name: categoryName }, { $push: { notes: noteToInsert } }, next);
            }
        });
    }
    
    /*
     * Adding New User
     */
    data.addUser = function (user, next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err);
            } else {
                db.users.insert(user, next);
            }
        });
    }
    
    /*
     * Get the User detail
     */
    data.getUser = function (username, next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err);
            } else { 
                db.users.findOne({ username: username }, next);
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