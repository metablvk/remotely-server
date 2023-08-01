import mongoose, {Schema, Types} from 'mongoose';

interface IJob {
  _id: Types.ObjectId;
  title: string;
  payType: string;
  payRate: string;
  jobDesc: string;
}

const jobSchema = new Schema<IJob>({
  title: {
    type: String,
    required: true,
  },
  payType: {
    type: String,
    required: true,
  },
  payRate: {
    type: String,
    required: true,
  },
  jobDesc: {
    type: String,
    required: true,
  },
});

const Job = mongoose.model('Job', jobSchema);

export default Job;
