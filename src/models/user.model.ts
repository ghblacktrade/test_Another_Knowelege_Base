import {
    AllowNull,
    Column,
    DataType,
    Model,
    Table
} from "sequelize-typescript";

@Table
export class UserModel extends Model<UserModel> {
    @Column({
        allowNull: false,
        unique: true,
    })
    email: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    passwordHash: string;
}