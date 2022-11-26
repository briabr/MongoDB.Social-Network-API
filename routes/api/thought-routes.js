const router = require('express').Router();

const { 
    getAllThoughts, 
    getThoughtsById, 
    createThoughts, 
    updateThoughts,
    deleteThoughts,
    addReaction,
    deleteReaction,
    removeReaction

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
    

// /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").post(addReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);

// Export module router
module.exports = router;