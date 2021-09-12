import { app } from '@/app/infra/app';

const PORT = Number(process.env.PORT) || 3333;

app.listen(PORT, () => console.log(`Server started at :${PORT}`));
