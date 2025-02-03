import isString from '../utils/is-string';
import {
    PARCHMENT_ACTION,
    ParchmentReducerAction,
} from './actions';
import {
    ParchmentSectionKey,
    ParchmentSectionRef,
} from '../types';

const {
    SET_CURRENT_PARCHMENT_SECTION,
    ADD_PARCHMENT_SECTION,
    REMOVE_PARCHMENT_SECTION,
    SET_PARCHMENT_SECTION_IS_IN_VIEWPORT,
} = PARCHMENT_ACTION;

export interface ParchmentState {
    currentParchmentSectionKey: ParchmentSectionKey | null;
    parchmentSections: Record<ParchmentSectionKey, {
        ref: ParchmentSectionRef;
        isInViewport: boolean;
    }>;
}

export default function reducer(state: ParchmentState, { type, payload }: ParchmentReducerAction) {
    switch (type) {
        case SET_CURRENT_PARCHMENT_SECTION:
            return {
                ...state,
                currentParchmentSectionKey: payload,
            };

        case ADD_PARCHMENT_SECTION:
            if (!payload || isString(payload) || !('parchmentSection' in payload)) {
                return state;
            }

            return {
                ...state,
                parchmentSections: {
                    ...state.parchmentSections,
                    [payload.parchmentSectionKey]: {
                        ref: payload.parchmentSection,
                        isInViewport: false,
                    },
                },
            };

        case REMOVE_PARCHMENT_SECTION:
            if (!isString(payload)) {
                return state;
            }

            delete state.parchmentSections[payload];

            return state;

        case SET_PARCHMENT_SECTION_IS_IN_VIEWPORT:
            if (!payload || isString(payload) || !('isInViewport' in payload)) {
                return state;
            }

            return {
                ...state,
                parchmentSections: {
                    ...state.parchmentSections,
                    [payload.parchmentSectionKey]: {
                        ...state.parchmentSections[payload.parchmentSectionKey],
                        isInViewport: payload.isInViewport,
                    },
                },
            };

        default:
            return state;
    }
}
