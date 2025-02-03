import { useContext } from 'react';
import ParchmentContext from '../state/parchment-context.ts';

export default function useParchmentContext() {
    return useContext(ParchmentContext);
}
