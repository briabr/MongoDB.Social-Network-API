const router = require('express').Router();

const { 
    getAllThoughts, 
    getThoughtsById, 
    createThoughts, 
    updateThoughts,
    deleteThoughts,

} = require('../../controllers/thought-controller');

// /api/thoughts 
router.route('/').get(getAllThoughts);

// /api/thoughts/:id 
router.route('/:id')
      .get(getThoughtsById)

// /api/thoughts/:userId 
router.route('/:userId')
      .post(createThoughts);

// Export module router
module.exports = router;