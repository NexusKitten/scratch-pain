import {combineReducers} from 'redux';
import intlReducer from './intl';
import stateReducer from './playground-states';
import {ScratchPaintReducer} from '../..';

export default combineReducers({
    intl: intlReducer,
    scratchPaint: ScratchPaintReducer,
    playground: stateReducer,
});
