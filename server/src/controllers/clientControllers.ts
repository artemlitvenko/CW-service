import { Request, Response } from 'express';
import { ClientModel } from '../models/Client';
import { OrderModel } from '../models/Order';
import { MasterModel } from '../models/Master';

export async function getClients(req: Request, res: Response) {
    try {
        const client = await ClientModel.find();
        return res.json(client);
    } catch (e) {
        res.status(500).json(e);
    }
}

export async function updateClient(req: Request, res: Response) {
    try {
        const client = req.body;
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ message: 'ID not found' });
        }
        const updatedClient = await ClientModel.findByIdAndUpdate(id, client, { new: true });
        return res.json(updatedClient);
    } catch (e) {
        res.status(500).json(e);
    }
}
export async function deleteClient(req: Request, res: Response) {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ message: 'ID not found' });
        }
        const client = await ClientModel.findByIdAndDelete(id);
        // @ts-ignore
        const allClientOrders = client.client_order;

        let orderForDelete;

        for (let i = 0; i < allClientOrders.length; i++) {
            await OrderModel.findByIdAndDelete(allClientOrders[i]);

            const masterWithCurrentOrder = await MasterModel.findOne({ order: allClientOrders[i] });
            orderForDelete = allClientOrders[i];
            // @ts-ignore
            let masterAllOrder = masterWithCurrentOrder.order.filter(
                // @ts-ignore
                (masterOrderId) => !allClientOrders.some((clientOrderId) => allClientOrders.includes(masterOrderId)),
            );
            // @ts-ignore
            let masterId = masterWithCurrentOrder._id;
            let addOrderIdToMaster = { order: masterAllOrder };
            await MasterModel.findByIdAndUpdate(masterId, addOrderIdToMaster, { new: true });
        }

        return res.json(client);
    } catch (e) {
        res.status(500).json(e);
    }
}
