import React from 'react';
import './Clients.css';
import { useSelector } from 'react-redux';
import Client from '../client/Client';

const Clients = ({ setCurrentClientId }) => {
    const clientsList = useSelector((state) => state.clientReducer.clients).map((client) => (
        <Client key={client._id} client={client} setCurrentClientId={setCurrentClientId} />
    ));
    return <div>{clientsList}</div>;
};

export default Clients;
