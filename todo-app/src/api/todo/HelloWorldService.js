import axios from 'axios'

class HelloWorldService {

    executeHelloWorldService() {
        return axios.get("http://localhost:8080/hello-world")
        //console.log('executed service')
    }

    executeHelloWorldBeanService() {
        return axios.get("http://localhost:8080/hello-world-bean")
        //console.log('executed service bean')
    }

    executeHelloWorldPathVariableService(name) {
        
        return axios.get(`http://localhost:8080/hello-world-bean/path-variable/${name}`);
        //console.log('executed service bean')
    }
}

export default new HelloWorldService()
