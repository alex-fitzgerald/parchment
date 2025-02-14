import type { ParchmentSectionKey, ParchmentSectionRef } from '../types.ts';

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

export type ParchmentReducerAction =
    SetCurrentSectionAction
    | AddSectionAction
    | RemoveSectionAction
    | SetSectionIsInViewportAction;
