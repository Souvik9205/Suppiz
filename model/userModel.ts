import { Schema, model, Document } from 'mongoose'

interface IUser extends Document {
  clerkId: string
  username: string
  email: string
  avatarUrl: string
  name?: string
  dob?: string
  country?: string
  city?: string
  occupation?: string
  motiveToJoin?: string
  experience?: string
  personalDetailsCompleted: boolean
  careerDetailsCompleted: boolean
}

const userSchema = new Schema<IUser>({
  clerkId: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  avatarUrl: { type: String, required: true },
  name: String,
  dob: String,
  country: String,
  city: String,
  occupation: String,
  motiveToJoin: String,
  experience: String,
  personalDetailsCompleted: { type: Boolean, default: false },
  careerDetailsCompleted: { type: Boolean, default: false }
})

const User = model<IUser>('User', userSchema)

export default User
export type { IUser }
