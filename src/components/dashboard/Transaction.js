import React, {Component} from 'react';
import '../app/App.css';
import {getJwt} from "../helpers/LocalStorage";
import axios from "axios";
import {getURL} from "../helpers/Config";
import {getCurrentDate} from "../helpers/Util";
import {MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter} from 'mdbreact';


class Transaction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stakeholders: undefined,
            stakeholderName: undefined,
            stakeholderId: undefined,
            filterDate: undefined,
            //  add transaction
            itemReleaseQtyAdd: undefined,
            itemReturnQtyAdd: undefined,
            itemAdd: undefined,
            // transactions
            transactionSummary: undefined,
            // edit transaction
            itemIdEdit: undefined,
            itemTransactionIdEdit: undefined,
            itemReleaseQtyEdit: undefined,
            itemReturnQtyEdit: undefined,
            //delete transaction
            itemTransactionIdDelete: undefined,
            //pdf path
            pdfPath: undefined,

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
                let list = res.data.stakeholders;
                let stakeholder = "";
                if (list !== undefined && list !== null) {
                    stakeholder = list[0]
                } else {
                }
                this.setState({
                    stakeholders: list,
                    stakeholderId: stakeholder.id,
                    stakeholderName: stakeholder.name,
                    filterDate: getCurrentDate()
                });
                this.loadTransactions();
            }
        ).catch(err => {

        })

    }


    change(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    doFilter(e) {
        e.preventDefault();
        this.loadTransactions();
    }

    onStakeholderFilterChange(e) {
        let index = e.nativeEvent.target.selectedIndex;
        this.setState(
            {
                stakeholderId: e.target.value,
                stakeholderName: e.nativeEvent.target[index].text,
            }
        )
    }

    onDateFilterChange(e) {
        this.setState(
            {
                filterDate: e.target.value,
            }
        )
    }


    loadItems() {
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
                this.setState({
                    items: res.data.items
                });
            }
        ).catch(err => {

        })
    }

    loadTransactions() {
        const jwt = getJwt();
        if (!jwt) {
            this.props.history.push('/signin')
        }
        axios.get(getURL("/api/v1.0/transactions/summary?") + "date=" + this.state.filterDate + "&stakeholderId=" + this.state.stakeholderId,
            {
                headers: {
                    Authorization: 'Bearer ' + jwt,
                }
            }).then(res => {
                console.log(res.data);
                this.setState({
                    transactionSummary: res.data
                })
            }
        ).catch(err => {

        })
    }

    onExportPdf(e) {
        const jwt = getJwt();
        if (!jwt) {
            this.props.history.push('/signin')
        }

        this.setState(
            {
                pdfPath: undefined,
            }
        );
        axios.get(getURL("/api/v1.0/transactions/summary-report?") + "date=" + this.state.filterDate + "&stakeholderId=" + this.state.stakeholderId,
            {
                headers: {
                    Authorization: 'Bearer ' + jwt,
                }
            }).then(res => {
                this.setState(
                    {
                        pdfPath: "http://sixensor.com:8003/file?name=" + res.data.path
                    }
                );
            }
        ).catch(err => {

        })
    }

    onAddTransaction(e) {
        this.loadTransactions();
        this.loadItems()
    }

    onAddTransactionSubmit(e) {
        e.preventDefault();
        const jwt = getJwt();
        if (!jwt) {
            this.props.history.push('/signin')
        }
        axios.post(getURL("/api/v1.0/transaction"), JSON.stringify({
                stakeholder_id: Number(this.state.stakeholderId),
                item_id: Number(this.state.itemAdd),
                release_qty: Number(this.state.itemReleaseQtyAdd),
                return_qty: Number(this.state.itemReturnQtyAdd),
                date_create: this.state.filterDate
            }),
            {
                headers: {
                    Authorization: 'Bearer ' + jwt,
                    "Content-Type": "application/json"
                }
            }
        ).then(resp => {
            this.loadTransactions();
        });
    }

    onEditTransaction(e, id) {
        console.log(id);
        e.preventDefault();
        const jwt = getJwt();
        if (!jwt) {
            this.props.history.push('/signin')
        }
        axios.get(getURL("/api/v1.0/transaction/sid/" + this.state.stakeholderId + "/tid/" + id),
            {
                headers: {
                    Authorization: 'Bearer ' + jwt,
                    "Content-Type": "application/json"
                }
            }
        ).then(resp => {
            this.setState(
                {
                    itemIdEdit: resp.data.item_id,
                    itemTransactionIdEdit: id,
                    itemReleaseQtyEdit: resp.data.release_qty,
                    itemReturnQtyEdit: resp.data.return_qty,
                    itemTransactionIdDelete: id,
                }
            )
        });
    }

    onEditTransactionSubmit(e) {
        e.preventDefault();
        const jwt = getJwt();
        if (!jwt) {
            this.props.history.push('/signin')
        }
        axios.put(getURL("/api/v1.0/transaction"), JSON.stringify({
                item_id: Number(this.state.itemIdEdit),
                release_qty: Number(this.state.itemReleaseQtyEdit),
                return_qty: Number(this.state.itemReturnQtyEdit),
                stakeholder_id: Number(this.state.stakeholderId),
                id: Number(this.state.itemTransactionIdEdit)
            }),
            {
                headers: {
                    Authorization: 'Bearer ' + jwt,
                    "Content-Type": "application/json"
                }
            }
        ).then(resp => {
            this.loadTransactions();
        });
    }

    onDeleteTransaction(e) {
        e.preventDefault();
        const jwt = getJwt();
        if (!jwt) {
            this.props.history.push('/signin')
        }
        axios.delete(getURL("/api/v1.0/transaction/sid/" + this.state.stakeholderId + "/tid/" + this.state.itemTransactionIdDelete),
            {
                headers: {
                    Authorization: 'Bearer ' + jwt,
                    "Content-Type": "application/json"
                }
            }
        ).then(resp => {
            this.loadTransactions();
        });
    }

    render() {
        let stakeholders = this.state.stakeholders;
        console.log(stakeholders);
        let optionItems;
        if (stakeholders !== undefined && stakeholders !== null) {
            optionItems = stakeholders.map((stakeholder) =>
                <option value={stakeholder.id}>{stakeholder.name}</option>
            );
            console.log(optionItems)
        }

        let items;
        if (this.state.items !== undefined && this.state.items !== null) {
            items = this.state.items.map((item) =>
                <option value={item.id}>{item.name}</option>
            );
        }

        // get transaction summary request
        // {
        //     "transactions": [
        //     {
        //         "date": "2019-12-27",
        //         "item_name": "Egg Bun Special",
        //         "item_price": "40.50",
        //         "release_qty": 12,
        //         "return_qty": 10,
        //         "earnings": "81.00"
        //     }],
        //         "balance_summery": {
        //         "total": "51111.00"
        //     }
        // }

        let transactionRows;
        let totalValue;
        if (this.state.transactionSummary !== undefined) {
            if (this.state.transactionSummary.transactions !== undefined && this.state.transactionSummary.transactions !== null) {
                transactionRows = this.state.transactionSummary.transactions.map((transaction) =>
                    <tr>
                        <td>{transaction.id}</td>
                        <td>{transaction.date}</td>
                        <td>{transaction.item_name}</td>
                        <td className="text-right">{transaction.item_price}</td>
                        <td className="text-center">{transaction.release_qty}</td>
                        <td className="text-center">{transaction.return_qty}</td>
                        <td className="text-right">{transaction.earnings}</td>
                        <td>
                            <div className="col-auto">
                                <button onClick={e => this.onEditTransaction(e, transaction.id)} type="button"
                                        className="btn btn-toolbar btn-sm custom-edit-btn" data-toggle="modal"
                                        data-target="#editTransactionModel">
                                    <i className="fa fa-edit"/>
                                </button>
                            </div>
                        </td>
                    </tr>
                );
                totalValue = this.state.transactionSummary.balance_summery.total
            }

        }

        return (
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <form onSubmit={e => this.doFilter(e)}>
                                <div className="form-row align-items-center">
                                    <div className="col-auto">
                                        <label className="sr-only" htmlFor="StakeHolder">StakeHolder</label>
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text">StakeHolder</div>
                                            </div>
                                            <select onChange={e => this.onStakeholderFilterChange(e)}
                                                    className="form-control"
                                                    id="StakeHolder">
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
                                            <input onChange={e => this.onDateFilterChange(e)} type="date"
                                                   name="dateFilter" max="3000-12-31"
                                                   min="1000-01-01" className="form-control"/>
                                        </div>
                                    </div>
                                    <div className="col-auto">
                                        <button type="submit" className="btn btn-dark mb-2"><i
                                            className="fa fa-filter"/> Apply Filters
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <br/>
                    <h5>Transactions</h5>
                    <div id="stakeholder-detail" className="row">
                        <div className="col-md-6">
                            <table className="table table-borderless">
                                <tbody>
                                <tr>
                                    <td><b>Stakeholder :</b></td>
                                    <td>{this.state.stakeholderName}</td>
                                </tr>
                                <tr>
                                    <td><b>Date : </b></td>
                                    <td>{this.state.filterDate}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="col-md-6">
                            <button type="button" className="btn btn-dark btn-sm  float-right" data-toggle="modal"
                                    data-target="#addTransactionModel" onClick={e => {
                                this.onAddTransaction(e)
                            }}><i className="fa fa-plus-circle"/> Add Transaction
                            </button>
                        </div>
                    </div>
                    <div>
                        <table className="table table-sm table-bordered">
                            <thead className="thead-dark">
                            <tr>
                                <th className="text-center">Tid</th>
                                <th className="text-center">Date</th>
                                <th className="text-center">Item Name</th>
                                <th className="text-center">Item Price (LKR)</th>
                                <th className="text-center">Release Qty</th>
                                <th className="text-center">Return Qty</th>
                                <th className="text-center">Earnings (LKR)</th>
                                <th className="text-center">Edit</th>
                            </tr>
                            </thead>
                            <tbody>
                            {transactionRows}
                            <tr>
                                <td colSpan="5"></td>
                                <td><b>Total (LKR)</b></td>
                                <td className="text-right">{totalValue}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col-auto">
                        <button data-toggle="modal"
                                data-target="#pdfViewModel" onClick={e => this.onExportPdf(e)}
                                className="btn btn-danger primary btn-sm mb-2">
                            <i className="fa fa-file-pdf-o"/> Export PDF
                        </button>
                    </div>


                    {/*Add transaction model*/}
                    <div className="modal fade" id="addTransactionModel" tabIndex="-1" role="dialog"
                         aria-labelledby="" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5>Add Transaction</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true" className="white-text">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={e => this.onAddTransactionSubmit(e)} noValidate autoComplete="off">
                                        <div className="form-group">
                                            <label htmlFor="itemAdd">Type</label>
                                            <select onChange={e => this.change(e)} className="form-control" id="itemAdd"
                                                    name="itemAdd">
                                                <option value="0">NONE</option>
                                                {items}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="itemReleaseQtyAdd">Release Qty</label>
                                            <input id="itemReleaseQtyAdd" className="form-control" placeholder=""
                                                   type="text"
                                                   name="itemReleaseQtyAdd" onChange={e => this.change(e)}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="itemReturnQtyAdd">Return Qty</label>
                                            <input id="itemReturnQtyAdd" className="form-control" placeholder=""
                                                   type="text"
                                                   name="itemReturnQtyAdd" onChange={e => this.change(e)}/>
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


                    {/*Edit transaction model*/}
                    <div className="modal fade" id="editTransactionModel" tabIndex="-1" role="dialog"
                         aria-labelledby="" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="">Edit Id
                                        : {this.state.itemTransactionIdEdit}</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true" className="white-text">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={e => this.onEditTransactionSubmit(e)} noValidate autoComplete="off">
                                        <div className="form-group">
                                            <label htmlFor="itemReleaseQtyEdit">Release Qty</label>
                                            <input id="itemReleaseQtyEdit" className="form-control"
                                                   placeholder={this.state.itemReleaseQtyEdit}
                                                   type="text"
                                                   name="itemReleaseQtyEdit" onChange={e => this.change(e)}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="itemReturnQtyEdit">Return Qty</label>
                                            <input id="itemReturnQtyEdit" className="form-control"
                                                   placeholder={this.state.itemReturnQtyEdit}
                                                   type="text"
                                                   name="itemReturnQtyEdit" onChange={e => this.change(e)}/>
                                        </div>
                                        <div className="form-group">
                                            <button type="submit" className="btn btn-dark btn-sm button-margin">
                                                <i className="fa fa-save"/> Save
                                            </button>
                                            <button onClick={e => this.onDeleteTransaction(e)}
                                                    className="btn btn-danger btn-sm button-margin">
                                                <i className="fa fa-trash"/> Delete
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal fade" id="pdfViewModel" tabIndex="-1" role="dialog"
                         aria-labelledby="" aria-hidden="true">
                        <div className="modal-dialog modal-xl" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5>Transactions - {this.state.stakeholderName} ({this.state.filterDate})</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true" className="white-text">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <iframe id="fred"
                                            src={this.state.pdfPath} frameBorder="0" scrolling="auto"
                                            height="600"
                                            width="100%"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Transaction;
