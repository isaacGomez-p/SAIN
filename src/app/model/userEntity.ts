import { RolEntity } from "./rolEntity";

export class UserEntity{
    userId: number;
    name: string;
    lastname: string;
    identification: string;
    email: string;
    password: string;
    roleEntity: RolEntity;
}