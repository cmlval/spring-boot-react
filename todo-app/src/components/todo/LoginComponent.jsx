import React, {Component} from 'react'
import AuthenticationService from './AuthenticationService.js'

class LoginComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: 'christian',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }
        //this.handleUsernameChange = this.handleUsernameChange.bind(this)
        //this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.loginClick = this.loginClick.bind(this)
    }

    handleChange(event) {        
        this.setState(
            {
                [event.target.name]: event.target.value                    
            }
        )       
    }

    /*handleUsernameChange(event) {
        console.log(event.target.name);     
        this.setState(
            {
                [event.target.name]
                    :event.target.value                    
            }
        )       
    }

    handlePasswordChange(event) {
        console.log(event.target.value);     
        this.setState(
            {
                password: event.target.value                    
            }
        )       
    }*/

    loginClick () {       
        /*AuthenticationService
            .executeBasicAuthenticationService(this.state.username, this.state.password)
            .then(
                () => {
                    AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password);
                    this.props.history.push(`/welcome/${this.state.username}`);
                }
            ).catch(
                () => {
                    this.setState({showSuccessMessage: false})      
                    this.setState({hasLoginFailed: true})  
                }
            )*/

        AuthenticationService
            .executeJwtAuthenticationService(this.state.username, this.state.password)
            .then(
                (response) => {
                    AuthenticationService.registerSuccessfulLoginForJwt(this.state.username, response.data.token);
                    this.props.history.push(`/welcome/${this.state.username}`);
                }
            ).catch(
                () => {
                    this.setState({showSuccessMessage: false})      
                    this.setState({hasLoginFailed: true})  
                }
            )        
            
    }

    render () {
        return (
            <div>
                <h1>Login</h1>
                <div className="container">                    
                        {/*<ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed} />*/}
                        {/*<ShowLoginSuccessMessage showSuccessMessage={this.state.showSuccessMessage} />*/}
                        {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credencials</div>}
                        {this.state.showSuccessMessage && <div>Login Sucessful</div>}                      
                        User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                        Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />                        
                        <button  className="btn btn-success" onClick={this.loginClick}>Login</button>                
                </div>
            </div>
        )   
    }
}

export default LoginComponent;