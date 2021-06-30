import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    // Complete usando query builder
    return this.repository.createQueryBuilder("games")
    .where("lower(games.title) like lower('%"+param+"%')")
    .getMany()
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return this.repository.query("select count(id) from games"); 
    // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    return this.repository.createQueryBuilder("user_games")
    .relation(Game, "users")
    .of(id)
    .loadMany()
    //.innerJoinAndSelect("games.users", "users")
    //.where("games.id = :id", {id: id})
    //.getMany()
      // Complete usando query builder
  }
}
