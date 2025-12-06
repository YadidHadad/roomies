import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
	throw new Error('Please define the MONGO_URI environment variable inside .env.local')
}

// Cached connection object
let cached = global.mongoose

if (!cached) {
	cached = global.mongoose = { conn: null, promise: null }
}

async function connectDB() {
	if (cached.conn) {
		return cached.conn
	}

	if (!cached.promise) {
		const opts = {
			bufferCommands: false,
			// You can also specify the DB name here if needed: dbName: 'architectural-platform'
		}

		cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
			console.log('✅ Mongoose DB connected successfully')
			return mongoose
		})
	}

	try {
		cached.conn = await cached.promise
	} catch (e) {
		cached.promise = null
		throw e
	}

	return cached.conn
}

export default connectDB
