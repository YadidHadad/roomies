import connectDB from '@/lib/mongodb'
import FloorPlan from '@/models/FloorPlan'
import { NextResponse } from 'next/server'

export async function GET() {
	try {
		await connectDB()

		// Clear existing data (optional)
		await FloorPlan.deleteMany({})

		// Insert test data
		const floorPlans = await FloorPlan.insertMany([
			{
				name: 'Modern Apartment',
				description: 'A modern 2-bedroom apartment layout',
				data: {
					walls: [],
					doors: [],
					windows: [],
				},
				dimensions: {
					width: 1000,
					height: 800,
				},
				category: 'residential',
				isPublic: true,
			},
			{
				name: 'Office Space',
				description: 'Open office floor plan',
				data: {
					walls: [],
					doors: [],
					windows: [],
				},
				dimensions: {
					width: 1500,
					height: 1200,
				},
				category: 'commercial',
				isPublic: true,
			},
			{
				name: 'Studio Layout',
				description: 'Compact studio apartment',
				data: {
					walls: [],
					doors: [],
					windows: [],
				},
				dimensions: {
					width: 600,
					height: 600,
				},
				category: 'residential',
				isPublic: false,
			},
		])

		return NextResponse.json({
			success: true,
			message: `Created ${floorPlans.length} floor plans`,
			data: floorPlans,
		})
	} catch (error) {
		return NextResponse.json(
			{
				success: false,
				error: error.message,
			},
			{ status: 500 }
		)
	}
}
