import * as bcrypt from 'bcrypt';

const salt = await bcrypt.genSalt(10);
console.log(salt);
