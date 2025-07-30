import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import { DataSource } from 'typeorm';
import { CharacterService } from '../src/character/character.service';

process.env.NODE_ENV = 'test';

describe('Character E2E', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let createdId: number;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    dataSource = app.get(DataSource);

  const characterService = app.get(CharacterService);
  await characterService.createMany([
    { name: 'Luke Skywalker', episodes: ['NEWHOPE', 'EMPIRE', 'JEDI'] },
    { name: 'Leia Organa', episodes: ['NEWHOPE', 'EMPIRE', 'JEDI'], planet: 'Alderaan' },
    { name: 'Darth Vader', episodes: ['NEWHOPE', 'EMPIRE', 'JEDI'] },
  ]);

  });

  afterAll(async () => {
    await dataSource.dropDatabase();
    await dataSource.destroy();
    await app.close();
  });

  it('should return characters (initial seed)', async () => {
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `{ characters { name } }`,
      })
      .expect(200);

    expect(response.body.data.characters.length).toBeGreaterThan(0);
  });

  it('should add a new character', async () => {
    const mutation = {
      query: `
        mutation {
          addCharacter(input: {
            name: "E2E Tester",
            episodes: ["JEDI"],
            planet: "Teston"
          }) {
            id
            name
            planet
            episodes
          }
        }
      `,
    };

    const res = await request(app.getHttpServer())
      .post('/graphql')
      .send(mutation)
      .expect(200);

    const result = res.body.data.addCharacter;
    expect(result.name).toBe('E2E Tester');
    expect(result.planet).toBe('Teston');
    expect(result.episodes).toEqual(['JEDI']);

    createdId = result.id;
  });

  it('should fetch the newly added character by id', async () => {
    const query = {
      query: `
        {
          character(id: ${createdId}) {
            id
            name
            planet
            episodes
          }
        }
      `,
    };

    const res = await request(app.getHttpServer())
      .post('/graphql')
      .send(query)
      .expect(200);

    expect(res.body.data.character.name).toBe('E2E Tester');
    expect(res.body.data.character.planet).toBe('Teston');
  });

  it('should update the character', async () => {
    const mutation = {
      query: `
        mutation {
          updateCharacter(id: ${createdId}, input: {
            planet: "Updated Planet"
          }) {
            id
            name
            planet
          }
        }
      `,
    };

    const res = await request(app.getHttpServer())
      .post('/graphql')
      .send(mutation)
      .expect(200);

    expect(res.body.data.updateCharacter.planet).toBe('Updated Planet');
  });

  it('should delete the character', async () => {
    const mutation = {
      query: `
        mutation {
          deleteCharacter(id: ${createdId})
        }
      `,
    };

    const res = await request(app.getHttpServer())
      .post('/graphql')
      .send(mutation)
      .expect(200);

    expect(res.body.data.deleteCharacter).toBe(true);
  });

  it('should return null for deleted character', async () => {
    const query = {
      query: `
        {
          character(id: ${createdId}) {
            name
          }
        }
      `,
    };

    const res = await request(app.getHttpServer())
      .post('/graphql')
      .send(query)
      .expect(200);

    expect(res.body.data.character).toBeNull();
  });
});
