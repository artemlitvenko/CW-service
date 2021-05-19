import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import { createOrder } from '../../../actions/order';
import orderReducer from '../../../reducers/orderReducer';
import { ADD_ORDER, SET_POPUP_CREATE_DISPLAY_ORDER } from '../../../constarts/actionOrderTypes';
import OrderMaster from '../orderMaster/OrderMaster';
import { create, act } from 'react-test-renderer';

test('Successful order creation', () => {
    let formData = createOrder(
        'Artem',
        'art@gmail.com',
        '6081471583fde44a4010eb1b',
        '6081358e2dd14410205faf0e',
        7200000,
        '2021-05-15T06:00:23.377Z',
        '2021-05-15T08:00:23.377Z',
    );
    let action = {
        type: ADD_ORDER,
        payload: formData,
    };
    const state = {
        orders: [],
    };
    let newState = orderReducer(state, action);
    expect(newState.orders.length).toBe(1);
});

test('display popup after order creation', () => {
    let popupOrder = true;
    const state = {
        popupCreateDisplay: false,
    };
    let action = {
        type: SET_POPUP_CREATE_DISPLAY_ORDER,
        payload: popupOrder,
    };
    let newState = orderReducer(state, action);
    expect(newState.popupCreateDisplay).toBe(true);
});

test('Correct send date in props', () => {
    let component;
    act(() => {
        component = create(<OrderMaster master="Artem Artemov" />);
    });
    const instance = component.root;
    expect(instance.props.master).toBe('Artem Artemov');
});

/*
test('What I will do', () => {
    // Test data
    // Action
    // Expectation
});
*/
