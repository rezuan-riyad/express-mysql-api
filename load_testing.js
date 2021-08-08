import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
    insecureSkipTLSVerify: true,
    noConnectionReuse: false,
    vus : 40,
    duration: '1s'
}

export default () => {
    http.get('http://localhost:5000');
}