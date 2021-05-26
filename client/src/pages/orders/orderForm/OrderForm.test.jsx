import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, getByPlaceholderText, waitFor, getByLabelText } from '@testing-library/react';
import OrderForm from './OrderForm';
import { Provider } from 'react-redux';
import { store } from '../../../reducers';

let wrapper;
beforeEach(() => {
    wrapper = render(
        <Provider store={store}>
            <OrderForm />
        </Provider>,
    );
});
describe('Required field', () => {
    it('Input Name - should show validation on blur', async () => {
        const { getByPlaceholderText, getByText } = wrapper;

        const input = getByPlaceholderText('Your name');
        fireEvent.blur(input);

        await waitFor(() => {
            expect(getByText(/required/i)).toBeInTheDocument();
        });
    });
    it('Input Email - should show validation on blur', async () => {
        const { getByPlaceholderText, getByText } = wrapper;

        const input = getByPlaceholderText('Your email');
        fireEvent.blur(input);

        await waitFor(() => {
            expect(getByText(/required/i)).toBeInTheDocument();
        });
    });
    it('Select size - should show validation on blur', async () => {
        const { getByText, getByLabelText } = wrapper;

        const select = getByLabelText(/watch/i);
        fireEvent.blur(select);

        await waitFor(() => {
            expect(getByText(/required/i)).toBeInTheDocument();
        });
    });
    it('Select city - should show validation on blur', async () => {
        const { getByText, getByLabelText } = wrapper;

        const select = getByLabelText(/city/i);
        fireEvent.blur(select);

        await waitFor(() => {
            expect(getByText(/required/i)).toBeInTheDocument();
        });
    });
});
describe('Validation form', () => {
    it('Input Name - Sorry, name is to short!', async () => {
        const { getByPlaceholderText, getByText } = wrapper;

        const input = getByPlaceholderText('Your name');
        fireEvent.change(input, { target: { value: 'at' } });
        fireEvent.blur(input);

        await waitFor(() => {
            expect(getByText('Sorry, name is to short!')).toBeInTheDocument();
        });
    });
    it('Input Name - Sorry, name is to long!', async () => {
        const { getByPlaceholderText, getByText } = wrapper;

        const input = getByPlaceholderText('Your name');
        fireEvent.change(input, { target: { value: 'atffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff' } });
        fireEvent.blur(input);

        await waitFor(() => {
            expect(getByText('Sorry, name is to long!')).toBeInTheDocument();
        });
    });
    it('Input Email - Needs to be an email!', async () => {
        const { getByPlaceholderText, getByText } = wrapper;

        const input = getByPlaceholderText('Your email');
        fireEvent.change(input, { target: { value: 'atfff' } });
        fireEvent.blur(input);

        await waitFor(() => {
            expect(getByText('Needs to be an email')).toBeInTheDocument();
        });
    });
    it('Input Email - Sorry, email is to long!', async () => {
        const { getByPlaceholderText, getByText } = wrapper;

        const input = getByPlaceholderText('Your email');
        fireEvent.change(input, { target: { value: 'atddddddddddddddddddddddddddddddddddddddddddddddddddddddddfff@gmail.com' } });
        fireEvent.blur(input);

        await waitFor(() => {
            expect(getByText('Sorry, email is to long!')).toBeInTheDocument();
        });
    });
});
