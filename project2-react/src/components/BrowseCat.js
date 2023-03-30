import React from 'react';
import BASE_API from './BaseApi';
import axios from "axios";
import { Card, Row, Col, Modal, Button } from 'react-bootstrap';

export default class BrowseCat extends React.Component {

    state = {
        cat: {},
        cats: [],
        users: [],
        catBeingViewed: "",
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
        userID: ""
    }

    loadCats = async () => {
        try {
            const response = await axios.get(`${BASE_API}catCollection`);

            this.setState({
                cats: response.data.catCollection
            })

            console.log(this.state.cats)
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
            
            // userID: ""
        })
    }

    closePost = () => {
        this.setState({
            catBeingViewed: ""
        })
    }

    editCat = () => {
        this.props.switchPage("rehomepost", {
            cat: this.state.cat
        });
    }

    generateMedicalHistoryField =() =>{
        let field = <div></div>;
        let arrayMedicalHistory = [];


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


    render() {
        var medicalField = this.generateMedicalHistoryField();
        return (
            <div style={{ backgroundColor: "#274060", minHeight: "100vh" }}>
                <div className="text-center text-white py-5">
                    <h1>Cats for Adoption</h1>
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
                                        {/* <p>Requires Home Visit: {cat.requireHomeVisit}</p>
                                        <p>Neutered: {cat.neutered}</p>
                                        <p>Personality: {cat.personality}</p>
                                        <p>Family Status: {cat.familyStatus}</p> */}
                                        {/* <p>Medical History:{cat.medicalHistory}</p> */}
                                        <p>Comment: {cat.comment}</p>
                                    </Card.Text>
                                    {this.state.users.map(user => (
                                        console.log(`${user._id} === ${cat.userID}`, user._id === cat.userID),
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
                                    <Modal.Body>Picture: {this.state.pictureUrl}</Modal.Body>
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
                                        <Button variant="danger">
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