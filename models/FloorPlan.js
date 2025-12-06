// models/FloorPlan.js
import mongoose from 'mongoose'

const FloorPlan = new mongoose.Schema(
	{
		name: {
			type: String,
			default: 'Untitled Floor Plan',
		},

		description: {
			type: String,
			default: '',
		},

		walls: {
			type: [
				{
					id: { type: String, required: true },
					points: { type: [Number], required: true },
					_id: false, // Disable auto _id for subdocuments
				},
			],
			default: [],
		},

		doors: {
			type: [
				{
					id: { type: String, required: true },
					wallId: { type: String, required: true },
					x: { type: Number, required: true },
					y: { type: Number, required: true },
					width: { type: Number, required: true },
					angle: { type: Number, required: true },
					_id: false,
				},
			],
			default: [],
		},

		windows: {
			type: [
				{
					id: { type: String, required: true },
					wallId: { type: String, required: true },
					x: { type: Number, required: true },
					y: { type: Number, required: true },
					width: { type: Number, required: true },
					angle: { type: Number, required: true },
					_id: false,
				},
			],
			default: [],
		},

		thumbnail: String,

		isPublic: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
)

export default mongoose.models.FloorPlan || mongoose.model('FloorPlan', FloorPlan)
