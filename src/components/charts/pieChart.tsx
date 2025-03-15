"use client"

import React, { useState } from "react";
import type { EnvironmentalImpact } from "@/lib/types";
import { useTranslation } from "@/lib/i18n";
import { PieChart, Pie, Sector, ResponsiveContainer, Legend, Tooltip, Cell } from "@/components/ui/chart";

interface EnvironmentalImpactChartProps {
    impact: EnvironmentalImpact;
}

interface RenderActiveShapeProps {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    startAngle: number;
    endAngle: number;
    fill: string;
    payload: { name: string };
    percent: number;
    value: number;
}

const renderActiveShape = (props: RenderActiveShapeProps) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
        <g>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${value}`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                {`(${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};

export function EnvironmentalImpactChart({ impact }: EnvironmentalImpactChartProps) {
    const { t } = useTranslation();
    const [activeIndex, setActiveIndex] = useState(0);

    const data = [
        { name: t("co2Reduction"), value: (impact.co2Reduction) },
        { name: t("familiesBenefited"), value: (impact.familiesBenefited) },
        { name: t("hectaresPreserved"), value: (impact.hectaresPreserved) },
    ];

    const COLORS = ["#78D484", "#2D4F4A", "#F87B36"];

    const onPieEnter = (_: unknown, index: number) => {
        setActiveIndex(index);
    };

    return (
        <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        activeIndex={activeIndex}
                        activeShape={renderActiveShape as unknown as (props: unknown) => React.JSX.Element}
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        onMouseEnter={onPieEnter}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        wrapperStyle={{
                            borderRadius: '8px',
                            backgroundColor: '#ffffff',
                            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                            padding: '10px',
                            border: 'none',
                            outline: 'none',
                        }}
                        formatter={(value: number, name: string) => {
                            if (name === t("co2Reduction")) return [`${(value).toLocaleString()} ${t("tons")}`, name];
                            if (name === t("familiesBenefited")) return [`${(value).toLocaleString()}`, name];
                            if (name === t("hectaresPreserved")) return [`${(value).toLocaleString()} ha`, name];
                            return [value, name];
                        }}
                    />
                    <Legend wrapperStyle={{ textAlign: "left", justifyContent: "end", alignItems: "end", display: "flex", flexDirection: "row", flexWrap: "wrap" }} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}