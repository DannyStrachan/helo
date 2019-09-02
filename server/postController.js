module.exports = {
    getPosts: (req, res, next) => {
        const {userposts, search} = req.query;
        const {user_id} = req.session.user
        // const {session} = req; 
        const sqlSearch = '%' + search + '%'
         // makes it so the app will search the database for post titles with the search string anywhere in there
        const db = req.app.get('db'); // accessing the database 
        if (userposts === 'true' && search) {
            db.all_title_posts(sqlSearch)
            .then( results => {
                res.status(200).send(results)
            })
            .catch (err => {
                res.status(500).send(err)
                
            })
        } else if (userposts === 'true' && search === '') {
            db.all_posts()
            .then(results => {
                res.status(200).send(results)
            })
            .catch (err => {
                res.status(500).send(err)
            })
        } else if (userposts === 'false' && search) {
            db.all_title_posts_wout_id(sqlSearch, user_id)
            .then( results => {
                res.status(200).send(results)
            })
            .catch (err => {
                res.status(500).send(err)
                
            })
        } else {
            db.all_posts_wout_id(user_id)
            .then(results => {
                res.status(200).send(results)
            })
            .catch (err => {
                res.status(500).send(err)
            })
        }
    },
    createPost: (req, res, next) => {
        const { title, img, content} = req.body;
        const { user } = req.session
        const db = req.app.get('db');
        db.create_posts([ user.user_id, title, img, content ])
        .then(res.status(200).send('Adding a new post')) 
    },
    async getPost(req, res, next) {
        let {postId} = req.params
        console.log('req:', postId);
        const db = req.app.get('db')
        let post = await db.find_post(+postId)
        res.send(post)
        console.log('post:', post);
    }
}

// module.exports = {
//     async getPosts(req, res) {
//       let { userId } = req.params;
//       const db = req.app.get('db');
//       let posts = await db.get_post_by_user(+userId);
//       res.send(posts);
//     },
//     async deletePost(req, res) {
//       let { postId } = req.params;
//       const db = req.app.get('db');
//       let posts = await db.delete_post([+postId, req.session.user.id]);
//       res.send(posts);
//     },
//     async editPost(req, res) {
//       let { postId } = req.params;
//       let { newTitle, newContent } = req.body;
//       const db = req.app.get('db');
//       let posts = await db.edit_post([
//         +postId,
//         newTitle,
//         newContent,
//         req.session.user.id
//       ]);
//       res.send(posts);
//     }
//   };

// retrieveAllPosts: (req, res, next) => {
//     const {userposts, search} = req.query; // destructuring the query 
//     const {session} = req; 
//     const sqlSearch = '%' + search + '%' // makes it so the app will search the database for post titles with the search string anywhere in there
//     const dbInstance = req.app.get('db'); // accessing the database 
//     if (userposts === 'true' && search) { // If userposts is true AND there is a search string, the endpoint should respond with all the posts where
//         dbInstance.search_posts([sqlSearch])
//         .then( results => {
//             res.status(200).send(results) //respond with all titles that contain the search string 
//         })
//         .catch (err => {
//             res.status(500).send(err)
//         })
//     } else if (userposts === 'false' && search === '') { // If userposts is false AND there is no search string, the endpoint should respond with all the posts where...
//         dbInstance.get_all_posts_not_from_this_user(session.user_id) //The current user is NOT the author.
//         .then(results => {
//             res.status(200).send(results)
//         })
//         .catch (err => {
//             res.status(500).send(err)
//         })
//     } else if (userposts === 'false' && search) { // If userposts is false AND there is no search string, the endpoint should respond with all the posts where
//         dbInstance.search_for_posts_not_from_this_user([sqlSearch], session.user_id)
//         .then(results => {
//             res.status(200).send(results) // The current user is NOT the author. The title contains the search string.
//         })
//         .catch (err => {
//             res.status(500).send(err)
//         })
//     } else if (userposts === 'true' && search === '') { // If userposts is true AND there is no search string, the endpoint should respond with all the posts.
//         dbInstance.get_all_posts([sqlSearch])
//         .then(results => {
//             res.status(200).send(results)
//         })
//         .catch (err => {
//             res.status(500).send(err)
//         })
//     }
// },