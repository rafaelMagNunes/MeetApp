import { Router } from 'express';
import Brute from 'express-brute';
import BruteRedis from 'express-brute-redis';
import multer from 'multer';
import multerConfig from './config/multer';

// Middlewares
import authMiddleware from './app/middlewares/auth';

// Controllers
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import MeetupController from './app/controllers/MeetupController';
import OrganizingController from './app/controllers/OrganizingController';
import SubscriptionController from './app/controllers/SubscriptionController';

// Validators
import validateUserStore from './app/validators/UserStore';
import validateUserUpdate from './app/validators/UserUpdate';
import validateSessionStore from './app/validators/SessionStore';
import validateMeetupStore from './app/validators/MeetupStore';
import validateMeetupUpdate from './app/validators/MeetupUpdate';

const routes = new Router();

const upload = multer(multerConfig);

const bruteStore = new BruteRedis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

const bruteForce = new Brute(bruteStore);

routes.post('/users', validateUserStore, UserController.store);
routes.post(
  '/sessions',
  validateSessionStore,
  bruteForce.prevent,
  SessionController.store
);

routes.use(authMiddleware);

routes.post('/files', upload.single('file'), FileController.store);

routes.put('/users', validateUserUpdate, UserController.update);

routes.get('/meetups', MeetupController.index);
routes.post('/meetups', validateMeetupStore, MeetupController.store);
routes.put('/meetups/:id', validateMeetupUpdate, MeetupController.update);
routes.delete('/meetups/:id', MeetupController.delete);
routes.get('/meetupsbyid/:id', MeetupController.findById);

routes.get('/organizing', OrganizingController.index);
routes.get('/subscriptions', SubscriptionController.index);

routes.post('/meetups/:meetupId/subscriptions', SubscriptionController.store);

export default routes;
