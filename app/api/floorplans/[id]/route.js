import connectDB from '@/lib/mongodb'
import FloorPlan from '@/models/FloorPlan'
import { NextResponse } from 'next/server'

// GET single floor plan
export async function GET(request, context) {
	try {
		await connectDB()

		// Await params in Next.js 15
		const params = await context.params
		const floorPlan = await FloorPlan.findById(params.id)

		if (!floorPlan) {
			return NextResponse.json(
				{
					success: false,
					error: 'Floor plan not found',
				},
				{ status: 404 }
			)
		}

		return NextResponse.json({
			success: true,
			data: floorPlan,
		})
	} catch (error) {
		console.error('Error fetching floor plan:', error)
		return NextResponse.json(
			{
				success: false,
				error: error.message,
			},
			{ status: 500 }
		)
	}
}

// PUT - Update floor plan
export async function PUT(request, context) {
	try {
		await connectDB()
		const body = await request.json()

		// Await params in Next.js 15
		const params = await context.params

		const floorPlan = await FloorPlan.findByIdAndUpdate(params.id, body, { new: true, runValidators: true })

		if (!floorPlan) {
			return NextResponse.json(
				{
					success: false,
					error: 'Floor plan not found',
				},
				{ status: 404 }
			)
		}

		return NextResponse.json({
			success: true,
			data: floorPlan,
		})
	} catch (error) {
		console.error('Error updating floor plan:', error)
		return NextResponse.json(
			{
				success: false,
				error: error.message,
			},
			{ status: 400 }
		)
	}
}

// DELETE floor plan
export async function DELETE(request, context) {
	try {
		await connectDB()

		// Await params in Next.js 15
		const params = await context.params
		const floorPlan = await FloorPlan.findByIdAndDelete(params.id)

		if (!floorPlan) {
			return NextResponse.json(
				{
					success: false,
					error: 'Floor plan not found',
				},
				{ status: 404 }
			)
		}

		return NextResponse.json({
			success: true,
			message: 'Floor plan deleted',
		})
	} catch (error) {
		console.error('Error deleting floor plan:', error)
		return NextResponse.json(
			{
				success: false,
				error: error.message,
			},
			{ status: 500 }
		)
	}
}
