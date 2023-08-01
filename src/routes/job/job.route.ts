import express from 'express';
const router = express.Router();

import {
  createJob,
  getJob,
  getJobs,
  updateJob,
  deleteJob,
} from '../../controllers/job/job.controller';

router.route('/').post(createJob).get(getJobs);
router.route('/:id').get(getJob).put(updateJob).delete(deleteJob);

export default router;
