import React from 'react'

const LoadMenuModal = ({
	showLoadMenu,
	setShowLoadMenu,
	savedFloorPlans,
	loadFloorPlan,
}) => {
	return (
		<div>
			{/* Load Floor Plan Menu */}
			{showLoadMenu && (
				<div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-20 flex items-center justify-center">
					<div className="bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full max-h-96 overflow-y-auto">
						<div className="flex justify-between items-center mb-4">
							<h2 className="text-xl font-bold">
								Load Floor Plan
							</h2>
							<button
								onClick={() => setShowLoadMenu(false)}
								className="text-gray-500 hover:text-gray-700 text-2xl"
							>
								×
							</button>
						</div>

						{savedFloorPlans.length === 0 ? (
							<p className="text-gray-500">
								No saved floor plans found.
							</p>
						) : (
							<div className="space-y-2">
								{savedFloorPlans.map((plan) => (
									<div
										key={plan._id}
										className="border border-gray-200 p-4 rounded hover:bg-gray-50 cursor-pointer"
										onClick={() => loadFloorPlan(plan)}
									>
										<div className="flex justify-between items-center">
											<div>
												<p className="font-semibold">
													Floor Plan -{' '}
													{new Date(
														plan.createdAt
													).toLocaleDateString()}
												</p>
												<p className="text-sm text-gray-600">
													{plan.walls?.length || 0}{' '}
													walls,{' '}
													{plan.doors?.length || 0}{' '}
													doors,{' '}
													{plan.windows?.length || 0}{' '}
													windows
												</p>
											</div>
											<p className="text-xs text-gray-500">
												{new Date(
													plan.createdAt
												).toLocaleTimeString()}
											</p>
										</div>
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	)
}

export default LoadMenuModal
