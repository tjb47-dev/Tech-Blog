const router = require('express').Router();
const { Post, Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');


router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll({});

        const comments = commentData.map((comment) => comment.get({plain: true}))

       res.json(commentData)
    } catch(err) {
        res.status(500).json(err)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            where: {
                id: req.params.id
            }
        });

        const comments = commentData.map((comment) => comment.get({plain: true}))

       res.json(commentData)
    } catch(err) {
        res.status(500).json(err)
    }
})


router.post('/', async (req, res) => {
    try {
        const newComment = await Comment.create({
            content: req.body.content,
            user_id: req.body.user_id,
            post_id: req.body.post_id
        })
        console.log('comment req body:', req.body) 
        res.status(200).json(newComment)
    } catch(err) {
        res.status(400).json(err)
    }
})

router.put('/:id', async (req, res) => {
    try {
        const updateComment = await Comment.update({
            content: req.body.content
        }, {
            where: {
                id: req.params.id
            }
        });

        if (!updateComment) {
            res.status(404).json({ message: 'No comment found with this id!' });
            return;
          }
          res.status(200).json(updateComment)
    } catch (err) {
        res.status(500).json(err)
    }
})


router.delete('/:id', async (req, res) => {
    try {
        const deleteComment = await Comment.destroy({
            where: {
                id: req.params.id
            }
        });

        if (!deleteComment) {
            res.status(404).json({ message: 'No comment found with this id!' });
            return;
          }

          res.status(200).json(deleteComment)
    } catch(err) {
        res.status(500).json(err)
    }
})


module.exports = router;