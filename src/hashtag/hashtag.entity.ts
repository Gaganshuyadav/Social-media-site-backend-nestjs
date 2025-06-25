import { TweetEntity } from "src/tweet/tweet.entity";
import { Column, DeleteDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class HashtagEntity{


    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type:"text",
        nullable: false
    })
    name: string;

    @ManyToMany(()=>TweetEntity) 
    // @JoinTable()   //we need only one @JoinTable() decorator which we defined in tweet entity, otherwise it creates new junction table
    tweets: TweetEntity[];


    
    //for soft delete, we need to add deletedAt
    @DeleteDateColumn()
    deletedAt: Date;


}


