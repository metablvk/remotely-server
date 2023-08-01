import {Request, Response} from 'express';
import asyncHandler from 'express-async-handler';

// @desc Create job
// route POST /api/job
// @access private
const createJob = asyncHandler(async (req: Request, res: Response) => {
  res.send('Create job handler');
});

// @desc Get job
// route GET /api/job/:id
// @access PUBLIC
const getJob = asyncHandler(async (req: Request, res: Response) => {
  res.send('Get job handler');
});

// @desc Get jobs
// route GET /api/job/
// @access PUBLIC
const getJobs = asyncHandler(async (req: Request, res: Response) => {
  res.send('Get jobs handler');
});

// @desc Update job
// route PUT /api/job/:id
// @access PRIVATE
const updateJob = asyncHandler(async (req: Request, res: Response) => {
  res.send('Update job handler');
});

// @desc Delete jobs
// route DELETE /api/job/:id
// @access PRIVATE
const deleteJob = asyncHandler(async (req: Request, res: Response) => {
  res.send('Delete job handler');
});

export {createJob, getJob, getJobs, updateJob, deleteJob};
