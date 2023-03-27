import React from 'react'
import BASE_API from './BaseApi'

export default class RehomePost extends React.Component {



    state = {
        "catName": "Meow",
        "catBreed": [],
        "catAge": "",
        "catGender": "",
        "requireHomeVisit": "",
        "neutered": "",
        "personality": [],
        "familyStatus": [],
        "comment": "",
        "medicalHistory": [
           
        ],
        "pictureUrl": "",
        "name": "",
        "email": ""
    }

    render() {
        return (
            <React.Fragment>
                <div className="container">

                    <h1>Rehome Your Cat </h1>
                    <h2>Cat Details</h2>
                    <div>
                        <label> Cat Name:</label>
                        <input type="text" className="form-control" value={this.state.catName}
                            onChange={this.updateCatName} />
                    </div>
                    <div>
                        <label> Cat Age:</label>
                        <input type="text" className="form-control" value={this.state.catAge}
                            onChange={this.updateCatAge} />
                    </div>
                    <div>
                        <label>Cat Breed:</label>
                        <select className="form-control"
                            name="catBreed"
                            value={this.state.catBreed}
                            onChange={this.updateFormField}>
                            <option value="sgc">Singapura Cat</option>
                            <option value="psc">Persian</option>
                            <option value="rdc">Ragdoll</option>
                            <option value="mcc">Maine Coon</option>
                            <option value="bgc">Bengal</option>
                            <option value="smc">Siamese</option>
                            <option value="mcc">Munchkin</option>
                            <option value="sbc">Siberian</option>
                            <option value="rbc">Russian Blue</option>
                            <option value="bsc">British Shorthair</option>
                            <option value="others">Others</option>
                        </select>
                    </div>

                    <div>
                        <label>Cat Gender:</label>
                        <input type="radio"
                            value="Male"
                            name="catGender"
                            className="form-check-input"
                            checked={this.state.catGender == "Male"}
                            onChange={this.updateCatGender} />
                        <label className="form-check-label">Male</label>

                        <input type="radio"
                            value="Female"
                            name="catGender"
                            className="form-check-input" checked={this.state.catGender == "Female"}
                            onChange={this.updateCatGender} />
                        <label>Female</label>
                    </div>
                    <div>
                        <label>Required Home Visit:</label>
                        <input type="radio"
                            value="Yes Required"
                            name="homeVisit"
                            className="form-check-input"
                            checked={this.state.requireHomeVisit == "Yes Required"}
                            onChange={this.updateRequireHomeVisit} />
                        <label className="form-check-label">Yes</label>

                        <input type="radio"
                            value="Not Required"
                            name="homeVisit"
                            className="form-check-input"
                            checked={this.state.requireHomeVisit == "Not Required"}
                            onChange={this.updateRequireHomeVisit} />
                        <label className="form-check-label">No</label>
                    </div>
                    <div>
                        <label>Neutered:</label>
                        <input type="radio"
                            value="Neutered"
                            name="neutered"
                            className="form-check-input"
                            checked={this.state.neutered == "Neutered"}
                            onChange={this.updateNeutered} />
                        <label className="form-check-label">Yes</label>

                        <input type="radio"
                            value="NotNeutered"
                            name="neutered"
                            className="form-check-input"
                            checked={this.state.neutered == "NotNeutered"}
                            onChange={this.updateNeutered} />
                        <label className="form-check-label">No</label>
                    </div>
                    <div>
                        <label>Personality:</label>
                        <input type="checkbox"
                            name="personality"
                            value="i knew too much"
                            onChange={this.updatePersonality} />
                        <label>I Knew Too Much</label>

                        <input type="checkbox"
                            name="personality"
                            value="party animal"
                            onChange={this.updatePersonality} />
                        <label>Party animal</label>

                        <input type="checkbox"
                            name="personality"
                            value="love bug"
                            onChange={this.updatePersonality} />
                        <label>Love Bug</label>

                        <input type="checkbox"
                            name="personality"
                            value="secret admirer"
                            onChange={this.updatePersonality} />
                        <label>Secret Admirer</label>

                        <input type="checkbox"
                            name="personality"
                            value="MVP"
                            onChange={this.updatePersonality} />
                        <label>MVP</label>

                        <input type="checkbox"
                            name="personality"
                            value="shy"
                            onChange={this.updatePersonality} />
                        <label>Shy</label>


                    </div>
                    <div>
                        <label>Family Status:</label>

                        <input type="checkbox"
                            name="familyStatus"
                            value="Good with kids"
                            onChange={this.updateFamilyStatus} />
                        <label>Good with kids</label>

                        <input type="checkbox"
                            name="familyStatus"
                            value="Good with other cats"
                            onChange={this.updateFamilyStatus} />
                        <label>Good with other cats</label>

                        <input type="checkbox"
                            name="familyStatus"
                            value="Leave me alone"
                            onChange={this.updateFamilyStatus} />
                        <label>Leave me alone</label>

                    </div>
                    <div>
                        <label>Medical History:</label>
                        <form onSubmit={this.addMedicalRecord}>
                            <div className="form-group">
                                <label htmlFor="problem">Problem:</label>
                                <input type="text" className="form-control" id="problem"
                                    value={this.state.newProblem}
                                    onChange={(e) => this.setState({ newProblem: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="date">Date:</label>
                                <input type="text" className="form-control" id="date"
                                    value={this.state.newDate}
                                    onChange={(e) => this.setState({ newDate: e.target.value })}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">Add Record</button>
                        </form>
                        <ul>
                {this.state.medicalHistory.map((record, index) => (
                    <li key={index}>{record.problem} - {record.date}</li>
                ))}
            </ul>
                    </div>
                    <div>
                        <label> Comment:</label>
                        <input type="text" className="form-control" value={this.state.comment}
                            onChange={this.updateComment} />
                    </div>
                    <div>
                        <label> Picture:</label>
                        <input type="text" className="form-control" value={this.state.pictureUrl}
                            onChange={this.updatePicture} />
                    </div>

                    <h2>Owner details</h2>
                    <div>
                        <label> Owner Name:</label>
                        <input type="text" className="form-control" value={this.state.name}
                            onChange={this.updateName} />
                    </div>
                    <div>
                        <label> Email:</label>
                        <input type="text" className="form-control" value={this.state.email}
                            onChange={this.updateEmail} />
                    </div>




                </div>
            </React.Fragment>
        )
    }

    addMedicalRecord = (e) => {
        e.preventDefault();
        const newRecord = {
          problem: this.state.newProblem,
          date: this.state.newDate
        };
        this.setState(prevState => ({
          medicalHistory: [...prevState.medicalHistory, newRecord],
          newProblem: "",
          newDate: ""
        }));
      };



    updateCatName = (event) => {
        this.setState({
            "catName": event.target.value
        })
    }

    updateName = (event) => {
        this.setState({
            "name": event.target.value
        })
    }

    updateFormField = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    updateEmail = (event) => {
        this.setState({
            "email": event.target.value
        })
    }
    updateComment = (event) => {
        this.setState({
            "comment": event.target.value
        })
    }

    updatePicture = (event) => {
        this.setState({
            "pictureUrl": event.target.value
        })
    }

    updateCatAge = (event) => {
        this.setState({
            "catAge": event.target.value
        })
    }

    updateCatGender = (event) => {
        this.setState({
            "catGender": event.target.value
        })
    }

    updateRequireHomeVisit = (event) => {
        this.setState({
            "requireHomeVisit": event.target.value
        })
    }

    updateNeutered = (event) => {
        this.setState({
            "neutered": event.target.value
        })
    }

    updatePersonality = (event) => {

        if (this.state.personality.includes(event.target.value)) {

            const indexToDelete = this.state.personality.findIndex(function (el) {
                return el === event.target.value
            })

            const modified = [...this.state.personality.slice(0, indexToDelete), ...this.state.personality.slice(indexToDelete + 1)];
            this.setState({
                "personality": modified
            })

        } else {

            const modified = [...this.state.personality, event.target.value];
            this.setState({
                "personality": modified
            })
        }

    }

    updateFamilyStatus = (event) => {

        if (this.state.familyStatus.includes(event.target.value)) {

            const indexToDelete = this.state.familyStatus.findIndex(function (el) {
                return el === event.target.value
            })

            const modified = [...this.state.familyStatus.slice(0, indexToDelete), ...this.state.familyStatus.slice(indexToDelete + 1)];
            this.setState({
                "familyStatus": modified
            })

        } else {

            const modified = [...this.state.familyStatus, event.target.value];
            this.setState({
                "familyStatus": modified
            })
        }
    }
}