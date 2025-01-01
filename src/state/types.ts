import type { ParchmentSectionKey, ParchmentSectionRef, ParchmentSections } from '../types.ts';

export const ParchmentActionType = {
    SET_CURRENT_PARCHMENT_SECTION: 'SET_CURRENT_PARCHMENT_SECTION',
    ADD_PARCHMENT_SECTION: 'ADD_PARCHMENT_SECTION',
    REMOVE_PARCHMENT_SECTION: 'REMOVE_PARCHMENT_SECTION',
};

interface ParchmentState {
    currentParchmentSectionKey?: ParchmentSectionKey | null;
    parchmentSections?: ParchmentSections;
}

interface SetCurrentParchmentSectionAction {
    type: typeof ParchmentActionType.SET_CURRENT_PARCHMENT_SECTION;
    payload: ParchmentSectionKey;
}

interface AddParchmentSectionAction {
    type: typeof ParchmentActionType.ADD_PARCHMENT_SECTION;
    payload: {
        parchmentSectionKey: ParchmentSectionKey;
        parchmentSection: ParchmentSectionRef;
    };
}

interface RemoveParchmentSectionAction {
    type: typeof ParchmentActionType.REMOVE_PARCHMENT_SECTION;
    payload: ParchmentSectionKey;
}

type ParchmentAction = SetCurrentParchmentSectionAction | AddParchmentSectionAction | RemoveParchmentSectionAction;

export type {
    ParchmentState,
    SetCurrentParchmentSectionAction,
    AddParchmentSectionAction,
    RemoveParchmentSectionAction,
    ParchmentAction,
};
