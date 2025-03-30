import UserModel from "../Models/user.model.js";

async function createUser({ name, email, password }) {
    if (!name) throw new Error("Firstname is required");
    if (!email) throw new Error("Email is required");
    if (!password) throw new Error("Password is required");

    const user = await UserModel.create({
        name,
        email,
        password,
    });

    return user;
}

export default { createUser };
