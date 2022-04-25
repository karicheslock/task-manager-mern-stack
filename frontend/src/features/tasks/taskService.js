import axios from 'axios';

const API_URL = '/api/tasks/';

// Create new task
const createTask = async (taskData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(`${API_URL}create-task`, taskData, config);

    return response.data;
}

// Get tasks
const getTasks = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config);

    return response.data;
}

// Get single task
const getSingleTask = async(taskId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(`${API_URL}edit-task/${taskId}`, config);

    return response.data;
}

// Delete task
const deleteTask = async (taskId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + taskId, config);

    return response.data;
}

const taskService = {
    createTask,
    getTasks,
    getSingleTask,
    deleteTask,
}

export default taskService;