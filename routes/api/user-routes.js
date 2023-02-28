
const router = require('express').Router();
const {User} = require("../../models")

//TODO - ROUTE THAT GETS ALL THE USERS, include friends?
router.get('/', (req,res)=> {
    User.find()
    .populate('thoughts')
    .then ((user)=> {
        res.status(200).json(user)
    
    }
) .catch((err)=> {
    console.log(err);
     res.status(500).json(err);
})


})

//TODO - ROUTE THAT CREATES A NEW USER
router.post('/', (req,res)=> {
    User.create({
        thoughts: req.body.thoughts,
        username: req.body.username,
        email: req.body.email,

    }, (err, user) => {
        if (err) {
            res.status(500).json(err)
        } else {
            res.status(200).json(true)
        }
    })

});

//TODO - ROUTE THAT GETS A SINGLE USER BASED ON USER ID
router.get('/:userId', (req,res) => {
    User.findOne({
        id: req.params.userId
    })
    .populate('thoughts')
    .populate('friends')
    .then((user) =>
      !user
        ? res.status(404).json({ message: 'No user with this id found!' })
        : res.json(user)
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
})

//TODO - ROUTE THAT UPDATES A SINGLE USER
router.put('/:userId', (req,res)=> {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      )
        .populate('friends')
        .populate('thoughts')
        .then((user) =>
          !user
            ? res.status(404).json({ message: 'No user with this id found!' })
            : res.json(user)
        )
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });

})

//TODO - ROUTE THAT DELETES A SINGLE USER BASED ON USER ID
router.delete('/:userId', (req,res)=> {
    User.findOneAndDelete({
        id: req.params.userId,
    }, (err, deleteUser)=> {
        if(err) {
            res.status(500).json(err)
        } else {
            res.status(200).json(deleteUser)
        }
    })

});

//TODO - ROUTE THAT ADDS A FRIEND TO A USER
router.put('/:userId/friends/:friendId', (req,res)=> {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId} },
        { runValidators: true, new: true }
      )
        .then((user) =>
          !user
            ? res.status(404).json({ message: 'No user with this id found!' })
            : res.json(user)
        )
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
})

//TODO - ROUTE THAT DELETES A FRIEND FROM A USER'S FRIENDS, DONT DELETE THE FRIEND AS A USER THOUGH!
router.delete('/:userId/friends/:friendId', (req,res)=> {
    User.findOneAndUpdate(

            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } }, 
            { runValidators: true, new: true }
          )
            .then((user) =>
              !user
                ? res.status(404).json({ message: 'No user with this id!' })
                : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
  
});

module.exports = router;
