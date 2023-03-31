import React from 'react'
import BASE_API from './BaseApi'
import axios from "axios";

export default class EditPost extends React.Component {
    state = {
        updatedCatName: this.props.cat.cat.catName,
        updatedCatBreed: this.props.cat.cat.catBreed,
        updatedCatAge: this.props.cat.cat.catAge,
        updatedCatGender: this.props.cat.cat.catGender,
        updatedRequiredHomeVisit: this.props.cat.cat.requireHomeVisit,
        updatedNeutered: this.props.cat.cat.neutered,
        updatedPersonality: this.props.cat.cat.personality,
        updatedFamilyStatus: this.props.cat.cat.familyStatus,
        updatedComment: this.props.cat.cat.comment,
        updatedMedicalHistory: this.props.cat.cat.medicalHistory,
        updatedPictureUrl: this.props.cat.cat.pictureUrl,
       //updateUserID: this.props.cat.cat.userID,
       updateCatId:this.props.cat.cat._id
    }

    onUpdateForm = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    updateCat = async () => {
        console.log('ID',this.state.updateCatId);
        const result = await axios.put(`${BASE_API}catCollection/${this.state.updateCatId}`,
            {
                //userID: this.state.updateUserID, //this.state.userID
                catName: this.state.updatedCatName,
                catBreed: this.state.updatedCatBreed,
                catAge: this.state.updatedCatAge,
                catGender: this.state.updatedCatGender,
                requireHomeVisit: this.state.updatedRequiredHomeVisit,
                neutered: this.state.updatedNeutered,
                personality: this.state.updatedPersonality,
                familyStatus: this.state.updatedFamilyStatus,
                comment: this.state.updatedComment,
                medicalHistory: this.state.updatedMedicalHistory,
                pictureUrl: this.state.updatedPictureUrl,
                //_id: this.state.updateCatId
            });

        console.log(result.data)
    }

