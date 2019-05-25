import express from 'express';
import {
  redirectCtrl,
  postCtrl,
} from './controller';

const router = express.Router();

router
  .route('/:code')
  .get(redirectCtrl);

router
  .route('/urls')
  .post(postCtrl);

export default router;
