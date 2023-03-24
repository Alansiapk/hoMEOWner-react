import React from 'react';
import BASE_API from './BaseApi';
import axios from "axios";

export default class BrowseCat extends React.Component {

    state = {
        cats: []
    }

    loadCats = async () => {
        const response = await axios.get(`${BASE_API}catCollection`);

        this.setState({
            cats: response.data.catCollection
        })

        console.log(this.state.cats)
    }

    componentDidMount = () => {
        try {
            this.loadCats();
        } catch (error) {
            console.error(error)
        }
    }



    render(){
        return <div>
            <div>Hello World</div>
            <div>{this.state.cats.map(cat => (
                <div key={cat.id}>
                    <h1 className="border shadow m-2">{cat.catName}</h1>
                </div>
            ))}</div>
        </div>
    }
}