import {Request, Response} from 'express';
import asyncHandler from 'express-async-handler';
import User from '../../models/user/user.model';
import Job from '../../models/job/job.model';

// @desc Create job
// route POST /api/job
// @access private
const createJob = asyncHandler(async (req: Request, res: Response) => {
  const {title, payType, payRate, desc} = req.body;
  const user = await User.findById(req.user._id);
  if (user) {
    const job = await Job.create({
      title,
      payType,
      payRate,
      desc,
      createdBy: user._id,
    });
    if (job) {
      res.status(201).json(job);
    } else {
      res.status(400);
      throw new Error('Invalid job data');
    }
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc Get job
// route GET /api/job/:id
// @access PUBLIC
const getJob = asyncHandler(async (req: Request, res: Response) => {
  const job = await Job.findById(req.params.id);
  if (job) {
    res.json(job);
  } else {
    res.status(404);
    throw new Error('Job not found');
  }
});

// @desc Get jobs
// route GET /api/job/
// @access PUBLIC
const getJobs = asyncHandler(async (req: Request, res: Response) => {
  const jobs = await Job.find({}).populate({
    path: 'createdBy',
    select: ['_id', 'name'],
  });
  if (jobs) {
    res.send(jobs);
  } else {
    res.status(404);
    throw new Error('Jobs not found');
  }
});

const getJobsByUserId = asyncHandler(async (req: Request, res: Response) => {
  const jobs = await Job.find({createdBy: req.params.uid});
  res.send(jobs);
});

// @desc Update job
// route PUT /api/job/:id
// @access PRIVATE
const updateJob = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.user._id);
  const job = await Job.findById(req.params.id).populate({
    path: 'createdBy',
    select: '_id',
  });

  if (job && user && job.createdBy && job.createdBy.equals(user._id)) {
    const {title, payType, payRate, desc} = req.body;
    job.title = title;
    job.payType = payType;
    job.payRate = payRate;
    job.desc = desc;
    const updatedJob = await job.save();
    res.status(200).json({
      _id: updatedJob._id,
      title: updatedJob.title,
      payType: updatedJob.payType,
      payRate: updatedJob.payRate,
      desc: updatedJob.desc,
      createdBy: job.createdBy?._id,
    });
  } else {
    res.status(403);
    throw new Error('Not authorized');
  }
});

// @desc Delete jobs
// route DELETE /api/job/:id
// @access PRIVATE
const deleteJob = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.user._id);
  const job = await Job.findById(req.params.id).populate({
    path: 'createdBy',
    select: '_id',
  });
  if (job && user && job.createdBy && job.createdBy.equals(user._id)) {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedJob);
  } else {
    res.status(403);
    throw new Error('Not authorized');
  }
});

export {createJob, getJob, getJobs, updateJob, deleteJob, getJobsByUserId};
