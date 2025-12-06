import connectDB from '@/lib/mongodb'
import FloorPlan from '@/models/FloorPlan'
import { NextResponse } from 'next/server'

export async function GET(request) {
	try {
		console.log('🔍 Connecting to MongoDB...')
		await connectDB()
		console.log('✅ Connected')

		// Get query parameters for filtering
		const { searchParams } = new URL(request.url)
		const category = searchParams.get('category')
		const isPublic = searchParams.get('isPublic')

		// Build query
		let query = {}
		if (category) query.category = category
		if (isPublic !== null) query.isPublic = isPublic === 'true'

		console.log('🔍 Querying floor plans with:', query)
		console.log('📝 Collection name:', FloorPlan.collection.name)

		const floorPlans = await FloorPlan.find(query).sort({ createdAt: -1 })
		console.log('📊 Found floor plans:', floorPlans.length)

		return NextResponse.json({
			success: true,
			count: floorPlans.length,
			data: floorPlans,
		})
	} catch (error) {
		console.error('❌ Error:', error)
		return NextResponse.json(
			{
				success: false,
				error: error.message,
			},
			{ status: 500 }
		)
	}
}

export async function POST(request) {
	try {
		await connectDB()
		const body = await request.json()

		console.log('📝 Creating floor plan:', body)

		const floorPlan = await FloorPlan.create(body)

		console.log('✅ Floor plan created with ID:', floorPlan)

		return NextResponse.json(
			{
				success: true,
				data: floorPlan,
			},
			{ status: 201 }
		)
	} catch (error) {
		console.error('❌ Error creating floor plan:', error)
		return NextResponse.json(
			{
				success: false,
				error: error.message,
			},
			{ status: 400 }
		)
	}
}
