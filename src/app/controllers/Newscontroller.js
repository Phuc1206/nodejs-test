class Newscontroller {
    index(res,req){
        req.render('news')
    }
    show(res,req){
        req.send('news detail!!!')
    }
}
module.exports = new Newscontroller;