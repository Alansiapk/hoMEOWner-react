import React from 'react'
import BASE_API from './BaseApi'

export default class RehomePost extends React.Component {



    state = {
        "catName": "Meow",
        "catbreed": [],
        "catAge": "",
        "catGender": "",
        "requireHomeVisit": "",
        "neutered": "",
        "personality": [],
        "familyStatus": [],
        "comment": "",
        "medicalHistory": [],
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
                        <label>Cat Gender:</label>
                        <input type="radio"
                            value="Male"
                            name="catGender"
                            className="form-check-input" 
                            checked={this.state.catGender == "Male"}
                            onChange={this.updateCatGender}/>
                        <label className="form-check-label">Male</label>

                        <input type="radio"
                            value="Female"
                            name="catGender"
                            className="form-check-input" checked={this.state.catGender == "Female"}
                            onChange={this.updateCatGender}/>
                        <label>Female</label>
                    </div>

                    <h2>Owner details</h2>

                </div>

                <div>Hello world</div>
            </React.Fragment>
        )
    }

    updateCatName = (event) => {
        this.setState({
            "catName": event.target.value
        })
    }

    updateCatGender = (event) =>{
        this.setState({
            "catGender":event.target.value
        })
    }

}