import React, {Component} from 'react';
import Input from "@material-ui/core/Input";


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
    }
    render() {
        return (
            <form noValidate autoComplete="off">
                <Input defaultValue="Hello world" inputProps={{'aria-label': 'description'}}/>
                <Input placeholder="Placeholder" inputProps={{'aria-label': 'description'}}/>
                <Input defaultValue="Disabled" disabled inputProps={{'aria-label': 'description'}}/>
                <Input defaultValue="Error" error inputProps={{'aria-label': 'description'}}/>
            </form>
        );
    }
}
export default Login;