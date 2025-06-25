import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import {  FindManyOptions, FindOptionsRelations, FindOptionsWhere, ObjectLiteral, Repository } from 'typeorm';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class PaginationProvider<T extends ObjectLiteral> {

    constructor(
        @Inject(REQUEST) private readonly request:Request
        // @Inject(REQUEST) private readonly request:Res
    ){}

    public async Pagination(
        paginationQuery: PaginationQueryDto,
        repository: Repository<T>,
        ExtraOptions:{
           where?: FindOptionsWhere<T>, 
           relations?: FindOptionsRelations<T>,
           countWhere?: FindManyOptions<T>,
        }
        
    ){

        const limit = paginationQuery.limit ?? 10;  
        const page = paginationQuery.page ?? 1;

        if( page<1){
            throw new BadRequestException("Page number should not be less than 1");
        }

        const skipPage = limit*(page-1);

        //skip and take
        const findOptions:FindManyOptions<T> = {
            skip: skipPage,
            take: limit,  
        };

        //where
        if(ExtraOptions.where){
            findOptions.where = ExtraOptions.where;
        }

        //relations
        if(ExtraOptions.relations){
            findOptions.relations = ExtraOptions.relations;
        }

        //database interaction for find many
        const findPage = await repository.find(findOptions);

        // count total pages
        let countTotalItems;
        if( ExtraOptions.countWhere){
            countTotalItems = await repository.count(ExtraOptions.countWhere);
        }
        else{
            countTotalItems = await repository.count({
                
            });
        }

        const itemPerPage = limit;
        const totalItems = countTotalItems;
        const currentPage = page;
        const totalPages = Math.ceil( countTotalItems/limit);

        if( totalPages < page){
            throw new BadRequestException("Page number should not be greater than total pages");
        }
    
        //url
        const newURL = `${this.request.protocol}://${this.request.headers.host}${this.request.url.split("?")[0]}`;

        return {
            data: findPage,
            meta: {
              itemPerPage: limit,
              totalItems: countTotalItems,
              currentPage: page,
              totalPages: Math.ceil( countTotalItems/limit) 
            },
            links: {
              first: `${newURL}?limit=${itemPerPage}&page=1`,
              last: `${newURL}?limit=${itemPerPage}&page=${totalPages}`,
              current: `${newURL}?limit=${itemPerPage}&page=${currentPage}`,
              next: ( currentPage+1>totalPages ? null : `${newURL}?limit=${itemPerPage}&page=${currentPage+1}`),
              previous: ( currentPage===1 ? null : `${newURL}?limit=${itemPerPage}&page=${currentPage-1}`)
            }
        }


    }

}
