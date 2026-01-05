// import axios from 'axios'

// const api = axios.create(
// {
//     baseURL: "https://localhost:7275/api",
//     headers: 
//     {
//         "Content-Type": "application/json"
//     }        
// });

// api.interceptors.request.use((config) => {
//     const token = localStorage.getItem("jwt");
//     if(token)
//     {
//         config.headers.Authorization = `Bearer ${token}`
//     }
//     return config;
// });

// export default api;


import axios from 'axios'

const api = axios.create({
    baseURL: "https://localhost:7275/api",
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true
});

export default api;