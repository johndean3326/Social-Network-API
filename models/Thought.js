const {Schema, model, Types} = require("mongoose");
const User = require('./User')

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280,
          },
          createdAt: {
            type: Date,
            default: Date.now,
          },
          username: {
            type: String,
            required: true,
          },
          // reactions: [reactionSchema],
        },
        {
          toJSON: {
            virtuals: true,
            getters: true,
          },
          id: false, 
    }
);

    thoughtSchema.virtual('reactionCount')
    .get(function () {
        return this.reactions.length;
    });

    const reactionSchema = new Schema({
      createdAt: {
        date: {
        type: Date,
        default: Date.now,
        // get: formatDate
      },
      reactionBody: {
        type: String,
        required: true,
        maxLength: 280
      },
      username: {
        type: String,
        required: true
      },
        },
        
          toJSON: {
            getters: true,
          },
          id: false,
    }
);







const Thought = model('Thought', thoughtSchema);

module.exports = Thought;