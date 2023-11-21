import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Roles } from "../utils/common/user-role.enum";

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    email: number;

    @Column()
    password: string;

    @Column({type:'enum',enum:Roles,array:true,default:[Roles.USER]})
    roles: Roles[]

    @Column()
    created_at: Date;
}
