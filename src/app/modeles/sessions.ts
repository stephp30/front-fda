import { Salles } from './salle';
import { Formations } from './formation';
import { Habilitations } from './habilitations';
import { Formateurs } from './formateurs';
import { Agents } from './agents';
export interface Sessions {

    id?: number;
    nom?: string;
    nbrePersonne?: number;
    agents?: Agents[];
    formateur?: Formateurs;
    habilitations?: Habilitations;
    formation?: Formations;
    salle?: Salles;
    date?: Date;

}
