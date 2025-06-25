import { UserEntity } from "src/users/user.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class ProfileEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar",
        nullable: true,
        length: 100
    })
    firstName?: string;
    
    @Column({
        type: "varchar",
        nullable: true,
        length: 100
    })
    lastName?: string;

    @Column({
        type: "varchar",
        nullable: true,
        length: 10
    })
    gender?: string;

    @Column({
        type: "timestamp",
        nullable: true,
    })
    dateOfBirth?: Date

    @Column({
        type: "text",
        nullable: true
    })
    bio?: string;

    @Column({
        type: "text",
        nullable: true
    })
    profileImage?: string


    @OneToOne(()=>UserEntity, ( user)=>user.profile,  {
        onDelete:"CASCADE"
    })
    @JoinColumn()
    user?: UserEntity  





}







