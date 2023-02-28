
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
    Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $set: req.body },
    { runValidators: true, new: true }
  )
    .then((thought) =>
      !thought
        ? res.status(404).json({ message: 'No thought with this id found!' })
        : res.json(thought)
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//TODO: ROUTE TO DELETE A THOUGHT BASED ON THOUGHT ID
router.delete('/:thoughtId', (req,res)=> {
    Thought.findOneAndDelete({
        id: req.params.thoughtId,
    })
        .then (( deleteThought)=> {
            res.status(200).json(deleteThought)
        
        }
    ) .catch((err)=> {
        console.log(err);
         res.status(500).json(err);
    })
});

//TODO: ROUTE TO ADD REACTION TO A THOUGHT
router.post('/:thoughtId/reactions', (req,res)=> {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      )
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought with this id found!' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));

});

//TODO: ROUTE TO DELETE A REACTION ON A THOUGHT
router.delete('/:thoughtId/reactions/:reactionId', (req,res)=> {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      )
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No reaction with this id!' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));

})

module.exports = router;
