const {Thoughts, Users} = require('../models');

const thoughtsController = {
    // create thought
    createThoughts({ params, body }, res) {
        return Thoughts.create(body)
        .then(({ _id}) => {
            return User.findOneAndUpdate(
                { username: body.username},
                { $addToSet: { thoughts: _id }},
                { new: true}
            );
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(400).json({ message: 'there is no user with this name'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
        
    },
    // Get all  Thoughts
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

    // Get a single thought by ID
    getThoughtsById(req, res) {
        Thoughts.findOne({_id: req.params.id })
        .populate({path: 'reactions',select: '-__v'})
        .select('-__v')
        .then(dbThoughtsData => {
            if(!dbThoughtsData) {
            res.status(404).json({message: 'There are no thoughts with this ID!'});
            return;
        }
        res.json(dbThoughtsData)
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    // delete thought
    deleteThoughts ({ params }, res) { 
        Thoughts.findOneAndDelete({ _id: params.id })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(400).json({ message: 'There are no thought with this id!'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err))
    },
    // update thought
    updateThoughts ({ params, body }, res) {
        Thoughts.findOneAndUpdate({ _id: params.id}, body, {new: true })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(400).json({ message: 'There are no thoughts with this id!'});
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.status(400).json(err));
    },

};
// Export module thought controller
module.exports = thoughtsController;