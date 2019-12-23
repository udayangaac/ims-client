import React, {Component} from 'react';
import {getJwt} from "../helpers/Jwt";
import axios from "axios";



class Stakeholder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stakeholders: undefined
        }
    }

    componentDidMount() {
        const jwt = getJwt();
        if (!jwt) {
            this.props.history.push('/signin')
        }
        axios.get('http://localhost:8001/api/v1.0/stakeholders',
            {
                headers: {
                    Authorization: 'Bearer ' + jwt,
                }
            }).then(res => {
                this.setState({
                    stakeholders: res.data.stakeholders
                });
            }
        ).catch(err => {

        })
    }

    onStakeholderEdit(e, id) {
        console.log(id)
    }

    render() {
        let stakeholders = this.state.stakeholders;
        let optionItems;
        if (stakeholders !== undefined) {
            optionItems = stakeholders.map((stakeholder) =>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    {stakeholder.name}
                    <span className="badge badge-primary badge-pill">{stakeholder.type}</span>
                    <button className="btn btn-secondary btn-sm"
                            onClick={e => this.onStakeholderEdit(e, stakeholder.id)}>Edit
                    </button>
                </li>
            );
        }
        return (
            <section>
                <h4>List</h4>
                <ul className="list-group">
                    {optionItems}
                </ul>
                <button type="button" className="btn btn-primary btn-sm" data-toggle="modal"
                        data-target="addStakeholderModel">
                    Add
                </button>
                <br/>
                <div className="modal fade" itemID="addStakeholderModel" tabIndex="-1" role="dialog"
                     aria-labelledby="exampleModalLabel" aria-hidden="false">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add Stakeholder</h5>
                            </div>
                            <div className="modal-body">
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}


export default Stakeholder;