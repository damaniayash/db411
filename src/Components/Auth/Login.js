import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Login = (props)=>{

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    

    const onUsernameChangeHandle = (value)=>{
        setUsername(value);
    };

    const onPasswordChangeHandle = (value)=> {
        setPassword(value);
    };

    const onSubmit = async event => {
        console.log(username);
        console.log(password);

        await axios.get('http://127.0.0.1:8000/auth?email='+username+'&password='+password).then((res) => {
            var data = res.data;

            if(data == 'Failure'){
                document.getElementsByClassName('error-message')[0].style.display = 'block';
            }
            else {
                document.getElementsByClassName('error-message')[0].style.display = 'none';
                
                console.log(res.data[0].userid);

                navigate('/'+res.data[0].userid+'/home', {data:res.data});

            }
    });
};

    return (
        <>
            <div className="login-title">User Login</div>
                <div className="login-form">
                    <div className="input-column">
                        <input className="input inner-light username" value={username} onChange={e => onUsernameChangeHandle(e.target.value)} type="text" placeholder="Username"/>
                        <input className="input inner-light password" value={password} onChange={e => onPasswordChangeHandle(e.target.value)} type="password" placeholder="Password"/>
                    </div>
                    <button className="button inner-light" onClick={onSubmit}>Login</button>
                </div>
            <div className="error-message">Incorrect auth details.</div>
        </>
    );
}

// class Login extends React.Component{
//     constructor(props){
//         super(props);
//         this.state = {
//             username : "",
//             password : ""
//         }
//     }


//     onUsernameChangeHandle(value) {
//         this.setState({username : value});
//     }

//     onPasswordChangeHandle(value) {
//         this.setState({password : value});
//     }

//     async onSubmit(event){
//         event.preventDefault();
//         console.log(this.state.username);
//         console.log(this.state.password);

//         await axios.get('http://127.0.0.1:8000/auth?email='+this.state.username+'&password='+this.state.password).then((res) => {
//             var data = res.data;

//             if(data == 'Failure'){
//                 document.getElementsByClassName('error-message')[0].style.display = 'block';
//             }
//             else {
//                 document.getElementsByClassName('error-message')[0].style.display = 'none';
                
//                 console.log(this.props);

//             }

//         })


//     }

//     render() {
//         return (
//             <>
//                 <div className="login-title">User Login</div>
//                 <div className="login-form">
//                     <div className="input-column">
//                         <input className="input inner-light username" value={this.state.username} onChange={e => this.onUsernameChangeHandle(e.target.value)} type="text" placeholder="Username"/>
//                         <input className="input inner-light password" value={this.state.password} onChange={e => this.onPasswordChangeHandle(e.target.value)} type="password" placeholder="Password"/>
//                     </div>
//                     <button className="button inner-light" onClick={this.onSubmit.bind(this)}>Login</button>
//                 </div>
//                 <div className="error-message">Incorrect auth details.</div>
//             </>
//         )
//     };

// }

export default Login;