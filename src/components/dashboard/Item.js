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
                                <button className="btn btn-toolbar btn-sm float-right" data-toggle="modal"
                                        data-target="#editItemModal"
                                        onClick={e => this.onItemEdit(e, item.id)}>
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
                            <h5>Items List</h5>
                        </div>
                        <div className="col-lg-6">
                            <div className="form-group">
                                <button type="button" className="btn btn-dark btn-sm " data-toggle="modal"
                                        data-target="#addItemModal"><i className="fa fa-plus-circle"/> Add Item
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <ul className="list-group">
                                {itemList}
                            </ul>
                        </div>
                    </div>
                </div>

                {/*add item model*/}
                <div className="modal fade" id="addItemModal" tabIndex="-1" role="dialog"
                     aria-labelledby="" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="">Add Item</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true" className="white-text">&times;</span>
                                </button>
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
                                        <button type="submit" className="btn btn-dark btn-sm button-margin">
                                            <i className="fa fa-save"/> Save
                                        </button>
                                    </div>
                                </form>
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
                                <h5 className="">Edit Item</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true" className="white-text">&times;</span>
                                </button>
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
                                        <button onClick={e => this.onItemDelete(e)}
                                                className="btn btn-danger btn-sm float-left button-margin">
                                            <i className="fa fa-trash"/> Delete
                                        </button>
                                        <button type="submit" className="btn btn-dark btn-sm float-right button-margin">
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

export default Item;