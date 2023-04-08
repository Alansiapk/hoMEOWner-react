import React from 'react';
import BASE_API from './BaseApi';
import axios from "axios";
import { Card, Row, Col, Modal, Button } from 'react-bootstrap';

export default class BrowseCat extends React.Component {

    state = {
        searchCatName: "", ////
        searchCatBreed: "",
        searchRequireHomeVisit: "",
        searchCatGender: "",
        searchNeutered: "",
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
        _id: ""
    }

    loadCats = async () => {
        try {
            const response = await axios.get(`${BASE_API}catCollection`);

            console.log("🚀 ~ file: BrowseCat.js:42 ~ BrowseCat ~ loadCats= ~ response:", response.data)
            this.setState({
                cats: response.data.catCollection,
            })

            console.log('cats...', response.data.catCollection)
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


    togglePost = (cat, user) => {
        console.log("🚀 ~ file: BrowseCat.js:73 ~ BrowseCat ~ cat:", cat)
        //console.log('cat', cat)
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
        //console.log('cats...', this.state.cat)
        this.props.switchPage("editpost", {
            cat: this.state.cat
        });
    }

    deleteCat = async () => {
        const result = await axios.delete(`${BASE_API}catCollection/${this.state.cat._id}`);
        //console.log(result);
        this.closePost();
        this.loadCats();
    }

    generateMedicalHistoryField = () => {
        let field = <div></div>;
        let arrayMedicalHistory = [];
        let { medicalHistory} = this.state;
        console.log("🚀 ~ file: BrowseCat.js:118 ~ BrowseCat ~ medicalHistory:", medicalHistory)

        //check if it is not null && at least have one element
        if (this.state.medicalHistory !== null && this.state.medicalHistory.length > 0) {
            for (let i = 0; i < this.state.medicalHistory.length; i++) {

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
                catBreed: this.state.searchCatBreed,
                catGender: this.state.searchCatGender,
                requireHomeVisit: this.state.searchRequireHomeVisit,
                neutered: this.state.searchNeutered

            }
        });
        this.setState({
            cats: response.data.catCollection
        });
    }

    clearFilter = () => {
        this.setState({
            searchCatBreed: "",
            searchCatGender: "",
            searchRequireHomeVisit: "",
            searchNeutered:"",
        }, () => this.loadCats())
    }

    render() {
        let medicalField = this.generateMedicalHistoryField();


        return (
            <div style={{ backgroundColor: "#DEF5FE", minHeight: "100vh" }}>
                <div className="text-center text-white py-5">
                    <h1 className='m-2'>Cats for Adoption</h1>
                    <h2>Open your heart to a world of love and joy – choose adoption! 🐾 </h2>
                    <h2>Adopted cats bring endless joy and love, often transforming both their own lives and those of their new families!</h2>
                    <h2 className='m-3'>Adopt, don't shop!</h2>
                </div>
                <div className="mx-3">
                    <div  >
                        <label>Cat Breed:</label>
                        <select className="form-control"
                            name="searchCatBreed"
                            value={this.state.searchCatBreed}
                            onChange={this.updateFormField}
                            >
                            <option value="">-</option>
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
                        <div className='mt-2'>
                            <label className='me-2'>Cat Gender:</label>
                            <input type="radio"
                                value="Male"
                                name="searchCatGender"
                                className="form-check-input me-1"
                                checked={this.state.searchCatGender == "Male"}
                                onChange={this.updateFormField} />
                            <label className="form-check-label me-2">Male</label>

                            <input type="radio"
                                value="Female"
                                name="searchCatGender"
                                className="form-check-input me-1"
                                checked={this.state.searchCatGender == "Female"}
                                onChange={this.updateFormField} />
                            <label className="form-check-label me-2">Female</label>
                        </div>
                    </div>
                    <div  className='mt-2'>
                        <label className='me-2'>Required Home Visit:</label>
                        <input type="radio"
                            value="Yes Required"
                            name="searchRequireHomeVisit"
                            className="form-check-input me-1"
                            checked={this.state.searchRequireHomeVisit == "Yes Required"}
                            onChange={this.updateFormField} />
                        <label className="form-check-label me-2">Yes</label>

                        <input type="radio"
                            value="Not Required"
                            name="searchRequireHomeVisit"
                            className="form-check-input me-1"
                            checked={this.state.searchRequireHomeVisit == "Not Required"}
                            onChange={this.updateFormField} />
                        <label className="form-check-label me-2">No</label>
                    </div>
                    <div  className='my-2'>
                        <label className='me-2'>Neutered:</label>
                        <input type="radio"
                            value="Neutered"
                            name="searchNeutered"
                            className="form-check-input me-1"
                            checked={this.state.searchNeutered == "Neutered"}
                            onChange={this.updateFormField} />
                        <label className="form-check-label me-2">Yes</label>

                        <input type="radio"
                            value="NotNeutered"
                            name="searchNeutered"
                            className="form-check-input me-1"
                            checked={this.state.searchNeutered == "NotNeutered"}
                            onChange={this.updateFormField} />
                        <label className="form-check-label me-2">No</label>
                    </div>


                    <button className="searchButton me-2" onClick={this.searchCats}>Search</button>
                    <button className="clearFilterButton" onClick={this.clearFilter}>Clear Filter</button>
                </div>
                <Row className="justify-content-center">
                    {this.state.cats.map(cat => (
                        <Col key={cat.id} md={6} className="my-3 col-sm-12 col-md-6 col-lg-4">
                            <Card className="mb-4 mx-3cd" style={{ backgroundColor: "#65afff" }}>
                                <Card.Img variant="top" src={cat.pictureUrl} style={{ padding: "5px", width: "100%", height: "320px", objectFit: "cover" }} />
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
                                                <Card.Subtitle className="mt-2 mb-2 text-white">Owner Information</Card.Subtitle>
                                                <Card.Text className="text-white">
                                                    <p>Name: {user.name}</p>
                                                    <p>Email: {user.email}</p>
                                                </Card.Text>
                                            </div>
                                        )
                                    ))}
                                </Card.Body>
                                <button className="viewButton" onClick={() => this.togglePost(cat)}>View</button>
                                <Modal show={this.state.catBeingViewed}>
                                    <Modal.Header closeButton onClick={this.closePost}>
                                        <Modal.Title>More info</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body ><img src={this.state.pictureUrl} style={{ padding: "5px", width: "100%", height: "250px", objectFit: "cover" }} /></Modal.Body>
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