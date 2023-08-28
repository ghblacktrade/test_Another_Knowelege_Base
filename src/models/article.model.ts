import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { UserModel } from './user.model';

@Table
export class ArticleModel extends Model<ArticleModel> {
  @Column
  title: string;

  @Column
  content: string;

  @Column(DataType.ARRAY(DataType.STRING))
  tags: string[];

  @Column
  isPublic: boolean;

  @ForeignKey(() => UserModel)
  @Column
  authorId: number;

  @BelongsTo(() => UserModel)
  author: UserModel;
}
