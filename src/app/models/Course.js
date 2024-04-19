const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const slug = require('mongoose-slug-updater');


const Schema = mongoose.Schema;

const Course = new Schema({
    name: { type:String, required: true},
    description: { type:String },
    image: {type:String},
    videoId: { type:String, required: true},
    level: { type:String},
    slug: { type: String, slug: "name",  unique: true },
},{
    timestamps:true,
   
})
Course.query.sortable =  function(req){
    if(req.query.hasOwnProperty('_sort')){
        const isValidType = ['desc', 'asc'].includes(req.query.type) 
        return this.sort({
          [req.query.column] : isValidType ? req.query.type : 'desc'
        })
      }
      return this;
}
Course.plugin(mongooseDelete,{
    overrideMethods: 'all',
    deletedAt: true,
});
mongoose.plugin(slug);
module.exports = mongoose.model('Course', Course)