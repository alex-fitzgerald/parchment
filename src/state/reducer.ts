import { ParchmentAction, ParchmentActionType, ParchmentState } from './types.ts';

function reducer(state: ParchmentState, { type, payload }: ParchmentAction) {
    switch (type) {
        case ParchmentActionType.SET_CURRENT_PARCHMENT_SECTION:
            return {
                ...state,
                currentParchmentSectionKey: payload,
            };

        case ParchmentActionType.ADD_PARCHMENT_SECTION:
            if (typeof payload === 'string') {
                return state;
            }

            return {
                ...state,
                parchmentSections: {
                    ...state.parchmentSections,
                    [payload.parchmentSectionKey]: payload.parchmentSection,
                },
            };

        case ParchmentActionType.REMOVE_PARCHMENT_SECTION:
            if (typeof payload === 'string' && state && state.parchmentSections?.[payload]) {
                delete state.parchmentSections[payload];
            }

            return state;

        default:
            return state;
    }
}

export default reducer;
