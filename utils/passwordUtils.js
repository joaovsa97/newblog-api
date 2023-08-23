import bcrypt from 'bcryptjs'

async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10)

    return bcrypt.hashSync(password, salt)
}

async function comparePassword(password, userPassword) {
    return bcrypt.compareSync(password, userPassword)
}

export { hashPassword, comparePassword }