import express from 'express';
import {
  getCtrl,
  postCtrl,
} from './controller';

const router = express.Router();

router
  .route('/:code')
  .get(getCtrl);

router
  .route('/')
  .post(postCtrl);

export default router;
