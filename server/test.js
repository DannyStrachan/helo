module.exports = {
    getAllPosts: async (req, res) => {
        const db = req.app.get('db')
        const {showMyPosts, searchInput} = req.query
        const posts = await db.get_all_posts()
        let filteredPosts = posts;
        if (showMyPosts && !searchInput){
            return res.status(200).send(filteredPosts)
        }
        if (showMyPosts === 'false') {
            filteredPosts = filteredPosts.filter(post => {
                return post.author_id === req.session.user.id
            })
        }if (searchInput){
            filteredPosts = filteredPosts.filter(post => {
                const lower_title = post.title.toLowerCase()
                return lower_title.includes(searchInput.toLowerCase())
            })
        }
        return res.status(200).send(filteredPosts)
    },
    getPostById: async (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params;
        const post = await db.get_post_by_id({post_id: id})
        res.status(200).send(post[0])
    }
}