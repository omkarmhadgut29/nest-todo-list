import { Test, TestingModule } from '@nestjs/testing';
import { TodoUiService } from './todo-ui.service';

describe('TodoUiService', () => {
  let service: TodoUiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodoUiService],
    }).compile();

    service = module.get<TodoUiService>(TodoUiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
