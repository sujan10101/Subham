const express = require("express");
const router = express.Router();
const news = require("../../model/newsandevents")

router.post('/addnews', async (req, res) => {
    
    try {
        const newNews = {
            ...req.body
        }
        await news.create(newNews);
        res.redirect('news-and-events');
    }
    catch (e) {
       console.log(e);
    }
});
module.exports = router;