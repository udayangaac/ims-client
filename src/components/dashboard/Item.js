import React, {Component} from 'react';
import {getJwt} from "../helpers/LocalStorage";
import axios from "axios";
import {getURL} from "../helpers/Config";


class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: undefined,
            // add item
            nameAdd: undefined,
            priceAdd: undefined,
            // edit item
            idEdit: undefined,
            nameEdit: undefined,
            priceEdit: undefined,
            // delete item
            idDelete: undefined

        }
    }

    load() {
        const jwt = getJwt();
        if (!jwt) {
            this.props.history.push('/signin')
        }
        axios.get(getURL("/api/v1.0/items"),
            {
                headers: {
                    Authorization: 'Bearer ' + jwt,
                }
            }).then(res => {
                console.log(res.data)
                this.setState({
                    items: res.data.items
                });
            }
        ).catch(err => {
        })
    }

    onItemAddSubmit(e) {
        e.preventDefault();
        const jwt = getJwt();
        if (!jwt) {
            this.props.history.push('/signin')
        }
        axios.post(getURL("/api/v1.0/item"), JSON.stringify({
                name: this.state.nameAdd,
                price: this.state.priceAdd
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


    onItemEditSubmit(e) {
        e.preventDefault();
        const jwt = getJwt();
        if (!jwt) {
            this.props.history.push('/signin')
        }
        axios.put(getURL("/api/v1.0/item"), JSON.stringify({
                id: this.state.idEdit,
                name: this.state.nameEdit,
                price: this.state.priceEdit
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

    onItemEdit(e, id) {
        e.preventDefault();
        const jwt = getJwt();
        if (!jwt) {
            this.props.history.push('/signin')
        }
        axios.get(getURL("/api/v1.0/item/" + id),
            {
                headers: {
                    Authorization: 'Bearer ' + jwt,
                    "Content-Type": "application/json"
                }
            }
        ).then(resp => {
            console.log(resp.data);
            this.setState(
                {
                    idEdit: id,
                    idDelete: id,
                    nameEdit: resp.data.name,
                    priceEdit: resp.data.price,
                }
            )
        });
    }

    onItemDelete(e) {
        e.preventDefault();
        const jwt = getJwt();
        if (!jwt) {
            this.props.history.push('/signin')
        }
        axios.delete(getURL("/api/v1.0/item/" + this.state.idDelete),
            {
                headers: {
                    Authorization: 'Bearer ' + jwt,
                    "Content-Type": "application/json"
                }
            }
        ).then(resp => {
            this.load()
        });
    }


    change(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }


    componentDidMount() {
        this.load()
    }

    render() {
        let items = this.state.items;
        let itemList;
        if (items !== undefined && items !== null) {
            itemList = items.map((item) =>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-6">
                                {item.name}
                            </div>
                            <div className="col-sm-3">
                                {"RS : " + item.price}
                            </div>
                            <div className="col-sm-3">
                                <button className="btn btn-secondary btn-sm float-right" data-toggle="modal"
                                        data-target="#editItemModal"
                                        onClick={e => this.onItemEdit(e, item.id)}>Edit
                                </button>
                            </div>
                        </div>
                    </div>
                </li>
            );
        }
        return (
            <section>
                <h4>Item List</h4>
                <ul className="list-group">
                    {itemList}
                </ul>
                <br/>
                <div className="form-group">
                    <button type="button" className="btn btn-primary btn-sm" data-toggle="modal"
                            onClick={e => {
                            }}
                            data-target="#addItemModal">Add
                    </button>
                </div>

                {/*add item model*/}
                <div className="modal fade" id="addItemModal" tabIndex="-1" role="dialog"
                     aria-labelledby="" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add Item</h5>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={e => {
                                    this.onItemAddSubmit(e)
                                }} noValidate autoComplete="off">
                                    <div className="form-group">
                                        <label htmlFor="itemNameAdd">Name</label>
                                        <input id="itemNameAdd" className="form-control" placeholder="" type="text"
                                               name="nameAdd" onChange={e => this.change(e)}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="stakeHolderUniqueId">Price</label>
                                        <input id="stakeHolderUniqueId" className="form-control" placeholder=""
                                               type="text"
                                               name="priceAdd" onChange={e => this.change(e)}/>
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-primary btn-sm button-margin">Save
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary btn-sm button-margin"
                                        data-dismiss="modal">Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/*edit item model*/}
                <div className="modal fade" id="editItemModal" tabIndex="-1" role="dialog"
                     aria-labelledby="" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Item</h5>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={e => {
                                    this.onItemEditSubmit(e)
                                }} noValidate autoComplete="off">
                                    <div className="form-group">
                                        <label htmlFor="nameEdit">Name</label>
                                        <input id="nameEdit" className="form-control" type="text"
                                               placeholder={this.state.nameEdit}
                                               name="nameEdit" onChange={e => this.change(e)}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="priceEdit">Price</label>
                                        <input id="priceEdit" className="form-control"
                                               placeholder={this.state.priceEdit}
                                               type="text"
                                               name="priceEdit" onChange={e => this.change(e)}/>
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-primary btn-sm button-margin">Save
                                        </button>
                                        <button onClick={e => this.onItemDelete(e)} className="btn btn-danger btn-sm button-margin">Delete
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary btn-sm button-margin"
                                        data-dismiss="modal">Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        );
    }
}

export default Item;