import { ProfileEntity } from "src/profile/profile.entity";
import { TweetEntity } from "src/tweet/tweet.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class UserEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar",
        nullable: false,
        length: 100
    })
    username: string;  

    @Column({
        type: "varchar",
        nullable: false,
        length: 100,
        unique: true
    })
    email: string;

    @Column({
        type: "varchar",
        nullable: false,
        length: 100,
        select: false
    })
    password: string;

    @OneToOne(()=>ProfileEntity, ( profile)=>profile.user , {
        cascade: [ "insert", "remove", "update"],
        onDelete: "CASCADE",             // when user delete, the profile is also deleted
        // cascade: true, 
        // eager: true                  // eager loading means fetch an entity from the database, its related entities


    })                                  // make relationship between tables
    // @JoinColumn()                    // i want to cascade delete operation ( means when user delete its profile also deleted then i need to remove the profileId column  from user table )       // make a column of profileId
    profile?: ProfileEntity


    @OneToMany(()=>TweetEntity, (tweet)=>tweet.user, {
        onDelete:"CASCADE"
    })
    tweet: TweetEntity[];


    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date


}

