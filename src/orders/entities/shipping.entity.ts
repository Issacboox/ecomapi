import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderEntity } from "./order.entity";

@Entity({name:"shippings"})
export class ShippingEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    phone:string;

    @Column({default:''})
    name:string;

    @Column()
    address:string;

    @Column()
    more_info_address:string;

    @OneToOne(() => OrderEntity,(order) => order.shippingsAddress)
    order:OrderEntity;
}