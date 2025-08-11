export class UserEntity {
  id!: string;
  email!: string;
  name: string | null = null;
  createdAt!: Date;
  updatedAt!: Date;
}

