// Require Users Model
const {Users} = require('../models');

// Set up Users Controller
const usersController = {
    
    // Create a new User
    createUsers(req, res) {
        Users.create(req.body)
        .then(dbUsersData => res.json(dbUsersData))
        .catch(err => res.status(400).json(err));
    },
    

    // Get All Users
    getAllUsers(req, res) {
        Users.find({})
        // populate users thoughts
        .populate({path: 'thoughts', select: '-__v'})
        // populate user friends
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        .then(dbUsersData => res.json(dbUsersData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    
    // Get single user by ID
    getUsersById(req, res) {
        Users.findOne({_id: req.params.id })
        .populate({path: 'thoughts', select: '-__v'})
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        // return if no user is found 
        .then(dbUsersData => {
            if(!dbUsersData) {
                res.status(404).json({message: 'there is no User with this ID!'});
                return; 
            }
            res.json(dbUsersData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        })
    },
    // delete user
    deleteUsers(req, res) {
        Users.findOneAndDelete({_id: req.params.id})
        .then(dbUsersData => {
            if(!dbUsersData) {
                res.status(404).json({message: 'There is no User with this ID!'});
                return;
            }
            res.json(dbUsersData);
        })
        .catch(err => res.status(400).json(err));
    },

    // update user
    updateUsers({params, body}, res) {
        Users.findOneAndUpdate({_id: params.id}, body, {new: true})
        .then(dbUsersData => {
            if(!dbUsersData) {
                res.status(404).json({message: 'There is no User with this ID!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err))
    },

    // add friend
    addFriend({ params }, res) {
        Users.findOneAndUpdate(
            { _id: params.userId},
            { $addToSet: { friends: params.friendId }},
            { new: true }
        )
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'There is no user with this id!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
    
    // delete friend
    deleteFriend(req, res) {
        Users.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: {friends: req.params.friendId} },
            {new: true }
        )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    }

    
};
// Export module users controller
module.exports = usersController; 