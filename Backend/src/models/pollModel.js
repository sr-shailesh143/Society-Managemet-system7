const { Schema, model, default: mongoose } = require('mongoose');

const surveySchema = new Schema(
  {
    surveyType: {  
      type: String,
      enum: ['multichoice', 'ranking', 'rating', 'numeric', 'text'],
      required: true,
    },
    questionText: {  
      type: String,
      required: true,
    },
    answerOptions: [  
      {
        text: String,
        votes: {
          type: Number,
          default: 0,
        },
      },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      refPath: 'creatorRole',  
    },
    creatorRole: {  
      type: String,
      enum: ['Owner', 'Tenant'], 
    },
  },
  { timestamps: true } 
);

const Survey = model('Survey', surveySchema);

module.exports = Survey;
