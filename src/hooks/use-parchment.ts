import { useContext } from 'react';
import ParchmentContext from '../state/parchment-context';

export default function useParchment() {
    return useContext(ParchmentContext);
}
