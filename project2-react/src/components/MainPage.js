import React from 'react';
import BrowseCat from './BrowseCat';
import RehomePost from './RehomePost';
import EditPost from "./EditPost";
import BASE_API from './BaseApi';
import axios from "axios";

export default class MainPage extends React.Component{

    state = {
        "activePage": "browsecat",
        cats: [],
        cat : null,
    }

    renderPage(){
        switch (this.state.activePage){
            case "browsecat":
                return <BrowseCat switchPage={this.switchPage}/>
            case "rehomepost":
                return <RehomePost switchPage={this.switchPage} 
                                    cat={this.state.cat}/>
            case "editpost":
                return <EditPost switchPage={this.switchPage}
                                 cat={this.state.cat} />      //props                              
            default:
                return<div>Error.Page not found</div>
        }
    }

    switchPage = (newPage, cat) => {
        console.log("value cat switch page",cat);
        this.setState({
            "activePage": newPage,
            "cat": cat,
        })
    }



    render() {
        return <React.Fragment>
            <nav className="navbar navbar-expand-sm bg-light">
                <div className="container-fluid">
                    {/* Links */}
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="#" onClick={()=>{
                                this.switchPage("browsecat",null)
                            }}>Browse Cat</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#" onClick={()=>{
                                this.switchPage("rehomepost",null)
                            }}>Rehome</a>
                        </li>
                    </ul>
                </div>
            </nav>

            {this.renderPage()}
        </React.Fragment>
    }
}


