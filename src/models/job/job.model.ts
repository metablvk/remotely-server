import mongoose, {Schema, Types} from 'mongoose';

interface IJob {
  _id: Types.ObjectId;
  title: string;
  payType: string;
  payRate: string;
  desc: string;
  createdBy?: Types.ObjectId;
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
  desc: {
    type: String,
    required: true,
  },
  createdBy: {type: mongoose.Types.ObjectId, ref: 'User', required: true},
});

const Job = mongoose.model('Job', jobSchema);

export default Job;
