import connectDB from '@/lib/mongodb'
import FloorPlan from '@/models/FloorPlan'
import { NextResponse } from 'next/server'
import mongoose from 'mongoose'

export async function GET() {
	try {
		await connectDB()

		const connectionState = mongoose.connection.readyState
		const states = ['disconnected', 'connected', 'connecting', 'disconnecting']

		const count = await FloorPlan.countDocuments()
		const collections = await mongoose.connection.db.listCollections().toArray()
		const floorPlans = await FloorPlan.find({}).lean()

		return NextResponse.json({
			connection: states[connectionState],
			database: mongoose.connection.name,
			collections: collections.map((c) => c.name),
			floorPlanCount: count,
			collectionName: FloorPlan.collection.name,
			floorPlans: floorPlans,
		})
	} catch (error) {
		return NextResponse.json(
			{
				error: error.message,
				stack: error.stack,
			},
			{ status: 500 }
		)
	}
}
