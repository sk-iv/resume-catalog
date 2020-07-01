import { schema } from 'normalizr';

const user = new schema.Entity('users');
const usersSchema = [user];

export default usersSchema;
