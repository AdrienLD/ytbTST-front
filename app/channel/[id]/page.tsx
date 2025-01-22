"use client"
import React from 'react';
import { useParams } from 'next/navigation';

const ChannelPage: React.FC = () => {
    const { id } = useParams();

    return (
        <div>
            <h1>Channel Page</h1>
            <p>Channel ID: {id}</p>
        </div>
    );
};

export default ChannelPage;