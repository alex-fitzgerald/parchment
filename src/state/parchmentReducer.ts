import { ParchmentSectionKey, ParchmentSectionRef } from '../types.ts';
import isString from '../utils/isString.ts';

export const PARCHMENT_ACTION = {
    SET_CURRENT_PARCHMENT_SECTION: 'SET_CURRENT_PARCHMENT_SECTION',
    ADD_PARCHMENT_SECTION: 'ADD_PARCHMENT_SECTION',
    REMOVE_PARCHMENT_SECTION: 'REMOVE_PARCHMENT_SECTION',
    SET_PARCHMENT_SECTION_IS_IN_VIEWPORT: 'SET_PARCHMENT_SECTION_IS_IN_VIEWPORT',
};

export type ParchmentAction = typeof PARCHMENT_ACTION[keyof typeof PARCHMENT_ACTION];
interface SetCurrentSectionAction {
    type: ParchmentAction;
    payload: ParchmentSectionKey | null;
}
interface AddSectionAction {
    type: ParchmentAction;
    payload: {
        parchmentSectionKey: ParchmentSectionKey;
        parchmentSection: ParchmentSectionRef;
    };
}
interface RemoveSectionAction {
    type: ParchmentAction;
    payload: ParchmentSectionKey;
}

interface SetSectionIsInViewportAction {
    type: ParchmentAction;
    payload: {
        parchmentSectionKey: ParchmentSectionKey;
        isInViewport: boolean;
    };
}

type ParchmentReducerAction = SetCurrentSectionAction | AddSectionAction | RemoveSectionAction | SetSectionIsInViewportAction;

interface ParchmentState {
    currentParchmentSectionKey: ParchmentSectionKey | null;
    parchmentSections: Record<ParchmentSectionKey, { ref: ParchmentSectionRef; isInViewport: boolean }>;
}

export default function reducer(state: ParchmentState, { type, payload }: ParchmentReducerAction) {
    switch (type) {
        case PARCHMENT_ACTION.SET_CURRENT_PARCHMENT_SECTION:
            return {
                ...state,
                currentParchmentSectionKey: payload,
            };

        case PARCHMENT_ACTION.ADD_PARCHMENT_SECTION:
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

        case PARCHMENT_ACTION.REMOVE_PARCHMENT_SECTION:
            if (!isString(payload)) {
                return state;
            }

            delete state.parchmentSections[payload];

            return state;

        case PARCHMENT_ACTION.SET_PARCHMENT_SECTION_IS_IN_VIEWPORT:
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
