var Schema = {};

Schema.createSchema = function (mongoose) {
    var ConnSchema = mongoose.Schema({
        ip: {
            type: String,
            required: true,
            unique: true
        },
        created: {
            type: Date,
            default: Date.now
        }
    });

    ConnSchema.static("findAll", function (callback) {
        return this.find({}, callback);
    });

    return ConnSchema;
};

module.exports = Schema;