    render() {
        return (<React.Fragment>
            <div className="container">

                <h1>Rehome Your Cat </h1>
                <h2>Cat Details</h2>
                <div>
                    <label> Cat Name:</label>
                    <input type="text" className="form-control"
                        value={this.state.updatedCatName}
                        name='updatedCatName'
                        onChange={this.onUpdateForm} />
                </div>
                <div>
                    <label> Cat Age:</label>
                    <input type="number" className="form-control"
                        value={this.state.updatedCatAge}
                        name='updatedCatAge'
                        onChange={this.onUpdateForm} />
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
                        name="updatedRequiredHomeVisit"
                        className="form-check-input"
                        checked={this.state.updatedRequiredHomeVisit == "Yes Required"}
                        onChange={this.onUpdateForm} />
                    <label className="form-check-label">Yes</label>

                    <input type="radio"
                        value="Not Required"
                        name="updatedRequiredHomeVisit"
                        className="form-check-input"
                        checked={this.state.updatedRequiredHomeVisit == "Not Required"}
                        onChange={this.onUpdateForm} />
                    <label className="form-check-label">No</label>
                </div>
                <div>
                    <label>Neutered:</label>
                    <input type="radio"
                        value="Neutered"
                        name="updatedNeutered"
                        className="form-check-input"
                        checked={this.state.updatedNeutered == "Neutered"}
                        onChange={this.onUpdateForm} />
                    <label className="form-check-label">Yes</label>

                    <input type="radio"
                        value="NotNeutered"
                        name="updatedNeutered"
                        className="form-check-input"
                        checked={this.state.updatedNeutered == "NotNeutered"}
                        onChange={this.onUpdateForm} />
                    <label className="form-check-label">No</label>
                </div>
                <div>
                    <label>Personality:</label>
                    <input type="checkbox"
                        name="updatedPersonality"
                        value="i knew too much"
                        checked={this.state.updatedPersonality.includes("i knew too much")}
                        onChange={this.updatedPersonality} />
                    <label>I Knew Too Much</label>

                    <input type="checkbox"
                        name="updatedPersonality"
                        value="party animal"
                        checked={this.state.updatedPersonality.includes("party animal")}
                        onChange={this.updatedPersonality} />
                    <label>Party animal</label>

                    <input type="checkbox"
                        name="updatedPersonality"
                        value="love bug"
                        checked={this.state.updatedPersonality.includes("love bug")}
                        onChange={this.updatedPersonality} />
                    <label>Love Bug</label>

                    <input type="checkbox"
                        name="updatedPersonality"
                        value="secret admirer"
                        checked={this.state.updatedPersonality.includes("secret admirer")}
                        onChange={this.updatedPersonality} />
                    <label>Secret Admirer</label>

                    <input type="checkbox"
                        name="updatedPersonality"
                        value="MVP"
                        checked={this.state.updatedPersonality.includes("MVP")}
                        onChange={this.updatedPersonality} />
                    <label>MVP</label>

                    <input type="checkbox"
                        name="updatedPersonality"
                        value="shy"
                        checked={this.state.updatedPersonality.includes("shy")}
                        onChange={this.updatedPersonality} />
                    <label>Shy</label>


                </div>
                <div>
                    <label>Family Status:</label>

                    <input type="checkbox"
                        name="updatedFamilyStatus"
                        value="Good with kids"
                        checked={this.state.updatedFamilyStatus.includes("Good with kids")}
                        onChange={this.updatedFamilyStatus} />
                    <label>Good with kids</label>

                    <input type="checkbox"
                        name="updatedFamilyStatus"
                        value="Good with other cats"
                        checked={this.state.updatedFamilyStatus.includes("Good with other cats")}
                        onChange={this.updatedFamilyStatus} />
                    <label>Good with other cats</label>

                    <input type="checkbox"
                        name="updatedFamilyStatus"
                        value="Leave me alone"
                        checked={this.state.updatedFamilyStatus.includes("Leave me alone")}
                        onChange={this.updatedFamilyStatus} />
                    <label>Leave me alone</label>

                </div>
                <div>
                    <label>Medical History:</label>

                    {/* {this.state.updatedMedicalHistory.map(x => {
                        return (<div>
                            Problem:{x.problem}<br />
                            Date:{x.date}
                            <button className="btn btn-primary" onClick={this.beginEdit}>Edit</button>
                        </div>)
                    })} */}


                    <form onSubmit={this.updatedMedicalRecord}>
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
                    <input type="text" className="form-control" value={this.state.updatedComment}
                        name="updatedComment"
                        onChange={this.onUpdateForm}/>
                </div>
                <div>
                    <label> Picture:</label>
                    <input type="text" className="form-control" value={this.state.PictureUrl}
                        name="updatedPictureUrl"
                        onChange={this.onUpdateForm} />
                </div>

                {/* <h2>Owner details</h2>
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
                </div> */}

                <div>
                    <button onClick={this.updateCat}>Update</button>
                </div>
            </div>
        </React.Fragment>)
    }

    updatedPersonality = (event) => {

        if (this.state.updatedPersonality.includes(event.target.value)) {

            const indexToDelete = this.state.updatedPersonality.findIndex(function (el) {
                return el === event.target.value
            })

            const modified = [...this.state.updatedPersonality.slice(0, indexToDelete), ...this.state.updatedPersonality.slice(indexToDelete + 1)];
            this.setState({
                updatedPersonality: modified
            })

        } else {

            const modified = [...this.state.updatedPersonality, event.target.value];
            this.setState({
                updatedPersonality: modified
            })
        }

    }



    updatedFamilyStatus = (event) => {

        if (this.state.updatedFamilyStatus.includes(event.target.value)) {

            const indexToDelete = this.state.updatedFamilyStatus.findIndex(function (el) {
                return el === event.target.value
            })

            const modified = [...this.state.updatedFamilyStatus.slice(0, indexToDelete), ...this.state.updatedFamilyStatus.slice(indexToDelete + 1)];
            this.setState({
                updatedFamilyStatus: modified
            })

        } else {

            const modified = [...this.state.updatedFamilyStatus, event.target.value];
            this.setState({
                updatedFamilyStatus: modified
            })
        }
    }

    updatedMedicalRecord = (e) => {
        e.preventDefault();
        const newRecord = {
            problem: this.state.newProblem,
            date: this.state.newDate
        };

        console.log('newRecord',newRecord);
        this.setState(prevState => ({
            updatedMedicalHistory: [...prevState.updatedMedicalHistory, newRecord],
            newProblem: "",
            newDate: ""
        }));
    }
}