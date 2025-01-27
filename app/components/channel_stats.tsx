/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React from 'react';
import { useParams } from 'next/navigation';
import { fetchChannelStats } from '@/app/api';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Area, AreaChart, CartesianGrid, Legend, XAxis, YAxis } from 'recharts';

const ChannelStats: React.FC = () => {
    const { id } = useParams();
    const [ channelStats, setChannelStats ] = React.useState<any[]>([]);

    React.useEffect(() => {
        const fetchData = async () => {
            if (typeof id !== "string") return
            const data = await fetchChannelStats(id)
            setChannelStats(data)
        };
        fetchData();
    }, [id]);

    const chartConfig = {
        subscribers_count: {
          label: "Abonnés",
          color: "hsl(var(--chart-1))"
        },
        video_count: {
            label: "Nombre de vidéos",
            color: "hsl(var(--chart-2))",
        },
    } satisfies ChartConfig

    const minMaxValues = (data: any[], key: string) => {
        if (!data || data.length === 0) return [0, 0]
        const values = data.map((item) => item[key])
        const min = Math.min(...values)
        const max = Math.max(...values)
        const margin = (max - min)
        return [min - margin, max + margin]
      };
      
      const domainSubscribers = minMaxValues(channelStats, "subscribers_count");
      const domainVideos = minMaxValues(channelStats, "video_count");

    return (
        <div className="p-6 bg-gray-50 rounded-lg">
          {
            channelStats && channelStats.length > 0 &&
                <ChartContainer config={chartConfig} className="h-[200px] w-full">
                    <AreaChart
                        data={channelStats}
                        margin={{
                            top: 10,
                            bottom: 10,
                            left: 12,
                            right: 12,
                        }}
                    >
                        <defs>
                            <linearGradient id="subColor" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={chartConfig.subscribers_count.color} stopOpacity={0.7}/>
                                <stop offset="95%" stopColor={chartConfig.subscribers_count.color} stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="vidColor" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={chartConfig.video_count.color} stopOpacity={0.3}/>
                                <stop offset="95%" stopColor={chartConfig.video_count.color} stopOpacity={0}/>
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
                            yAxisId="left"
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `${value / 1000}k`}
                            domain={domainSubscribers}
                        />
                        <YAxis
                            yAxisId="right"
                            orientation="right"
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => Math.round(value).toString()}
                            domain={domainVideos}
                            interval={0}
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
                            dataKey="subscribers_count"
                            type="monotone"
                            strokeWidth={2}
                            fill="url(#subColor)"
                            stroke={chartConfig.subscribers_count.color}
                            name={chartConfig.subscribers_count.label}
                            yAxisId="left"
                        />
                        <Area
                            dataKey="video_count"
                            type="step"
                            strokeWidth={2}
                            fill="url(#vidColor)"
                            stroke={chartConfig.video_count.color}
                            name={chartConfig.video_count.label}
                            yAxisId="right"
                        />
                    </AreaChart>
                </ChartContainer>
            }
        </div>
    );
};

export default ChannelStats;