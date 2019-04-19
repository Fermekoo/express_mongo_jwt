const movieModel = require('../models/movies');

module.exports = {
    getById: function(req, res, next) {
        console.log(req.body);
        movieModel.findById(req.params.movieId, function(err, movieInfo){
            if(err){
                next(err);
            }else{
                res.json({status: "success",message:"Movie Found", data:{movies: movieInfo}});
            }
        });
    },

    getAll: function(req, res, next) {
        let moviesList = [] ;

        movieModel.find({}, function(err, movies){
            if(err){
                next(err);
            }else{
                for(let movie of movies) {
                    moviesList.push({id: movie._id, name: movie.name, released_on: movie.released_on});
                }
                res.json({status:"success", message: "Movie List", data:{movies:moviesList}});
            }
        });
    },

    updateById: function(req, res, next) {
        movieModel.findByIdAndUpdate(req.params.movieId, {name:req.body.name}, function(err, movieInfo){
            if(err)
                next(err);
            else{
                res.json({status:"success", message: "Movie Updated", data:null});
            }
        });
    },

    deleteById: function(res, res, next){
        movieModel.findByidAndRemove(req.params.movieId, function(err, movieInfo){
            if(err)
                next(err);
            else{
                res.json({status: "success",message:"Movie deleted successfully", data:null});
            }
        });
    },

    create: function(req, res, next){
        movieModel.create({name: req.body.name, released_on: req.body.released_on}, function(err, result){
            if(err)
                next(err);
            else
            res.json({status: "success", message:"Movie berhasil ditambahkan", data: null});
        });
    },
}