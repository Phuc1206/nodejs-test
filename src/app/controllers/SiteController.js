class SiteController {
    index(res,req){
        req.render('home')
    }
    search(res,req){
        req.render('search')
    }
}
module.exports = new SiteController;