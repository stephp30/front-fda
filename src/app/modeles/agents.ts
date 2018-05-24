import { Flux } from './flux';
import { Ilots } from './ilots';
import { Grades } from './grade';
export interface Agents {
    id?: number;
    idRh?: string;
    nom?: string;
    prenom?: string;
    grade?: Grades;
    ilot?: Ilots;
    flux?: Flux;
}
