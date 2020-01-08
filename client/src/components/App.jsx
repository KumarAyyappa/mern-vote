import React,{Component} from 'react';
import api from '../services/api';

// const App=()=><div>APP WORKS!!</div>;

class App extends Component{
    async componentDidMount(){
        const result=await api.call('post','auth/login',{
            username:"spknbhdvjb@sgswmsail.com",
	        password:"984873232169"
        });
        console.log(result);
    }

    render(){
        return <div>App works</div>;
    }
}

export default App;