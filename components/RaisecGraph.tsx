import React from 'react';
import { RaisecScores } from '../types';

interface RaisecGraphProps {
    scores: RaisecScores;
}

const RaisecGraph: React.FC<RaisecGraphProps> = ({ scores }) => {
    const size = 300;
    const center = size / 2;
    const maxRadius = center - 40;
    const labels = ['R', 'I', 'A', 'S', 'E', 'C'];
    const totalPoints = labels.length;

    // FIX: Iterate over labels array to guarantee point order for the radar chart and resolve type errors.
    const points = labels.map((label, i) => {
        const score = scores[label as keyof RaisecScores];
        const angle = (Math.PI / 2) - (2 * Math.PI * i) / totalPoints;
        const radius = (score / 100) * maxRadius;
        const x = center + radius * Math.cos(angle);
        const y = center - radius * Math.sin(angle);
        return `${x},${y}`;
    });

    const polygonPoints = points.join(' ');
    
    const renderGrid = () => {
        const levels = [25, 50, 75, 100]; // in percentage
        return levels.map(level => {
             const radius = (level / 100) * maxRadius;
             const gridPoints = labels.map((_, i) => {
                const angle = (Math.PI / 2) - (2 * Math.PI * i) / totalPoints;
                const x = center + radius * Math.cos(angle);
                const y = center - radius * Math.sin(angle);
                return `${x},${y}`;
             }).join(' ');

             return <polygon key={level} points={gridPoints} fill="none" stroke="rgba(71, 85, 105, 0.5)" strokeWidth="1" />;
        });
    }

    const renderAxes = () => {
        return labels.map((_, i) => {
            const angle = (Math.PI / 2) - (2 * Math.PI * i) / totalPoints;
            const x = center + maxRadius * Math.cos(angle);
            const y = center - maxRadius * Math.sin(angle);
            return <line key={i} x1={center} y1={center} x2={x} y2={y} stroke="rgba(71, 85, 105, 0.5)" strokeWidth="1" />;
        });
    }
    
    const renderLabels = () => {
        return labels.map((label, i) => {
             const angle = (Math.PI / 2) - (2 * Math.PI * i) / totalPoints;
             const radius = maxRadius + 20;
             const x = center + radius * Math.cos(angle);
             const y = center - radius * Math.sin(angle);
             return <text key={label} x={x} y={y} fill="#94a3b8" fontSize="16" textAnchor="middle" alignmentBaseline="middle" fontWeight="bold">{label}</text>
        });
    }

    return (
        <svg className="w-full h-auto max-w-[300px]" viewBox={`0 0 ${size} ${size}`}>
            <g>
                {renderGrid()}
                {renderAxes()}
                {renderLabels()}
                <polygon 
                    points={polygonPoints} 
                    fill="rgba(129, 140, 248, 0.4)" 
                    stroke="#818cf8" 
                    strokeWidth="2" 
                    className="animate-pulse-subtle"
                />
            </g>
        </svg>
    );
};

export default RaisecGraph;
