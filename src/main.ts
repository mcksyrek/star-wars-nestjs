import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CharacterService } from './character/character.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const characterService = app.get(CharacterService);
  const existing = await characterService.findAll();

  if (existing.length === 0) {
    await characterService.createMany([
      { name: 'Luke Skywalker', episodes: ['NEWHOPE', 'EMPIRE', 'JEDI'] },
      { name: 'Darth Vader', episodes: ['NEWHOPE', 'EMPIRE', 'JEDI'] },
      { name: 'Han Solo', episodes: ['NEWHOPE', 'EMPIRE', 'JEDI'] },
      { name: 'Leia Organa', episodes: ['NEWHOPE', 'EMPIRE', 'JEDI'], planet: 'Alderaan' },
      { name: 'Wilhuff Tarkin', episodes: ['NEWHOPE'] },
      { name: 'C-3PO', episodes: ['NEWHOPE', 'EMPIRE', 'JEDI'] },
      { name: 'R2-D2', episodes: ['NEWHOPE', 'EMPIRE', 'JEDI'] },
    ]);
  }

  await app.listen(3000);
}
bootstrap();
