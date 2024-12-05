const { Schema, model, default: mongoose } = require('mongoose');

const surveySchema = new Schema(
  {
    surveyType: {  // Renamed pollType to surveyType
      type: String,
      enum: ['multichoice', 'ranking', 'rating', 'numeric', 'text'],
      required: true,
    },
    questionText: {  // Renamed question to questionText
      type: String,
      required: true,
    },
    answerOptions: [  // Renamed options to answerOptions
      {
        text: String,
        votes: {
          type: Number,
          default: 0,
        },
      },
    ],
    createdBy: {  // Renamed to indicate the creator of the survey
      type: Schema.Types.ObjectId,
      refPath: 'creatorRole',  // Updated to reflect the new creatorRole field
    },
    creatorRole: {  // Updated to refer to the role of the creator
      type: String,
      enum: ['Owner', 'Tenant'],  // Updated 'Tenante' to 'Tenant' for correct spelling
    },
  },
  { timestamps: true } // This will automatically add createdAt and updatedAt fields
);

// Changed model name from 'Poll' to 'Survey'
const Survey = model('Survey', surveySchema);

module.exports = Survey;
