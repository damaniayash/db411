import React from 'react';
import {useParams} from "react-router";
import AgentView from './AgentView.js';


function AgentViewWrapper() {

    const { id } = useParams();
    console.log(id);

    return (
        <div>
            <AgentView agentId={id} />
        </div>
    );
}

export default AgentViewWrapper;