import { Injectable } from '@nestjs/common';
import { CardCoreService } from 'src/core/service/card-core/card-core.service';
import { CreateCardDto } from './dto/create-card.dto';

@Injectable()
export class CardsService {
  constructor(private readonly cardCoreService: CardCoreService) {}
  private cards: string[];

  async findAll(): Promise<CreateCardDto[]> {
    const response = await this.cardCoreService.findAll();

    return response.map((entity) => CreateCardDto.fromEntity(entity));
  }

  async save(dto: CreateCardDto): Promise<CreateCardDto> {
    const entity = CreateCardDto.toEntity(dto);
    const saved = await this.cardCoreService.save(entity);

    return CreateCardDto.fromEntity(saved);
  }

  async findById(id: number): Promise<CreateCardDto> {
    const entity = await this.cardCoreService.findOne(id);

    return CreateCardDto.fromEntity(entity);
  }

  async update(dto: CreateCardDto): Promise<CreateCardDto> {
    const saved = await this.cardCoreService.findOne(dto.id);
    const entity = {
      ...saved,
      ...CreateCardDto.toEntity(dto),
    };
    const updated = await this.cardCoreService.save(entity);

    return CreateCardDto.fromEntity(updated);
  }

  async delete(id: number): Promise<void> {
    await this.cardCoreService.remove(id);
  }
}