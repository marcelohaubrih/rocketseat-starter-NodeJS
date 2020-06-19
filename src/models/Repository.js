const mongoose = require('mongoose');
//const mongoosePaginate = require('mongoose-paginate');

const RepositorySchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    url:{
        type: String,
        required: true,
        //unique: true,
        //lowercase: true
    },
    techs:[String],
    likes:{
        type: Number,
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
});

//UserSchema.plugin(mongoosePaginate);
mongoose.model('Repository', RepositorySchema);