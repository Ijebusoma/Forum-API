import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import bodyParser from 'body-parser';
import logger from 'morgan';
import passport from 'passport';
import routes from './routes';

require('./config/passport')(passport);

dotenv.config();
const port = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'randomstringoftext',
  saveUninitialized: true,
  resave: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
routes(app);
app.get('/', (req, res) => {
  res.status(200).send('Welcome to the Forum API');
});

app.use('*', (req, res) => res.send({ message: 'The API route you requested does not exist', }));
// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Forum API listening on port ${port}`));
export default app;
