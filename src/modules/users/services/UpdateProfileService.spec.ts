import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeHashProvider: FakeHashProvider;
let fakeUserRepository: FakeUsersRepository;
let updateProfileService: UpdateProfileService;

describe('UpdateProfile', () => {
    beforeEach(() => {
        fakeHashProvider = new FakeHashProvider();
        fakeUserRepository = new FakeUsersRepository();

        updateProfileService = new UpdateProfileService(
            fakeUserRepository,
            fakeHashProvider,
        );
    });

    it('should be able to update profile', async () => {
        const user = await fakeUserRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        const updatedUser = await updateProfileService.execute({
            user_id: user.id,
            name: 'John Tre',
            email: 'johntre@example.com',
        });

        expect(updatedUser.name).toBe('John Tre');
        expect(updatedUser.email).toBe('johntre@example.com');
    });

    it('should be able to change to another user email', async () => {
        await fakeUserRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        const user = await fakeUserRepository.create({
            name: 'Teste',
            email: 'teste@example.com',
            password: '123456',
        });

        await expect(
            updateProfileService.execute({
                user_id: user.id,
                name: 'John Tre',
                email: 'johndoe@example.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to update the password', async () => {
        const user = await fakeUserRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        const updatedUser = await updateProfileService.execute({
            user_id: user.id,
            name: 'John Tre',
            email: 'johntre@example.com',
            old_password: '123456',
            password: '123123',
        });

        expect(updatedUser.password).toBe('123123');
    });

    it('should not be able to update the password without old password', async () => {
        const user = await fakeUserRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        await expect(
            updateProfileService.execute({
                user_id: user.id,
                name: 'John Tre',
                email: 'johntre@example.com',
                password: '123123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    // it('should not be able to update the password with wrong old password', async () => {
    //     const user = await fakeUserRepository.create({
    //         name: 'John Doe',
    //         email: 'johndoe@example.com',
    //         password: '123456',
    //     });

    //     await expect(
    //         updateProfileService.execute({
    //             user_id: user.id,
    //             name: 'John Tre',
    //             email: 'johntre@example.com',
    //             old_password: '123457',
    //             password: '123123',
    //         }),
    //     ).rejects.toBeInstanceOf(AppError);
    // });
});
