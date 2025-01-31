const app = require('./app');
const {PORT} = require('./config/config').config;

app.listen(PORT, ()=>{
    console.log(`port: ${PORT}`);
});