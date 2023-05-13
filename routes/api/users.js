const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
} = require('../../controllers/userController')

// /api/users GET POST
router
    .route('/')
    .get(getUsers)
    .post(createUser);

// /api/users/:userId GET PUT DELETE
router
    .route('/:id')
    .get(getSingleUser)
    .delete(deleteUser)
    .put(updateUser);
    

// /api/users/:userId/friends/:friendId POST DELETE
router
.route('/:id/friends/:friendsId')
.post(addFriend)
.delete(removeFriend);

module.exports = router;
