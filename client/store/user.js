import axios from 'axios';

export const getUser = async (id) => {
    const { data: user } = await axios.get(`/api/users/${id}`);
    return user;
};

export const getUserByEmail = async (email) => {
    const { data: user } = await axios.get(`/api/users/email/${email}`);
    return user;
};

export const updateUser = async (user) => {
    const id = user.id;
        const { data: updatedUser } = await axios.post(`/api/users/${id}`, user);
        return updatedUser;
};
