import React, {Component} from 'react';
import axios from 'axios'
import Home from "../home/Home";
import {withRouter} from 'react-router-dom'
import {getJwt} from "../helpers/Jwt";

class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: undefined
        }
    }

    componentDidMount() {
        const jwt = getJwt();
        if (!jwt) {
            this.props.history.push('/signin')
        }
        axios.get('http://localhost:8001/api/v1.0/user',
            {
                headers: {
                    Authorization: 'Bearer ' + jwt,
                }
            }).then(res => this.setState({
            user: res.data
        })).catch(err => {
            localStorage.removeItem('');
            this.props.history.push('/signin')
        })
    }

    render() {
        if (this.state.user == undefined) {
            return (
                <section>
                    <Home/>
                </section>
            )
        }
        return (
            <section>{this.props.children}</section>
        )
    }
}

export default withRouter(Auth);