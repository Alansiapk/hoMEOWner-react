import React from 'react'
import BASE_API from './BaseApi'
import axios from "axios";

export default class RehomePost extends React.Component {

    // constructor(props) {
    //     super(props);
    //     // this.checkParentInfo();
    // }

    state = {
        catName: "",
        catBreed: "Singapura Cat",
        catAge: "",
        catGender: "Male",
        requireHomeVisit: "Yes Required",
        neutered: "Neutered",
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
        console.log("🚀 ~ file: RehomePost.js:58 ~ RehomePost ~ changeUserOption= ~ selected:", selected.value)
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
    
    validationSubmit = () =>{
    
        this.validPersonality();
        this.validFamilyStatus();

        if(!this.state.catName){
            let error = document.querySelector('.invalid-error-catName');
            error.textContent = 'Please input cat name'
            return false;
          }
        if (!this.state.catAge) {
            let error = document.querySelector('.invalid-error-catAge');
            error.textContent = 'Please input cat age'
            return false;
          }

          if (!this.state.newProblem) {
            let error = document.querySelector('.invalid-error-problem');
            error.textContent = 'Please input Problem'
            return false;
          }

          if (!this.state.comment) {
            let error = document.querySelector('.invalid-error-comment');
            error.textContent = 'Please input comment'
            return false;
          }

          if (!this.state.pictureUrl) {
            let error = document.querySelector('.invalid-error-picture');
            error.textContent = 'Please input pictureUrl'
            return false;
          }

          if (!this.state.name) {
            let error = document.querySelector('.invalid-error-name');
            error.textContent = 'Please input name'
            return false;
          }

          if (!this.state.email) {
            let error = document.querySelector('.invalid-error-email');
            error.textContent = 'Please input email'
            return false;
          }
    }


    postUser = async () => {
        this.validationSubmit();
        console.log('postUser====')
        try {
            let userID;
            let { catName, catAge, catGender, catBreed, requireHomeVisit, newProfileFlag } = this.state;
            // if(!this.state.catName){ }
            //     if(!this.state.catAge){ return alert("Please provide cat age") }
            //     if(!this.state.catGender){ return alert("Please select cat gender") }
            //     if(!this.state.catBreed){return alert("Please provide cat breed")}
            //     if(!this.state.requireHomeVisit){return alert("Please select if require home visit")}
            
            if (this.state.newProfileFlag) {
                const response = await axios.post(`${BASE_API}userCollection`,
                    {
                        name: this.state.name,
                        email: this.state.email
                    });

                //insertedID to retrieve data upon request successfully called
                //status = success or failuer of API call

                userID = response.data.status.insertedId;
                //console.log("UserID", userID);

            } else {
                userID = document.getElementById("userID").value;
            }
            this.postCats(userID);

            console.log('postUser finished===')
        } catch (error) {
            console.log("🚀 ~ file: RehomePost.js:99 ~ RehomePost ~ postUser= ~ error:", error)
            // return alert("Please provide name")

            //return alert(error)

        }

    }


    // static getDerivedStateFromProps(props, state) {
    //     if (props.cat !== null) {
    //         //Change in props
    //         console.log("props:", props);
    //         return {
    //             catName: props.cat.cat.catName,
    //             catBreed: props.cat.cat.catBreed,
    //             catAge: props.cat.cat.catAge,
    //             catGender: props.cat.cat.catGender,
    //             editFlag: true
    //         };
    //     }
    //     return null; // No change to state
    // }

    postCats = async (userID) => {

        const { newProblem, newDate, medicalHistory } = this.state;
        console.log("🚀 ~ file: RehomePost.js:149 ~ RehomePost ~ postCats= ~ newDate:", newDate)
        console.log("🚀 ~ file: RehomePost.js:150 ~ RehomePost ~ postCats= ~ newProblem:", newProblem)

        try {
            console.log('postCats====');
            console.log("UserID", userID);

            // const result = {data:[]};
            const result = await axios.post(`${BASE_API}catCollection`,
                {
                    userID: userID, //this.state.userID
                    catName: this.state.catName,
                    catBreed: this.state.catBreed,
                    catAge: this.state.catAge,
                    catGender: this.state.catGender,
                    requireHomeVisit: this.state.requireHomeVisit,
                    neutered: this.state.neutered,
                    personality: this.state.personality,
                    familyStatus: this.state.familyStatus,
                    comment: this.state.comment,
                    pictureUrl: this.state.pictureUrl,
                    problem: this.state.newProblem,
                    date: this.state.newDate
                });
            //const res = await axios.post(BASE_API + "catCollection/medicalHistor/", {medicalBody});

            console.log('finished post cat====')
            console.log(result.data)
            // redirect
            this.props.switchPage("browsecat", null);
        } catch (error) {
            alert(error.response.data.error);
            console.error('Failed to post cat.');
            console.log(error);
            //return alert(error)
        }



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
        let select = <div className='m-1'>Please select the above option to continue</div>;

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
                    <label className='m-1'> Owner Name:</label>
                    <input type="text" className="form-control" value={this.state.name}
                        onChange={this.updateName}
                        onBlur={this.validName} />
                    <p className='invalid-error-name' style={{ "color": "red" }}></p>
                </div>
                <div>
                    <label className='m-1'> Email:</label>
                    <input type="email" className="form-control" value={this.state.email}
                        onChange={this.updateEmail}
                        onBlur={this.validEmail} />
                    <p className='invalid-error-email' style={{ "color": "red" }}></p>
                </div>
            </div>);
    }

