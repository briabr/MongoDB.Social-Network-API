const router = require('express').Router();

const { 
    getAllThoughts, 
    getThoughtsById, 
    createThoughts, 
    updateThoughts,
    deleteThoughts,

} = require('../../controllers/thought-controller');

// /api/thoughts 
router
      .route('/')
      .get(getAllThoughts)
      .post(createThoughts)

// /api/thoughts/:id 
router
    .route('/:id')
    .get(getThoughtsById)
    .delete(deleteThoughts)
    .put(updateThoughts)
    
// // /api/thoughts/:userId 
// router
// .route('/:thoughtId/reactions')
// .post(addReaction)
// .delete(deleteReaction)

// Export module router
module.exports = router;