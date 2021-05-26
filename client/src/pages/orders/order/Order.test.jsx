import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { REMOVE_ORDER } from '../../../constarts/actionOrderTypes';
import orderReducer from '../../../reducers/orderReducer';
configure({ adapter: new Adapter() });

describe('Correct work delete action', () => {
    it('after deleting length of array should be decremented', () => {
        let orderId = '6081476483fde44a4010eb23';
        const state = {
            orders: [{ _id: '6081476483fde44a4010eb23' }, { _id: '6081476483fde44a4010eb85' }],
        };
        let action = {
            type: REMOVE_ORDER,
            payload: orderId,
        };
        let newState = orderReducer(state, action);
        expect(newState.orders.length).toBe(1);
    });
    test('after deleting length of array should not be decremented if ID is incorrect', () => {
        let orderId = '6081476483fde44a4010eb25';
        const state = {
            orders: [{ _id: '6081476483fde44a4010eb23' }, { _id: '6081476483fde44a4010eb85' }],
        };
        let action = {
            type: REMOVE_ORDER,
            payload: orderId,
        };
        let newState = orderReducer(state, action);
        expect(newState.orders.length).toBe(2);
    });
});
