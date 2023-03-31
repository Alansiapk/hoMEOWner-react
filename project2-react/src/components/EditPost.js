import React from 'react'
import BASE_API from './BaseApi'
import axios from "axios";

export default class EditPost extends React.Component {
    state = {
        updatedName: this.props.cat.cat.catName,
        updatedCatAge: "",
        updatedCatBreed: this.props.cat.cat.catBreed,
        updatedCatGender: this.props.cat.cat.catGender
    }

    onUpdateForm = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (<React.Fragment>
                <div className="container">

                    <h1>Rehome Your Cat </h1>
                    <h2>Cat Details</h2>
                    <div>
                        <label> Cat Name:</label>
                        <input type="text" className="form-control"
                            value={this.state.updatedName}
                            name='updatedName' 
                            onChange={this.onUpdateForm} />
                    </div>
                    <div>
                        <label> Cat Age:</label>
                        <input type="number" className="form-control" value={this.state.catAge}
                            onChange={this.updateCatAge} />
                    </div>
                    <div>
                        <label>Cat Breed:</label>
                        <select className="form-control"
                            name="updatedCatBreed"
                            value={this.state.updatedCatBreed}
                            onChange={this.onUpdateForm}>
                            <option value="Singapore Cat">Singapura Cat</option>
                            <option value="Persian">Persian</option>
                            <option value="Ragdoll">Ragdoll</option>
                            <option value="Maine Coon">Maine Coon</option>
                            <option value="Bengal">Bengal</option>
                            <option value="Siamese">Siamese</option>
                            <option value="Munchkin">Munchkin</option>
                            <option value="Siberian">Siberian</option>
                            <option value="Russian Blue">Russian Blue</option>
                            <option value="British Shorthair">British Shorthair</option>
                            <option value="others">Others</option>
                        </select>
                    </div>

                    <div>
                        <label>Cat Gender:</label>
                        <input type="radio"
                            value="Male"
                            name="updatedCatGender"
                            className="form-check-input"
                            checked={this.state.updatedCatGender == "Male"}
                            onChange={this.onUpdateForm} />
                        <label className="form-check-label">Male</label>

                        <input type="radio"
                            value="Female"
                            name="updatedCatGender"
                            className="form-check-input" 
                            checked={this.state.updatedCatGender == "Female"}
                            onChange={this.onUpdateForm} />
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
                                <input type="date" className="form-control" id="date"
                                    value={this.state.newDate}
                                    onChange={(e) => this.setState({ newDate: e.target.value })}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">Add Record</button>
                        </form>
                        {/* <ul>
                            {this.state.medicalHistory.map((record, index) => (
                                <li key={index}>{record.problem} - {record.date}</li>
                            ))}
                        </ul> */}
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
                        Have you registered before?
                        <select id="userSelection" onChange={this.changeUserOption}>
                            <option value="-1">
                                Please select
                            </option>
                            <option value="1">
                                Yes
                            </option>
                            <option value="0">
                                No
                            </option>
                        </select>
                    </div>

                    <div>
                        <button onClick={this.postUser}>submit</button>
                    </div>
                </div>
            </React.Fragment>)
    }
}