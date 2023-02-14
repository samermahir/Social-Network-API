
const router = require('express').Router();
const { Thought, Reaction} = require('../../models')

//TODO: ROUTE TO GET ALL THOUGHTS
router.get('/', (req,res)=> {
    Thought.find({}, (err, thoughts) => {
        res.status(200).json(thoughts)
    })

})

//TODO: ROUTE TO CREATE A NEW THOUGHT
router.post('/', (req,res)=> {
    Thought.create({
        thoughtText: req.body.thoughtText,
        username: req.body.username
    }, (err, thought) => {
        if (err) {
            res.status(500).json(err)
        } else {
            res.status(200).json(true)
        }
    })
});

//TODO: ROUTE TO GET SINGLE THOUGHT BASED ON THOUGHT ID
router.get('/:thoughtId', (req,res)=> {
    Thought.findOne({
        id: req.params.thoughtId
    }, (err, singleThought)=> {
        if(err) {
            res.status(500).json(err)
        } else {
            res.status(200).json(singleThought)
        }
})
});

//TODO: ROUTE TO UPDATE A THOUGHT
router.put('/', (req,res)=> {
    Thought.findOneAndUpdate({
        id: req.params.thoughtId,
    }, (err, updateThought)=> {
        if(err) {
            res.status(500).json(err)
        } else {
            res.status(200).json(updateThought)
        }
    })

});

//TODO: ROUTE TO DELETE A THOUGHT BASED ON THOUGHT ID
router.delete('/:thoughtId', (req,res)=> {
    Thought.findOneAndDelete({
        id: req.params.thoughtId,
    }, (err, deleteThought)=> {
        if(err) {
            res.status(500).json(err)
        } else {
            res.status(200).json(deleteThought)
        }
    })
});

//TODO: ROUTE TO ADD REACTION TO A THOUGHT
router.post('/:thoughtId/reactions', (req,res)=> {

});

//TODO: ROUTE TO DELETE A REACTION ON A THOUGHT
router.delete('/:thoughtId/reactions/:reactionId', (req,res)=> {

})

module.exports = router;
