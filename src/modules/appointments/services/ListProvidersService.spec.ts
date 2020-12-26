import 'reflect-metadata';

// import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProviderService from './ListProvidersService';

let fakeUserRepository: FakeUsersRepository;
let listProviders: ListProviderService;

describe('ListProvider', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUsersRepository();

        listProviders = new ListProviderService(fakeUserRepository);
    });

    it('should be able to list providers', async () => {
        const user1 = await fakeUserRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        const user2 = await fakeUserRepository.create({
            name: 'John Tre',
            email: 'johntre@example.com',
            password: '123456',
        });

        const loggedUser = await fakeUserRepository.create({
            name: 'John Qua',
            email: 'johnqua@example.com',
            password: '123456',
        });

        const providers = await listProviders.execute({
            user_id: loggedUser.id,
        });

        expect(providers).toEqual([user1, user2]);
    });
});
