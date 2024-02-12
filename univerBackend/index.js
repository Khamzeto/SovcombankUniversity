const express = require('express');
const mongoose = require('mongoose');
const groupRouter = require('./routers/groupRouter');
const authRouter = require('./routers/authRouter');
const scheduleRouter = require('./routers/scheduleRouter');
const gradeRouter = require('./routers/gradeRouter');


const cors = require('cors');


const app = express();


app.use(cors());
app.use(express.json());

app.use('/group', groupRouter);
app.use('/auth', authRouter);
app.use('/grades', gradeRouter);
app.use('/api/schedule', scheduleRouter);



const PORT = 5000;


const start = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/dbname', {
            directConnection: true,
            serverSelectionTimeoutMS: 2000,
            appName: 'mongosh 2.0.2'
        });

        console.log('Connected to MongoDB');
        app.listen(PORT, () => console.log(`Server running on ${PORT}`));
    } catch (e) {
        console.error(e);
    }
};

start();
