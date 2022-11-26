// Require express router
const router = require('express').Router();
const {
    getAllUsers,
    getUsersById,
    createUsers,
    updateUsers,
    deleteUsers,
    addFriend,
    deleteFriend
  } = require('../../controllers/users-controllers');
 

// /api/users 
router.route('/')
      .get(getAllUsers)
      .post(createUsers);

// /api/users/:id 
router.route('/:id')
      .get(getUsersById)
      .put(updateUsers)
      .delete(deleteUsers);
      
router
      .route('/:userId/friends/:friendId')
      .post(addFriend)
      .delete(deleteFriend)

// Module export router
module.exports = router; 