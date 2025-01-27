/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React from 'react';
import { useParams } from 'next/navigation';
import { fetchVideoStats } from '@/app/api';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Area, AreaChart, CartesianGrid, Legend, XAxis, YAxis } from 'recharts';

const VideoStats: React.FC = () => {
    const { id } = useParams();
    const [ videoStats, setVideoStats ] = React.useState<any[]>([]);

    React.useEffect(() => {
        const fetchData = async () => {
            if (typeof id !== "string") return;
            const data = await fetchVideoStats(id);
            console.log(data);
            setVideoStats(data);
        };
        fetchData();
    }, [id]);

    const chartConfig = {
        views_count: {
            label: "Vues",
            color: "hsl(var(--chart-1))"
            },
        likes_count: {
            label: "Likes",
            color: "hsl(var(--chart-2))",
        },
        comments_count: {
            label: "Commentaires",
            color: "hsl(var(--chart-3))",
        },
    } satisfies ChartConfig

    const minMaxValues = (data: any[], key: string) => {
        if (!data || data.length === 0) return [0, 0]
        const values = data.map((item) => item[key])
        const max = Math.max(...values)
        return [0, max]
    }
      
    const domainViews = minMaxValues(videoStats, "views_count")
    const domainLikes = minMaxValues(videoStats, "likes_count")
    const domainComments = minMaxValues(videoStats, "comments_count")
    
    return (
        <div className="p-6 bg-gray-50 rounded-lg">
            { 
                videoStats && videoStats.length > 0 &&
                <ChartContainer config={chartConfig} className="h-[500px] w-full">
                    <AreaChart
                        data={videoStats}
                        margin={{
                            top: 10,
                            bottom: 10,
                            left: 12,
                            right: 12,
                        }}
                    >
                        <defs>
                            <linearGradient id="vieColor" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={chartConfig.views_count.color} stopOpacity={0.7}/>
                                <stop offset="95%" stopColor={chartConfig.views_count.color} stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="likColor" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={chartConfig.likes_count.color} stopOpacity={0.1}/>
                                <stop offset="95%" stopColor={chartConfig.likes_count.color} stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="comColor" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={chartConfig.comments_count.color} stopOpacity={0.1}/>
                                <stop offset="95%" stopColor={chartConfig.comments_count.color} stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} />
                        <Legend verticalAlign="bottom" height={36} iconType="circle" />
                        <XAxis
                            dataKey="recorded_at"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) =>
                                value ? new Date(value).toLocaleDateString("fr-FR", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                                }) : ""
                            }
                        />
                        <YAxis
                            yAxisId="views"
                            orientation="right"
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => value}
                            domain={domainViews}
                            style={{
                                fill: chartConfig.views_count.color, // Couleur des ticks
                                color: chartConfig.views_count.color, // Couleur des labels (si nécessaire)
                            }}
                        />
                        <YAxis
                            yAxisId="likes"
                            orientation="left"
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => value}
                            domain={domainLikes}
                            style={{
                                fill: chartConfig.likes_count.color, // Couleur des ticks
                                color: chartConfig.likes_count.color, // Couleur des labels (si nécessaire)
                            }}
                        />
                        <YAxis
                            yAxisId="comments"
                            orientation="left"
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => value}
                            domain={domainComments}
                            style={{
                                fill: chartConfig.comments_count.color,
                                color: chartConfig.comments_count.color,
                            }}
                            dx={20}
                        />
                        <ChartTooltip
                        cursor={false}
                        labelFormatter={(label) =>
                            new Date(label).toLocaleDateString('fr-FR', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                            })
                        }
                        content={<ChartTooltipContent indicator="dot" />}
                        />
                        <Area
                            dataKey="views_count"
                            type="monotone"
                            strokeWidth={2}
                            fill="url(#vieColor)"
                            stroke={chartConfig.views_count.color}
                            name={chartConfig.views_count.label}
                            yAxisId="views"
                        />
                        <Area
                            dataKey="likes_count"
                            type="monotone"
                            strokeWidth={2}
                            fill="url(#likColor)"
                            stroke={chartConfig.likes_count.color}
                            name={chartConfig.likes_count.label}
                            yAxisId="likes"
                        />
                        <Area
                            dataKey="comments_count"
                            type="monotone"
                            strokeWidth={2}
                            fill="url(#comColor)"
                            stroke={chartConfig.comments_count.color}
                            name={chartConfig.comments_count.label}
                            yAxisId="comments"
                        />
                    </AreaChart>
                </ChartContainer>
            }
        </div>
    );
};

export default VideoStats;