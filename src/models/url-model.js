import mongoose from 'mongoose';

/**
 * Mongoose schema for Music
 * @type {mongoose}
 */
const urlSchema = new mongoose.Schema({
  url: String,
  code: String,
}, {
  timestamps: true,
});

urlSchema.set('toObject', { getters: true });

export default mongoose.model('Url', urlSchema);
