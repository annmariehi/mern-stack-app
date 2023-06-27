import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

export const AddExercisePage = () => {
    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('');
    const [date, setDate] = useState('');

    const history = useHistory();

    const addExercise = async () => {
        const newExercise = {name, reps, weight, unit, date};
        const response = await fetch(`/exercises`, {
            method: 'POST',
            body: JSON.stringify(newExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 201){
            alert(`Sucessfully added the exercise, status code = ${response.status}`);
            } else {
                alert(`Failed to add exercise, status code = ${response.status}`);
        }
        history.push("/");
    };

    return (
        <div>
            <h2>Add Exercise</h2>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={e => setName(e.target.value)} />
            <input
                type="number"
                placeholder="Reps"
                value={reps}
                onChange={e => setReps(e.target.value)} />
            <input
                type="number"
                placeholder="Weight"
                value={weight}
                onChange={e => setWeight(e.target.value)} />
            <select name="unit" onChange={e => setUnit(e.target.value)}>
                <option disabled selected>Units</option>
                <option value="kgs">kgs</option>
                <option value="lbs">lbs</option>
             </select>
            <input
                type="text"
                placeholder="Date"
                value={date}
                onChange={e => setDate(e.target.value)} />
                <div className="save-button-spacer">
            <button
                onClick={addExercise}
            >Save</button>
            </div>
        </div>
    );
}

export default AddExercisePage;