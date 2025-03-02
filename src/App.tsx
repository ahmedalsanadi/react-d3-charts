import React from 'react';
import { LineChart } from './lib/components/LineChart/LineChart';
import { BarChart } from './lib/components/BarChart/BarChart';
import { NetworkGraph } from './lib/components/NetworkGraph/NetworkGraph';
import { AdaptiveTreemap } from './lib/components/AdaptiveTreemap/AdaptiveTreemap';

function App() {
    // Sample data for Line Chart
    const lineData = [
        { x: 0, y: 10 },
        { x: 1, y: 15 },
        { x: 2, y: 35 },
        { x: 3, y: 25 },
        { x: 4, y: 45 },
    ];

    // Sample data for Bar Chart
    const barData = [
        { x: 'A', y: 10 },
        { x: 'B', y: 15 },
        { x: 'C', y: 35 },
        { x: 'D', y: 25 },
        { x: 'E', y: 45 },
    ];

    // Sample data for Network Graph
    const networkData = {
        id: 'root',
        label: 'Technology Stack',
        description: 'Overview of our technology ecosystem',
        children: [
            {
                id: 'frontend',
                label: 'Frontend',
                description: 'Frontend technologies and frameworks',
                children: [
                    {
                        id: 'react',
                        label: 'React',
                        description: 'UI Library',
                        children: [
                            {
                                id: 'hooks',
                                label: 'Hooks',
                                description: 'React Hooks API',
                            },
                            {
                                id: 'components',
                                label: 'Components',
                                description: 'Reusable UI Components',
                            },
                        ],
                    },
                    {
                        id: 'styling',
                        label: 'Styling',
                        description: 'CSS and styling solutions',
                        children: [
                            {
                                id: 'tailwind',
                                label: 'Tailwind',
                                description: 'Utility-first CSS framework',
                            },
                            {
                                id: 'css-modules',
                                label: 'CSS Modules',
                                description: 'Scoped CSS',
                            },
                        ],
                    },
                ],
            },
            {
                id: 'backend',
                label: 'Backend',
                description: 'Backend services and infrastructure',
                children: [
                    {
                        id: 'api',
                        label: 'API',
                        description: 'API Services',
                        children: [
                            {
                                id: 'rest',
                                label: 'REST',
                                description: 'RESTful APIs',
                            },
                            {
                                id: 'graphql',
                                label: 'GraphQL',
                                description: 'GraphQL APIs',
                            },
                        ],
                    },
                    {
                        id: 'database',
                        label: 'Database',
                        description: 'Database solutions',
                        children: [
                            {
                                id: 'postgres',
                                label: 'PostgreSQL',
                                description: 'Relational Database',
                            },
                            {
                                id: 'redis',
                                label: 'Redis',
                                description: 'In-memory Cache',
                            },
                        ],
                    },
                ],
            },
        ],
    };

    // Real-life data for AdaptiveTreemap: Global company revenue distribution
    const treemapData = {
        name: 'Global Revenue',
        children: [
            {
                name: 'Technology',
                children: [
                    {
                        name: 'Apple',
                        value: 394,
                        color: '#1f77b4',
                        insights: 'Largest tech company by revenue',
                    },
                    {
                        name: 'Microsoft',
                        value: 198,
                        color: '#ff7f0e',
                        insights: 'Leader in cloud & enterprise solutions',
                    },
                    {
                        name: 'Google',
                        value: 280,
                        color: '#2ca02c',
                        insights: 'Dominates online advertising',
                    },
                ],
            },
            {
                name: 'Automotive',
                children: [
                    {
                        name: 'Toyota',
                        value: 276,
                        color: '#d62728',
                        insights: 'Largest automaker by sales',
                    },
                    {
                        name: 'Volkswagen',
                        value: 295,
                        color: '#9467bd',
                        insights: 'Leader in EV transformation',
                    },
                ],
            },
            {
                name: 'Retail',
                children: [
                    {
                        name: 'Amazon',
                        value: 502,
                        color: '#8c564b',
                        insights: 'E-commerce giant & AWS leader',
                    },
                    {
                        name: 'Walmart',
                        value: 611,
                        color: '#e377c2',
                        insights: 'Largest retailer globally',
                    },
                ],
            },
        ],
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4">
                        Line Chart Example
                    </h2>
                    <LineChart
                        data={lineData}
                        width={600}
                        height={400}
                        color="#3b82f6"
                    />
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4">
                        Bar Chart Example
                    </h2>
                    <BarChart
                        data={barData}
                        width={600}
                        height={400}
                        color="#10b981"
                    />
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4">
                        Network Graph Example
                    </h2>
                    <NetworkGraph
                        data={networkData}
                        width={800}
                        height={600}
                        nodeColor="#3b82f6"
                        parentNodeColor="#4f46e5"
                    />
                </div>

                {/* Adaptive Treemap Component */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4">
                        Adaptive Treemap Example
                    </h2>
                    <p className="text-gray-600 mb-4">
                        This treemap visualizes the annual revenue of the top
                        companies across industries. Click a company to focus,
                        hover for insights, and use zoom controls to explore.
                    </p>
                    <AdaptiveTreemap
                        data={treemapData}
                        width={800}
                        height={600}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
