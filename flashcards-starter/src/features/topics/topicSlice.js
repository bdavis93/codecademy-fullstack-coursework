import { createSlice } from '@reduxjs/toolkit';

const options = {
    name: 'topics',
    initialState: {
        topics: {
            id: '',
            name: '',
            icon: '',
            quizIds: []
        }
    },
    reducers: {
        addTopic: {
            reducer: (state, action) => {
                state.topics.push(action.payload)
            }
        }
    }
}

export const topicsSlice = createSlice(options);

export const selectTopic = state => state.topics;