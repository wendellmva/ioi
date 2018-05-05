import { bootstrap } from './app/server/main';
import { P2pServer } from './app/server/p2p-server';
import { Blockchain } from './app/server/blockchain';
import { AppService } from './app/server/app.service';
import { Wallet } from './app/server/wallet';

const boot = async () => {
    const app = await bootstrap();
    const service = app.get<AppService>(AppService);
    service.server.listen();
    return service.blockchain;
};

boot()
    .then((blockchain) => {
        const wallet = new Wallet();
        console.info(wallet.toString());
    })
    .catch(err => console.error(err));