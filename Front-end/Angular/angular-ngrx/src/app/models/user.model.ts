import { Base } from './base.model';

export class User extends Base{
    public USERID: string;
    public USERNAME: string;
    public PASSWORD: string;
    public ROLE: string;
    public ACTIVE: number;
    public EMAIL: string;
    public DAYOFBIRTH: string;
    public ADDRESS: string;
}