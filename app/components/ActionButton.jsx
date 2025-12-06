// components/ActionButton.jsx
import React from 'react'

/**
 * ActionButton - Reusable button for actions (save, delete, etc.)
 * @param {Object} props
 * @param {Function} props.onClick - Click handler
 * @param {boolean} props.disabled - Whether button is disabled
 * @param {string} props.color - Tailwind color name (red, blue, orange, purple)
 * @param {Component} props.icon - React icon component
 * @param {string} props.label - Button label
 */
export default function ActionButton({ onClick, disabled, color, icon: Icon, label }) {
    // const colorMap = {
    //     red: '#ef4444',
    //     blue: '#3b82f6',
    //     orange: '#f97316',
    //     purple: '#a855f7',
    //     green: '#22c55e',
    // }

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className="flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer transition-opacity hover:opacity-70 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ color: disabled ? '#9ca3af' : 'black' }}
        // title={label}
        >
            <Icon size={18} />
            {/* <span className="text-xs font-medium">{label}</span> */}
        </button>
    )
}