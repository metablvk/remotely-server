import express from 'express';
const router = express.Router();

import {
  createJob,
  getJob,
  getJobs,
  updateJob,
  deleteJob,
  getJobsByUserId,
} from '../../controllers/job/job.controller';
import {protect} from '../../middleware/auth.middleware';

router.route('/').post(protect, createJob).get(getJobs);
router
  .route('/:id')
  .get(getJob)
  .put(protect, updateJob)
  .delete(protect, deleteJob);

router.route('/users/:uid').get(getJobsByUserId);

export default router;
