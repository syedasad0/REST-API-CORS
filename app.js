const express = require ('express');
const app = express();
const morgan = require ('morgan');
const bodyParser = require ('body-parser');
const mongoose = require ('mongoose');


const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');


//app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, PATCH, GET');
    return res.status(200).json({});
}
next();
});


app.use('/products', productRoutes);
app.use('/orders', orderRoutes);


//For Handling Errors

app.use((req, res, next) => {
    const error = new Error('Page Not Found');
    error.status = 404;
    next(error);
})

//For Handling Other Errors

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});
/*app.use((req, res, next) => {
    res.status(200).json({
        message: 'It Works!'
    });
});*/

module.exports = app;
app.listen(8000);
console.log('Server Listening at: 8000');
