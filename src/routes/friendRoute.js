const express = require("express");
const FriendContoller= require("../controller/FriendController");

const router = express.Router();

router.post('/add-un-friend', FriendContoller.addUnFriend);
router.get('/get-friend-not-friend/:id', FriendContoller.getAllFriendAndNotFriend);

module.exports = router;