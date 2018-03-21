import { setWinner, resetState, setInputValues } from '../src/state-functions';

describe('Addition', () => {
    it('knows that 2 and 2 make 4', () => {
        expect(2 + 2).toBe(4);
    });
});

describe('#setWinner', () => {
    it('sets winner X', () => {
        const winner = 'X';
        expect(setWinner(winner)).toEqual({winner: 'X'});
    })
});

describe('#resetState', () => {
    it('resets state to default', () => {
        const defaultObj = {hello: 'world'}
        expect(resetState(defaultObj)).toEqual({hello: 'world'});
    });
});

describe('#setInputValues', () => {
    it('sets new values when player inputs', () => {
        const curState = { foo: 'bar'};
        expect(setInputValues(curState, { foo: 'baz'})).toEqual({foo: 'baz'});
    });
});

describe('#setInputValues', () => {
    it('sets new values when player inputs', () => {
        const curState = { foo: 'bar', bar: 'bar'};
        expect(setInputValues(curState, { foo: 'baz'})).toEqual({foo: 'baz', bar: 'bar'});
    });
});