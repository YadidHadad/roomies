// components/ToolButton.jsx
import React from 'react'

/**
 * ToolButton - Reusable button for drawing tools
 * @param {Object} props
 * @param {Function} props.onClick - Click handler
 * @param {boolean} props.active - Whether the tool is active
 * @param {Component} props.icon - React icon component
 * @param {string} props.label - Button label
 */
export default function ToolButton({ onClick, active, icon: Icon, label }) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer transition-all ${active
                ? 'border border-gray-800 text-gray-800'
                : 'border border-transparent text-gray-600 hover:text-gray-800'
                }`}
            title={label}
        >
            <Icon size={18} />
            <span className="text-xs">{label}</span>
        </button>
    )
}