    // checkSession() {
    //     this.checkParentInfo();
    // }

    render() {


        // console.log("state:", this.state);
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
                <div style={{ backgroundColor: "#DEF5FE" }} className="container">

                    {/* <h1>Rehome Your Cat </h1> */}
                    <h2 className='p-2 mb-4 m3 ' style={{ "fontSize": "28px" }}>Dear Cat Lovers, we understand that life can be unpredictable, and sometimes circumstances change, making it difficult for you to provide the love and care your feline friend deserves. If you find yourself in such a situation, please remember that putting your cat up for adoption is a responsible and compassionate choice.</h2>
                    <h2>Cat Details:</h2>
                    <div>
                        <label className='m-1'> Cat Name:</label>
                        <input type="text" className="form-control"
                            value={this.state.catName}
                            onChange={this.updateCatName}
                            onBlur={this.validCatName} />
                        <p className='invalid-error-catName' style={{ "color": "red" }}></p>
                    </div>
                    <div>
                        <label className='m-1'> Cat Age:</label>
                        <input type="text" className="form-control" value={this.state.catAge}
                            onChange={this.updateCatAge}
                            onBlur={this.validCatAge} />
                        <p className='invalid-error-catAge' style={{ "color": "red" }}></p>

                    </div>
                    <div>
                        <label className='m-1'>Cat Breed:</label>
                        <select className="form-control"
                            name="catBreed"
                            value={this.state.catBreed}
                            onChange={this.updateFormField}
                        >

                            <option value="Singapura Cat">Singapura Cat</option>
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

                    <div className='mt-2'>
                        <label className=' me-2'>Cat Gender:</label>
                        <input type="radio"
                            value="Male"
                            name="catGender"
                            className="form-check-input me-1"
                            checked={this.state.catGender == "Male"}
                            //checked="checked"

                            onChange={this.updateCatGender}
                        />
                        <label className="form-check-label me-2" >Male</label>

                        <input type="radio"
                            value="Female"
                            name="catGender"
                            className="form-check-input me-1"
                            // checked={this.state.catGender == "Female"}
                            onChange={this.updateCatGender} />
                        <label className="form-check-label me-2">Female</label>
                    </div>
                    <div>
                        <label className='me-2'>Required Home Visit:</label>
                        <input type="radio"
                            value="Yes Required"
                            name="homeVisit"
                            className="form-check-input me-1"
                            checked={this.state.requireHomeVisit == "Yes Required"}
                            onChange={this.updateRequireHomeVisit} />
                        <label className="form-check-label me-2">Yes</label>

                        <input type="radio"
                            value="Not Required"
                            name="homeVisit"
                            className="form-check-input me-1"
                            checked={this.state.requireHomeVisit == "Not Required"}
                            onChange={this.updateRequireHomeVisit} />
                        <label className="form-check-label me-2">No</label>
                    </div>
                    <div>
                        <label className='me-2'>Neutered:</label>
                        <input type="radio"
                            value="Neutered"
                            name="neutered"
                            className="form-check-input me-1"
                            checked={this.state.neutered == "Neutered"}
                            onChange={this.updateNeutered} />
                        <label className="form-check-label me-2">Yes</label>

                        <input type="radio"
                            value="NotNeutered"
                            name="neutered"
                            className="form-check-input me-1"
                            checked={this.state.neutered == "NotNeutered"}
                            onChange={this.updateNeutered} />
                        <label className="form-check-label me-2">No</label>
                    </div>
                    <div>
                        <label className='me-2'>Personality:</label>
                        <input type="checkbox"
                            name="personality"
                            value="i knew too much"
                            onChange={this.updatePersonality} />
                        <label className="form-check-label me-2">I Knew Too Much</label>

                        <input type="checkbox"
                            name="personality"
                            value="party animal"
                            onChange={this.updatePersonality} />
                        <label className="me-2">Party animal</label>

                        <input type="checkbox"
                            name="personality"
                            value="love bug"
                            onChange={this.updatePersonality} />
                        <label className="me-2">Love Bug</label>

                        <input type="checkbox"
                            name="personality"
                            value="secret admirer"
                            onChange={this.updatePersonality} />
                        <label className="me-2">Secret Admirer</label>

                        <input type="checkbox"
                            name="personality"
                            value="MVP"
                            onChange={this.updatePersonality} />
                        <label className="me-2">MVP</label>

                        <input type="checkbox"
                            name="personality"
                            value="shy"
                            onChange={this.updatePersonality} />
                        <label className="me-2">Shy</label>
                        <p className='invalid-error-personality' style={{ "color": "red" }}></p>


                    </div>
                    <div>
                        <label className='me-2'>Family Status:</label>

                        <input type="checkbox"
                            name="familyStatus"
                            value="Good with kids"
                            onChange={this.updateFamilyStatus} />
                        <label className="me-2">Good with kids</label>

                        <input type="checkbox"
                            name="familyStatus"
                            value="Good with other cats"
                            onChange={this.updateFamilyStatus} />
                        <label className="me-2">Good with other cats</label>

                        <input type="checkbox"
                            name="familyStatus"
                            value="Leave me alone"
                            onChange={this.updateFamilyStatus} />
                        <label className="me-2">Leave me alone</label>
                        <p className='invalid-error-familyStatus' style={{ "color": "red" }}></p>


                    </div>
                    <div>
                        <label className='me-2'>Medical History:</label>
                        <form onSubmit={this.addMedicalRecord}>
                            <div className="form-group">
                                <label className='m-1' htmlFor="problem">Problem:</label>
                                <input placeholder="Please key in medical history" type="text" className="form-control" id="problem"
                                    value={this.state.newProblem}
                                    onChange={(e) => this.setState({ newProblem: e.target.value })}
                                    onBlur={this.validProblem} />
                                <p className='invalid-error-problem' style={{ "color": "red" }}></p>

                            </div>
                            <div className="form-group">
                                <label className='m-1' htmlFor="date">Date:</label>
                                <input type="date" className="form-control" id="date"
                                    value={this.state.newDate}
                                    onChange={(e) => this.setState({ newDate: e.target.value })}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary m-1">Add Record</button>
                        </form>
                        <ul>
                            {this.state.medicalHistory.map((record, index) => (
                                <li key={index}>{record.problem} - {record.date}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <label className='me-2'> Comment:</label>
                        <input placeholder="Please describe your cat" type="text"
                            className="form-control" value={this.state.comment}
                            onChange={this.updateComment}
                            onBlur={this.validComment} />
                        <p className='invalid-error-comment' style={{ "color": "red" }}></p>
                    </div>
                    <div>
                        <label className='me-2'> Picture:</label>
                        <input placeholder="Upload a picture of the cat in URL format" type="text" className="form-control" value={this.state.pictureUrl}
                            onChange={this.updatePicture}
                            onBlur={this.validPicture} />
                        <p className='invalid-error-picture' style={{ "color": "red" }}></p>
                    </div>

                    <h2 className='me-2'>Owner details</h2>
                    <div className='m-1'>
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
                        <button className='submitButton m-1' onClick={this.postUser}>submit</button>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    addMedicalRecord = (e) => {
        e.preventDefault();
        // prevent the default form submission behavior, which would cause the page to refresh.
        const newRecord = {
            problem: this.state.newProblem,
            date: this.state.newDate
        };
        this.setState(prevState => ({
            medicalHistory: [...prevState.medicalHistory, newRecord],
            // This operator creates a new array that includes all the previous records and the new record. 
            // This is done to preserve the existing records and avoid mutating the state directly.
            // newProblem: "",
            // newDate: ""
        }));
    };


    formChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    validPersonality = () => {
        let error = document.querySelector('.invalid-error-personality')

        if (this.state.personality.length === 0){
           error.textContent = "please select at least one"
           return false;}
           else {
            error.textContent = "";
            return true;
           }

    }

    validFamilyStatus = () => {
        let error = document.querySelector('.invalid-error-familyStatus')

        if (this.state.personality.length === 0){
           error.textContent = "please select at least one"
           return false;}
           else {
            error.textContent = "";
            return true;
           }

    }

    validCatName = (event) => {
        let error = document.querySelector('.invalid-error-catName');

        if (event.target.value === "") {
            error.textContent = 'Please input cat name'
            return false;
        }
        if (event.target.value.trim().length < 3) {
            error.textContent = 'Cat name length must be more than 2 characters'
            return false;
        }
        else {
            error.textContent = '';
            return true;
        }
    }
    validCatAge = (event) => {
        let error = document.querySelector('.invalid-error-catAge')

        if (event.target.value === "") {
            error.textContent = 'Please input cat age'
            return false;
        }
        let nAge = Number(event.target.value.trim());
        if (isNaN(nAge)) {
            error.textContent = 'Cat Age invalid'
            return false;
        }
        else {
            error.textContent = '';
            return true;
        }
    }

    validProblem = (event) => {
        let error = document.querySelector('.invalid-error-problem')
        if (event.target.value.trim().length > 50) {
            error.textContent = 'problem length must be less than 50 characters'
            return false;
        } else {
            error.textContent = '';
            return true;
        }
    }

    validComment = (event) => {
        let error = document.querySelector('.invalid-error-comment')
        if (event.target.value.trim().length > 150) {
            error.textContent = 'comment length must be less than 150 characters'
            return false;
        } else {
            error.textContent = '';
            return true;
        }
    }

    validPicture = (event) => {
        let error = document.querySelector('.invalid-error-picture')
        if (!event.target.value.match(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/)) {
            error.textContent = 'Please insert correct pictureUrl';
            return false;
        } else {
            error.textContent = '';
            return true;
        }
    }

    validName = (event) => {
        let error = document.querySelector('.invalid-error-name')
        if (event.target.value === "") {
            error.textContent = 'Please insert name';
            return false;
        } if (event.target.value.trim().length < 3) {
            error.textContent = 'Name length must be more than 2 characters';
            return false;
        } else {
            error.textContent = '';
            return true;
        }
    }

    validEmail = (event) => {
        let error = document.querySelector('.invalid-error-email')
        if (event.target.value === "") {
            error.textContent = 'Please insert email';
            return false;
        } else if (/^\w+([-]?\w+)@\w+([-]?\w+)(\.\w{2,3})+$/.test(event.target.value)) {
            error.textContent = '';
            return true;
        } else {
            error.textContent = 'invalid email, email must contain special character';
            return false;
        }
    };

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
        let error = document.querySelector('.invalid-error-personality');
        error.textContent ='';
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
        let error = document.querySelector('.invalid-error-familyStatus');
        error.textContent ='';
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