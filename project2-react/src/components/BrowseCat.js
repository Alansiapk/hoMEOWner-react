import React from 'react';
import BASE_API from './BaseApi';
import axios from "axios";
import { Card, Row, Col } from 'react-bootstrap';

export default class BrowseCat extends React.Component {

    state = {
        cats: [],
        users: []
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



    render() {
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
                                        <p>Requires Home Visit: {cat.requireHomeVisit}</p>
                                        <p>Neutered: {cat.neutered}</p>
                                        <p>Personality: {cat.personality}</p>
                                        <p>Family Status: {cat.familyStatus}</p>
                                        {/* <p>Medical History:{cat.medicalHistory}</p> */}
                                        <p>Comment: {cat.comment}</p>
                                    </Card.Text>
                                    {this.state.users.map(user => (
                                        user.id === cat.userId &&
                                        <div key={user.id}>
                                            <Card.Subtitle className="mt-3 mb-2 text-white">Owner Information</Card.Subtitle>
                                            <Card.Text className="text-white">
                                                <p>Name: {user.name}</p>
                                                <p>Email: {user.email}</p>
                                            </Card.Text>
                                        </div>
                                    )).slice(0, 1)} // display only the first owner if there are multiple owners
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        )
    }
}