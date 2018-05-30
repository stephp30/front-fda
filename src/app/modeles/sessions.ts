import { Salles } from './salle';
import { Formations } from './formation';
import { Habilitations } from './habilitations';
import { Formateurs } from './formateurs';
import { Agents } from './agents';
export interface Sessions {

    id?: number;
    nom?: string;
    nbrePersonne?: number;
    agent?: Agents[];
    formateur?: Formateurs;
    formation?: Formations;
    salle?: Salles;
    dateDebut?: Date;
    dateFin?: Date;
    validation?: boolean;

}
