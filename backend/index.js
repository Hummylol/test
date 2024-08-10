import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Hello' });
});
app.get('/api/notes', (req, res) => {
    const notes = [
        {
            id: 1,
            title: 'First Note',
            content: 'This is the content of the first note.',
            dateCreated: '2024-08-09'
        },
        {
            id: 2,
            title: 'Second Note',
            content: 'This is the content of the second note.',
            dateCreated: '2024-08-10'
        },
        {
            id: 3,
            title: 'Third Note',
            content: 'This is the content of the third note.',
            dateCreated: '2024-08-11'
        }
    ];

    res.json(notes);
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});
