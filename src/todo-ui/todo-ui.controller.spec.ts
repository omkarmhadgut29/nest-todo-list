import { Test, TestingModule } from '@nestjs/testing';
import { TodoUiController } from './todo-ui.controller';

describe('TodoUiController', () => {
  let controller: TodoUiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoUiController],
    }).compile();

    controller = module.get<TodoUiController>(TodoUiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
