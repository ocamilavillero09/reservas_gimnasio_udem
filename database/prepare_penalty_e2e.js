
db = db.getSiblingDB('gym_udem');

const email = 'prueba.e2e.penalizacion@soyudemedellin.edu.co';
const modo = 'vigente';

const usuario = db.users.findOne({ email });

if (!usuario) {
    throw new Error('No existe la cuenta E2E de penalización: ' + email);
}

if (modo === 'vigente') {
    db.users.updateOne(
        { email },
        {
            $set: {
                estado: 'PENALIZADO',
                penalizado_hasta: new Date(Date.now() + 24 * 60 * 60 * 1000)
            }
        }
    );
} else if (modo === 'vencida') {
    db.users.updateOne(
        { email },
        {
            $set: {
                estado: 'PENALIZADO',
                penalizado_hasta: new Date(Date.now() - 24 * 60 * 60 * 1000)
            }
        }
    );
} else {
    throw new Error('Modo inválido: ' + modo);
}

print('Cuenta preparada: ' + email + ' (' + modo + ')');
