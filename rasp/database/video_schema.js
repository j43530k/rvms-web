var Schema = {};

Schema.createSchema = function (mongoose) {
    var VideoSchema = mongoose.Schema({
        name: {
            type: String,
            required: true,
            unique: true
        },
        originalname: {
            type: String,
            required: true
        },
        created: {
            type: Date,
            default: Date.now
        }
    });

    VideoSchema.static("findAll", function (callback) {
        return this.find({}, callback);
    });

    return VideoSchema;
};

module.exports = Schema;