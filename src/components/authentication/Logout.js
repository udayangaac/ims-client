import React, {Component} from 'react';
import {clearStorage} from "../helpers/Jwt";


class Logout extends Component {
    componentDidMount() {
        clearStorage();
        this.props.history.push("/")
    }

    render() {
        return null;
    }
}

export default Logout;