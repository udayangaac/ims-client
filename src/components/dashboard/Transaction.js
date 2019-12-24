import React, {Component} from 'react';
import '../app/App.css';
import {getJwt} from "../helpers/Jwt";
import axios from "axios";
import {getURL} from "../helpers/Config";


class Transaction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stakeholders: undefined
        }
    }

    componentDidMount() {
        const jwt = getJwt();
        if (!jwt) {
            // return to login page if
            this.props.history.push('/signin')
        }
        axios.get(getURL("/api/v1.0/stakeholders"),
            {
                headers: {
                    Authorization: 'Bearer ' + jwt,
                }
            }).then(res => {
                console.log(res.data);
                this.setState({
                    stakeholders: res.data.stakeholders
                });
            }
        ).catch(err => {
        })
    }

    doFilter(e) {
        e.preventDefault();
        console.log("Filters are applied")
    }

    render() {
        let stakeholders = this.state.stakeholders;
        console.log(stakeholders);
        let optionItems;
        if (stakeholders !== undefined && stakeholders !== null) {
            optionItems = stakeholders.map((stakeholder) =>
                <option key={stakeholder.id}>{stakeholder.name}</option>
            );
            console.log(optionItems)
        }

        return (
            <section>
                <h4>Filters</h4>
                <form onSubmit={e => this.doFilter(e)}>
                    <div className="form-row align-items-center">
                        <div className="col-auto">
                            <label className="sr-only" htmlFor="StakeHolder">StakeHolder</label>
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">StakeHolder</div>
                                </div>
                                <select className="form-control" id="StakeHolder">
                                    {optionItems}
                                </select>
                            </div>
                        </div>
                        <div className="col-auto">
                            <label className="sr-only" htmlFor="Date">Date</label>
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">Date</div>
                                </div>
                                <input type="date" name="bday" max="3000-12-31"
                                       min="1000-01-01" className="form-control"/>
                            </div>
                        </div>
                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary mb-2">Apply</button>
                        </div>
                    </div>
                </form>
            </section>
        );
    }
}

export default Transaction;