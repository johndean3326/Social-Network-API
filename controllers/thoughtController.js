const { User, Thought } = require('../models');

const thoughtController = {
   
    getThoughts(req, res) {
        Thought.find()
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err))
    },
  
    getThoughtById({ params }, res) {
        Thought.findOne(
            { _id: params.id }
        ).then((thought) => {
            !thought ? res.status(404).json({message: 'No thought by ID'}) : res.json(thought);
    
        }).catch((err) => res.status(500).json(err));
    },
    
    createThought(req, res) {
        Thought.create(req.body)
        .then((thought) => {
            return User.findOneAndUpdate(
                { _id: req.body.userID },
                { $addToSet: { thoughts: thought._id}},
                {new: true}
            )
        }).then(userData => res.json(userData))
        .catch((err) => res.status(500).json(err))
    },
    
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) => 
            !thought
            ? res.status(404).json({message: 'No thought by this ID'}) 
            : res.json(thought)
            )
             .catch((err) => {
             console.log(err);
             res.status(500).json(err);
      });
    },
    
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.id})
        .then((thought) => {
            !thought
            ? res.status(404).json({message: 'No thought by this ID'}) 
            : res.json(thought);
        }).catch((err) => 
        res.status(500).json(err)); 
    },
    
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: {reactions: req.body }},
            { runValidators: true, new: true }
        ).then((thought) => !thought 
        ? res.status(404).json({ message: 'Reaction not added' }) 
        : res.json(thought))
        .catch((err) =>
         res.status(500).json(err))
    },
  
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId} } },
            { runValidators: true, new: true }
        ).then((thought) => !thought 
        ? res.status(404).json({ message: 'Cannot delete' }) 
        : res.json(thought))
        .catch((err) => 
        res.status(500).json(err))
    }, 
 };

 module.exports = thoughtController;