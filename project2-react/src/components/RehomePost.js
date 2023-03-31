import React from 'react'
import BASE_API from './BaseApi'
import axios from "axios";

export default class RehomePost extends React.Component {

    constructor(props) {
        super(props);
        // this.checkParentInfo();
    }

    state = {
        catName: "",
        catBreed: [],
        catAge: "",
        catGender: "",
        requireHomeVisit: "",
        neutered: "",
        personality: [],
        familyStatus: [],
        comment: "",
        medicalHistory: [

        ],
        pictureUrl: "",
        name: "",
        email: "",
        userID: "",
        users: [],
        newProfileFlag: false,
        editFlag: false,

        // user:{
        //     name: "",
        //     email: ""
        // }
    }


    loadUsers = async () => {
        try {
            const response = await axios.get(`${BASE_API}userCollection`);

            this.setState({
                users: response.data.userCollection
            })
        } catch (error) {
            console.error(error)
        }
    }

    /***
     * change event based on the user selection whether they have registered or not
     */
    changeUserOption = async () => {

        let selected = document.getElementById("userSelection");
        if (selected.value === "1") { // registered
            this.setState({
                "newProfileFlag": false
            });
            this.loadUsers();
        } else if (selected.value === "0") { // not registered
            //create new profile
            this.setState({
                "newProfileFlag": true
            });
        } else { // please select option
            this.setState({
                users: []
            });

        }

    }

    postUser = async () => {
        let userID;
        if (this.state.newProfileFlag) {


            const response = await axios.post(`${BASE_API}userCollection`,
                {
                    name: this.state.name,
                    email: this.state.email
                });

            //insertedID to retrieve data upon request successfully called
            //status = success or failuer of API call

            userID = response.data.status.insertedId;
            console.log("UserID", userID);

        } else {
            userID = document.getElementById("userID").value;
        }
        this.postCats(userID);
    }


    static getDerivedStateFromProps(props, state) {
        if (props.cat !== null) {
            //Change in props
            console.log("props:", props);
            return {
                catName: props.cat.cat.catName,
                catBreed: props.cat.cat.catBreed,
                catAge: props.cat.cat.catAge,
                catGender: props.cat.cat.catGender,
                editFlag: true
            };
        }
        return null; // No change to state
    }

    postCats = async (userID) => {
        console.log('postCats');
        console.log("UserID", userID);
        const result = await axios.post(`${BASE_API}catCollection`,
            {
                userID: userID, //this.state.userID
                catName: this.state.catName,
                catBreed: this.state.catBreed,
                catAge: this.state.catAge,
                catGender: this.state.catAge,
                requireHomeVisit: this.state.requireHomeVisit,
                neutered: this.state.neutered,
                personality: this.state.personality,
                familyStatus: this.state.familyStatus,
                comment: this.state.comment,
                medicalHistory: this.state.medicalHistory,
                pictureUrl: this.state.pictureUrl,
            });

        console.log(result.data)
    }

    /**
     * Creating option dynamically
     */
    createOption(val, text) {
        return <option value={val}>{text}</option>; // value is ID and the label shown is the name
    }

    /**
     * return rendered user selection based on the react state of the users
     * assumption: users has been loaded
     * @returns user selection html 
     */
    userSelectionField = () => {
        let options = [];
        let select = <div>Please select the above option to continue</div>;

        if (this.state.users.length > 0) {
            select = <select id="userID">
                {options}
            </select>;

            for (let i = 0; i < this.state.users.length; i++) {
                options.push(this.createOption(this.state.users[i]._id, this.state.users[i].name));
            }
        }

        return <div>
            {select}
        </div>

    }


    /**
     * return new profile field where the user can keyin new profile name and email address
     * @returns registration user html 
     */
    newProfileField() {
        return (
            <div>
                <div>
                    <label> Owner Name:</label>
                    <input type="text" className="form-control" value={this.state.name}
                        onChange={this.updateName} />
                </div>
                <div>
                    <label> Email:</label>
                    <input type="email" className="form-control" value={this.state.email}
                        onChange={this.updateEmail} />
                </div>
            </div>);
    }

    checkSession() {
        this.checkParentInfo();
    }

    render() {


        console.log("state:", this.state);
        let newProfile = <div></div>;
        let userSelection = <div></div>;

        if (!this.state.editFlag) {

            if (this.state.newProfileFlag) {
                newProfile = this.newProfileField();
            } else {
                userSelection = this.userSelectionField();
            }
        } else {
            if (this.props.cat != null) {

                userSelection = <div><div>
                    <label> Owner Name:</label>
                    <input type="text" className="form-control" value={this.props.cat.cat.userID} disabled="disabled"
                        onChange={this.updateName} />
                </div></div>
            }
        }

        return (
            <React.Fragment>
                <div className="container">

                    <h1>Rehome Your Cat </h1>
                    <h2>Cat Details</h2>
                    <div>
                        <label> Cat Name:</label>
                        <input type="text" className="form-control" 
                            value={this.state.catName}
                            onChange={this.updateCatName} />
                    </div>
                    <div>
                        <label> Cat Age:</label>
                        <input type="number" className="form-control" value={this.state.catAge}
                            onChange={this.updateCatAge} />
                    </div>
                    <div>
                        <label>Cat Breed:</label>
                        <select className="form-control"
                            name="catBreed"
                            value={this.state.catBreed}
                            onChange={this.updateFormField}>
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
                                <input type="date" className="form-control" id="date"
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

                    {newProfile}
                    {userSelection}

                    <div>
                        <button onClick={this.postUser}>submit</button>
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


    formChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    updateCatName = (event) => {
        this.setState({
            catName: event.target.value
        })
    }

    updateName = (event) => {
        this.setState({
            name: event.target.value
        })
    }

    updateFormField = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    updateEmail = (event) => {
        this.setState({
            email: event.target.value
        })

    }
    updateComment = (event) => {
        this.setState({
            comment: event.target.value
        })
    }

    updatePicture = (event) => {
        this.setState({
            pictureUrl: event.target.value
        })
    }

    updateCatAge = (event) => {
        this.setState({
            catAge: event.target.value
        })
    }

    updateCatGender = (event) => {
        this.setState({
            catGender: event.target.value
        })
    }

    updateRequireHomeVisit = (event) => {
        this.setState({
            requireHomeVisit: event.target.value
        })
    }

    updateNeutered = (event) => {
        this.setState({
            neutered: event.target.value
        })
    }

    updatePersonality = (event) => {

        if (this.state.personality.includes(event.target.value)) {

            const indexToDelete = this.state.personality.findIndex(function (el) {
                return el === event.target.value
            })

            const modified = [...this.state.personality.slice(0, indexToDelete), ...this.state.personality.slice(indexToDelete + 1)];
            this.setState({
                personality: modified
            })

        } else {

            const modified = [...this.state.personality, event.target.value];
            this.setState({
                personality: modified
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
                familyStatus: modified
            })

        } else {

            const modified = [...this.state.familyStatus, event.target.value];
            this.setState({
                familyStatus: modified
            })
        }
    }
}