import React from 'react';
import BASE_API from './BaseApi';
import axios from "axios";
import { Card, Row, Col, Modal, Button } from 'react-bootstrap';

export default class BrowseCat extends React.Component {

    state = {
        searchCatName: "", ////
        searchCatBreed:"",
        searchRequireHomeVisit:"",
        searchCatGender:"",
        searchNeutered:"",
        reload: false,
        cat: {},
        cats: [],
        users: [],
        catBeingViewed: "",//
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
        _id:""
    }

    loadCats = async () => {
        try {
            const response = await axios.get(`${BASE_API}catCollection`);

            this.setState({
                cats: response.data.catCollection,
            })

            console.log('cats...',response.data.catCollection)
        } catch (error) {
            console.error(error)
        }
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

    componentDidMount = () => {

        this.loadCats();
        this.loadUsers();

    }


    togglePost = (cat,user) => {
        console.log('cat',cat)
        this.setState({
            cat: cat,
            catBeingViewed: cat._id,
            catName: cat.catName,
            catBreed: cat.catBreed,
            catAge: cat.catAge,
            catGender: cat.catGender,
            requireHomeVisit: cat.requireHomeVisit,
            neutered: cat.neutered,
            personality: cat.personality,
            familyStatus: cat.familyStatus,
            comment: cat.familyStatus,
            medicalHistory: cat.medicalHistory,
            pictureUrl: cat.pictureUrl,
          //  users:cat
            // userID: ""
        })
    }

    closePost = () => {
        this.setState({
            catBeingViewed: ""
        })
    }

    editCat = () => {
        console.log('cats...',this.state.cat)
        this.props.switchPage("editpost", {
            cat: this.state.cat
        });
    }

    deleteCat = async () => {
        const result = await axios.delete(`${BASE_API}catCollection/${this.state.cat._id}`);
        console.log(result);
        this.closePost();
        this.loadCats();
    }

    generateMedicalHistoryField =() =>{
        let field = <div></div>;
        let arrayMedicalHistory = [];

        //check if it is not null && at least have one element
        if (this.state.medicalHistory!== null && this.state.medicalHistory.length>0){
            for(let i=0; i<this.state.medicalHistory.length; i++){

                arrayMedicalHistory.push(<div>
                    {this.state.medicalHistory[i].problem} reported on {this.state.medicalHistory[i].date}
                    </div>);
            }

            field = <div>{arrayMedicalHistory}</div>;
        }

        return field;
    }

    updateFormField = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    searchCats = async () => {
        const response = await axios.get(`${BASE_API}catCollection`, {
            params: {
                catName: this.state.searchCatName,  //////
                catBreed:this.state.searchCatBreed,
                catGender:this.state.searchCatGender,
                requireHomeVisit:this.state.searchRequireHomeVisit,
                neutered:this.state.searchNeutered

            }
        });
        this.setState({
            cats: response.data.catCollection
        });
    }

    render() {
        let medicalField = this.generateMedicalHistoryField();


        return (
            <div style={{ backgroundColor: "#29E0E0", minHeight: "100vh" }}>
                <div className="text-center text-white py-5">
                    <h1>Cats for Adoption</h1>
                </div>
                <div>
                    <div>
                    <label>Cat Breed:</label>
                    <select className="form-control"
                        name="searchCatBreed"
                        value={this.searchCatBreed}
                        onChange={this.updateFormField}>//////
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
                        <div>
                        <label>Cat Gender:</label>
                        <input type="radio"
                            value="Male"
                            name="searchCatGender"
                            className="form-check-input"
                            checked={this.state.searchCatGender == "Male"}
                            onChange={this.updateFormField} />
                        <label className="form-check-label">Male</label>

                        <input type="radio"
                            value="Female"
                            name="searchCatGender"
                            className="form-check-input" 
                            checked={this.state.searchCatGender == "Female"}
                            onChange={this.updateFormField} />
                        <label>Female</label>
                    </div>
                    </div>
                    <div>
                        <label>Required Home Visit:</label>
                        <input type="radio"
                            value="Required"
                            name="homeVisit"
                            className="form-check-input"
                            checked={this.state.searchRequireHomeVisit == "Yes Required"}
                            onChange={this.updateFormField} />
                        <label className="form-check-label">Yes</label>

                        <input type="radio"
                            value="Not Required"
                            name="homeVisit"
                            className="form-check-input"
                            checked={this.state.searchRequireHomeVisit == "Not Required"}
                            onChange={this.updateFormField} />
                        <label className="form-check-label">No</label>
                    </div>
                    <div>
                        <label>Neutered:</label>
                        <input type="radio"
                            value="Neutered"
                            name="neutered"
                            className="form-check-input"
                            checked={this.state.searchNeutered == "Neutered"}
                            onChange={this.updateFormField} />
                        <label className="form-check-label">Yes</label>

                        <input type="radio"
                            value="NotNeutered"
                            name="neutered"
                            className="form-check-input"
                            checked={this.state.searchNeutered == "NotNeutered"}
                            onChange={this.updateFormField} />
                        <label className="form-check-label">No</label>
                    </div>
                    

                    <button onClick={this.searchCats}>Search</button>
                </div>
                <Row className="justify-content-center">
                    {this.state.cats.map(cat => (
                        <Col key={cat.id} md={6} className="my-3">
                            <Card className="mb-4" style={{ backgroundColor: "#65afff" }}>
                                <Card.Img variant="top" src={cat.pictureUrl} />
                                <Card.Body>
                                    <Card.Title className="text-white">{cat.catName}</Card.Title>
                                    <Card.Subtitle className="mb-2">{cat.catBreed}</Card.Subtitle>
                                    <Card.Text className="text-white">
                                        <p>Gender: {cat.catGender}</p>
                                        <p>Age :{cat.catAge}</p>
                                        {/* <p>Requires Home Visit: {cat.requireHomeVisit}</p>
                                        <p>Neutered: {cat.neutered}</p>
                                        <p>Personality: {cat.personality}</p>
                                        <p>Family Status: {cat.familyStatus}</p> */}
                                        {/* <p>Medical History:{cat.medicalHistory}</p> */}
                                        <p>Comment: {cat.comment}</p>
                                    </Card.Text>
                                    {this.state.users.map(user => (
                                        // console.log(`${user._id} === ${cat.userID}`, user._id === cat.userID),
                                        user._id === cat.userID && (
                                            <div key={user._id}>
                                                <Card.Subtitle className="mt-3 mb-2 text-white">Owner Information</Card.Subtitle>
                                                <Card.Text className="text-white">
                                                    <p>Name: {user.name}</p>
                                                    <p>Email: {user.email}</p>
                                                </Card.Text>
                                            </div>
                                        )
                                    ))}
                                </Card.Body>
                                <button onClick={() => this.togglePost(cat)}>View</button>
                                <Modal show={this.state.catBeingViewed}>
                                    <Modal.Header closeButton onClick={this.closePost}>
                                        <Modal.Title>More info</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body><img src={this.state.pictureUrl} /></Modal.Body>
                                    <Modal.Body>Cat Name: {this.state.catName}</Modal.Body>
                                    <Modal.Body>Cat Breed: {this.state.catBreed}</Modal.Body>
                                    <Modal.Body>Cat Age: {this.state.catAge}</Modal.Body>
                                    <Modal.Body>Require Home Visit: {this.state.requireHomeVisit}</Modal.Body>
                                    <Modal.Body>Nuetered: {this.state.neutered}</Modal.Body>
                                    <Modal.Body>Personality: {this.state.personality}</Modal.Body>
                                    <Modal.Body>Family Status: {this.state.familyStatus}</Modal.Body>
                                    <Modal.Body>Medical History: {medicalField}</Modal.Body>
                                    <Modal.Footer>
                                        <Button onClick={this.closePost} variant="secondary">
                                            Close
                                        </Button>
                                        <Button onClick={this.editCat} variant="primary">
                                            Edit
                                        </Button>
                                        <Button onClick={this.deleteCat} variant="danger">
                                            Delete
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        )
    }
}