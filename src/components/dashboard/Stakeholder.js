import React, {Component} from 'react';
import {getJwt} from "../helpers/LocalStorage";
import axios from "axios";
import {getURL} from "../helpers/Config";


class Stakeholder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // stakeholders list
            stakeholders: undefined,
            // plate number hide
            isPlateNumberHide: true,
            // add stakeholder
            plateNumberAdd: undefined,
            typeAdd: undefined,
            nameAdd: undefined,
            // edit stakeholder
            idEdit: undefined,
            plateNumberEdit: undefined,
            typeEdit: undefined,
            nameEdit: undefined,
            // delete stakeholder
            idDelete: undefined
        }
    }

    load() {
        const jwt = getJwt();
        if (!jwt) {
            this.props.history.push('/signin')
        }
        axios.get(getURL("/api/v1.0/stakeholders"),
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

    componentDidMount() {
        this.load()
    }

    // get stakeholder id and get the values from the database.
    onStakeholderEdit(e, id) {
        // set the id to edit
        this.setState({
            idEdit: id,
            idDelete: id
        });
        console.log("Hold the editing id : " + id);
        const jwt = getJwt();
        if (!jwt) {
            this.props.history.push('/signin')
        }
        axios.get(getURL("/api/v1.0/stakeholder/") + id,
            {
                headers: {
                    Authorization: 'Bearer ' + jwt,
                }
            }).then(res => {
                console.log(res.data);
                //id
                //name
                //type
                //plate_number
                //is_available
                let isHidePlateNumber;
                if (res.data.type === "delivery vehicle") {
                    isHidePlateNumber = false
                } else if (res.data.type === "shop") {
                    isHidePlateNumber = true
                } else {
                    //nothing
                }
                this.setState({
                    isPlateNumberHide: isHidePlateNumber,
                    plateNumberEdit: res.data.plate_number,
                    typeEdit: res.data.type,
                    nameEdit: res.data.name,
                });
            }
        ).catch(err => {

        })
    }

    onStakeholderAdd(e) {
        this.setState({
            isPlateNumberHide: true
        })
    }

    onStakeholderAddSubmit(e) {
        e.preventDefault();
        const jwt = getJwt();
        if (!jwt) {
            this.props.history.push('/signin')
        }
        axios.post(getURL("/api/v1.0/stakeholder"), JSON.stringify({
                name: this.state.nameAdd,
                plate_number: this.state.plateNumberAdd,
                type: Number(this.state.typeAdd)
            }),
            {
                headers: {
                    Authorization: 'Bearer ' + jwt,
                    "Content-Type": "application/json"
                }
            }
        ).then(resp => {
            console.log(resp.data);
            this.load();
        });
    }

    onStakeholderEditSubmit(e) {
        e.preventDefault();
        const jwt = getJwt();
        if (!jwt) {
            this.props.history.push('/signin')
        }
        axios.put(getURL("/api/v1.0/stakeholder"), JSON.stringify({
                id: Number(this.state.idEdit),
                name: this.state.nameEdit,
                plate_number: this.state.plateNumberEdit,
                type: Number(this.state.typeEdit)
            }),
            {
                headers: {
                    Authorization: 'Bearer ' + jwt,
                    "Content-Type": "application/json"
                }
            }
        ).then(resp => {
            console.log(resp.data);
            this.load();
        });
    }

    onDeleteStakeholder(e) {
        const jwt = getJwt();
        if (!jwt) {
            this.props.history.push('/signin')
        }
        axios.delete(getURL("/api/v1.0/stakeholder/") + this.state.idDelete,
            {
                headers: {
                    Authorization: 'Bearer ' + jwt,
                    "Content-Type": "application/json"
                }
            }
        ).then(resp => {
            this.load();
        });
    }


    change(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        let stakeholders = this.state.stakeholders;
        let stakeholderList;
        if (stakeholders !== undefined && stakeholders !== null) {
            stakeholderList = stakeholders.map((stakeholder) =>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-3">
                                {stakeholder.name}
                            </div>
                            <div className="col-sm-3">
                                <span className="badge badge-info badge-pill">{stakeholder.plate_number}</span>
                            </div>
                            <div className="col-sm-3">
                                <span className="badge badge-primary badge-pill">{stakeholder.type}</span>
                            </div>
                            <div className="col-sm-3">
                                <button className="btn btn-toolbar btn-sm float-right" data-toggle="modal"
                                        data-target="#editStakeholderModel"
                                        onClick={e => this.onStakeholderEdit(e, stakeholder.id)}>
                                    <i className="fa fa-edit"/>
                                </button>
                            </div>
                        </div>
                    </div>
                </li>
            );
        }
        return (
            <section>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-6">
                            <h5>Stakeholder List</h5>
                        </div>
                        <div className="col-lg-6">
                            <div className="form-group">
                                <button type="button" className="btn btn-dark btn-sm " data-toggle="modal"
                                        onClick={e => this.onStakeholderAdd(e)}
                                        data-target="#addStakeholderModel"><i className="fa fa-plus-circle"/> Add
                                    Stakeholder
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <ul className="list-group">
                                {stakeholderList}
                            </ul>
                        </div>
                    </div>
                </div>
                <br/>

                {/*add stake holder model*/}
                <div className="modal fade" id="addStakeholderModel" tabIndex="-1" role="dialog"
                     aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="">Add Stakeholder</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true" className="white-text">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form noValidate onSubmit={e => this.onStakeholderAddSubmit(e)} autoComplete="off">
                                    <div className="form-group">
                                        <label htmlFor="stakeHolderName">Name</label>
                                        <input id="stakeHolderName" className="form-control" placeholder="" type="text"
                                               name="nameAdd" onChange={e => this.change(e)}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="stakeHolderType">Type</label>
                                        <select className="form-control" id="stakeHolderType"
                                                name="typeAdd" onChange={e => {
                                            this.change(e);
                                        }}>
                                            <option value="0">Shop</option>
                                            <option value="1">Vehicle</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="stakeHolderUniqueId">Plate Number</label>
                                        <input id="stakeHolderUniqueId" className="form-control" placeholder=""
                                               type="text"
                                               name="plateNumberAdd" onChange={e => this.change(e)}/>
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-dark btn-sm">
                                            <i className="fa fa-save"/> Save
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                {/*edit stakeholder model*/}
                <div className="modal fade" id="editStakeholderModel" tabIndex="-1" role="dialog"
                     aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="">Edit Stakeholder</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true" className="white-text">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form noValidate onSubmit={e => this.onStakeholderEditSubmit(e)} autoComplete="off">
                                    <div className="form-group">
                                        <label htmlFor="stakeHolderName">Name</label>
                                        <input id="stakeHolderName" className="form-control" placeholder="" type="text"
                                               name="nameEdit" onChange={e => this.change(e)}
                                               value={this.state.nameEdit}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="stakeHolderType">Type</label>
                                        <select className="form-control" id="stakeHolderType"
                                                name="typeEdit" onChange={e => {
                                            this.change(e);
                                        }}>
                                            <option value="0">Shop</option>
                                            <option value="1">Vehicle</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="stakeHolderUniqueId">Plate Number</label>
                                        <input id="stakeHolderItem" className="form-control" placeholder="" type="text"
                                               name="plateNumberEdit" onChange={e => this.change(e)}
                                               value={this.state.plateNumberEdit}/>
                                    </div>
                                    {/*<div className="form-group">*/}
                                    {/*    <label htmlFor="stakeHolderAvailability">Availability</label>*/}
                                    {/*    <select className="form-control" id="stakeHolderType">*/}
                                    {/*        <option value="1">Available</option>*/}
                                    {/*        <option value="0">Not Available</option>*/}
                                    {/*    </select>*/}
                                    {/*</div>*/}
                                    <div className="form-group">
                                        <button className="btn btn-danger btn-sm float-left button-margin"
                                                onClick={e => {
                                                    this.onDeleteStakeholder(e)
                                                }}><i className="fa fa-trash"/> Delete
                                        </button>

                                        <button type="submit" className="btn btn-primary float-right btn-sm button-margin">
                                            <i className="fa fa-save"/> Save
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Stakeholder;