const express = require("express")
const router = express.Router()
const path = require("path")

// regex either detects a singular forward slash or 
// the string /index.html (where the .html is optional)
router.get("^/$|/index(.html)?", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "index.html"))
});

module.exports = router;