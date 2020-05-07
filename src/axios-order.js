import axios from 'axios';

const instance =  axios.create({
    baseURL : 'https://shridutt-s-burger.firebaseio.com/'
});

export default instance;