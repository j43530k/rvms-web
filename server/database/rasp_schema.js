var Schema = {};

Schema.createSchema = function (mongoose) {
    var RaspSchema = mongoose.Schema({
        name: {
            type: String,
            required: true
        },
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

    RaspSchema.static("findAll", function (callback) {
        return this.find({}, callback);
    });

    return RaspSchema;
};

module.exports = Schema;