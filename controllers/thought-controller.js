const {Thoughts, Users} = require('../models');

// Set up Thoughts Controller

const thoughtsController = {
    createThoughts(req, res) {
        Thoughts.create(body)
    Thoughts.create(params)
          .then((thoughts) => {
            return User.findOneAndUpdate(
              { _id: params.userId },
              { $addToSet: { thoughts: _id } },
              { new: true }
            );
          })
          .then(dbThoughtsData => {
            if(!dbThoughtsData) {
                res.status(404).json({message: 'there are no thoughts with this  ID!'});
                return;
            }
            res.json(dbThoughtsData)
        })
        .catch(err => res.json(err)); 
    },

    // Get all available Thoughts
    getAllThoughts(req,res) {
        Thoughts.find({})
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(dbThoughtsData => res.json(dbThoughtsData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // Get a certain thought by ID
    getThoughtsById({params}, res) {
        Thoughts.findOne({ _id: params.id })
        .populate({path: 'reactions',select: '-__v'})
        .select('-__v')
        .then(dbThoughtsData => {
            if(!dbThoughtsData) {
            res.status(404).json({message: 'there are no thoughts with this  ID!'});
            return;
        }
        res.json(dbThoughtsData)
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

};

// Export module thought controller
module.exports = thoughtsController;