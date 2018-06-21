var Schema = {};

Schema.createSchema = function (mongoose) {
    var NodeSchema = mongoose.Schema({
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

    NodeSchema.static("findAll", function (callback) {
        return this.find({}, callback);
    });

    return NodeSchema;
};

module.exports = Schema;