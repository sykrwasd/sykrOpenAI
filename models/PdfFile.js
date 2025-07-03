// backend/models/PdfFile.js
import mongoose from 'mongoose';

const PdfFileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  contentType: { type: String, default: "application/pdf" },
  data: { type: Buffer, required: true },
  uploadedAt: { type: Date, default: Date.now }
});

export default mongoose.model('PdfFile', PdfFileSchema);


//example data
// {
//   "_id": "6677aabcde1234567890abcd",
//   "filename": "lecture_notes_week2.pdf",
//   "contentType": "application/pdf",
//   "data": "JVBERi0xLjQKJeLjz9MKMSAwIG9iago8PC9U...", 
//   "uploadedAt": "2025-06-23T15:00:00.000Z",
//   "__v": 0
// }



// "data": "JVBERi0xLjQKJeLjz9MKMSAwIG9iago8PC9U..."
// That is the Base64-encoded content of your PDF file.

// A PDF is binary data.

// When storing in MongoDB using Buffer or string, it may be encoded into Base64 to safely store and transfer as text.

// That string represents the entire PDF, just in a format readable by systems that don’t handle raw binary.


