import { HashtagEntity } from "src/hashtag/hashtag.entity";
import { UserEntity } from "src/users/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class TweetEntity{
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @Column()
    imageUrl?: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(()=>UserEntity, (user)=>user.tweet) 
    user: UserEntity;        // here we don't need to write @Join Column cause ManyToOne relation automatically create userId


    @ManyToMany(()=>HashtagEntity)
    @JoinTable()
    hashtags: HashtagEntity[];


}


