import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import routes from './src/routes/crmRoutes';
import * as dotenv  from 'dotenv';

dotenv.config();

const app = express();
const { PORT, DB_NAME, DB_USER, DB_PASSWORD } = process.env;

// mongoose connection
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.46y9z.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`);

// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

// serving static files
app.use(express.static('public'));

app.get('/', (req, res) =>
    res.send(`Node and express server is running on port ${PORT}`)
);

app.listen(PORT, () =>
    console.log(`your server is running on port ${PORT}`)
);