import mongoose from 'mongoose';

// Prepare to the database exercises_db
mongoose.connect(
    'mongodb://localhost:27017/exercises_db',
    { useNewUrlParser: true }
);

// Connect to the database
const db = mongoose.connection;


// 
db.once('open', () => {
    console.log('Sucessfully connected to MongoDB using Mongoose!');
});

// Define the schema
const exerciseSchema = mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    unit: { type: String, required: true },
    date: { type: String, required: true }
});

// Compile the model from the schema

const Exercise = mongoose.model("Exercise", exerciseSchema);

/**
 * Create an exercise
 * @param {String} name
 * @param {Number} reps
 * @param {Number} weight
 * @param {String} unit
 * @param {String} date
 * @returns A promise. Resolves to the JSON object for the document created
 */
const createExercise = async (name, reps, weight, unit, date) => {
    // Call the constructor to create an instance of the model class Exercise
    const exercise = new Exercise({ name: name, reps: reps, weight: weight, unit: unit, date: date });
    return exercise.save();
}

/**
 * Retrieve exercises based on a filter
 * @param {Object} filter
 * @param {String} projection
 * @param {Number} limit
 * @returns
 */
const findExercise = async (filter, projection, limit) => {
    const query = Exercise.find(filter)
        .select(projection)
        .limit(limit)
    return query.exec();

}

/**
 *  Find the exercise with the given ID value
 * @param {String} _id
 * @returns
 */
const findExerciseById = async (_id) => {
    const query = Exercise.findById(_id);
    return query.exec();
}

/**
 * Replace the name, reps, weight, unit, and date properties of the exercise with the id value
 * @param {String} _id
 * @param {String} name
 * @param {Number} reps
 * @param {Number} weight
 * @param {String} unit
 * @param {String} date
 * @returns A promise. Resolves to the number of documents
 */
const replaceExercise = async (_id, name, reps, weight, unit, date) => {
    const result = await Exercise.replaceOne({ _id: _id },
        { name: name, reps: reps, weight: weight, unit: unit, date: date });
    return result.modifiedCount;
}

/**
 * Delete the exercise with provided id value
 * @param {String} -id
 * @returns A promise. Resolves to the count of deleted documents
 */
const deleteById = async (_id) => {
    const result = await Exercise.deleteOne ({ _id: _id });
    // Return the count of deleted document. Should be 1
    return result.deletedCount;
}

export { createExercise, findExercise, findExerciseById, replaceExercise, deleteById };