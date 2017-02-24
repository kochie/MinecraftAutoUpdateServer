const express = require("express");
const router = express.Router();

/* GET users listing. */
router.get("/", function(req, res) {
    res.send("respond with a resource");
});

router.get("/:userId", function(req, res, next){
    /** @namespace req.query.emotion */
    /** @namespace req.params.userId */
    res.send(`Hello ${req.params.userId}, you are ${req.query.emotion}`);
    next();
});

module.exports = router;
